#!/usr/bin/env ruby

require 'net/http'
require 'webrick'
require 'json'

server = WEBrick::HTTPServer.new(Port: 3000)

# POST /api/sessions
class SessionsServlet < WEBrick::HTTPServlet::AbstractServlet
  def do_POST(req, res)
    unless req.path == '/api/sessions'
      res.status = 404
      return
    end

    login_form_request = Net::HTTP.get_response(URI('http://www.dandad.org/manage/'))

    csrf_token = login_form_request.body
      .match(%r{name='csrfmiddlewaretoken' value='(.+)'})[1]

    login_request = Net::HTTP::Post.new(URI('http://www.dandad.org/manage/'))
    login_request['Cookie'] = login_form_request['Set-Cookie']
    login_request.set_form_data(
      'csrfmiddlewaretoken' => csrf_token,
      'username' => req.query['username'].strip,
      'password' => req.query['password'].strip,
      'this_is_the_login_form' => 1,
      'next' => '/manage/'
    )

    login_response = nil

    Net::HTTP.start('www.dandad.org', 80) do |http|
      login_response = http.request(login_request)
    end

    unless login_response.is_a?(Net::HTTPFound)
      res.status = 200
      res['Content-Type'] = 'application/json'
      res.body = JSON.dump(success: false)
      return
    end

    session_id = login_response.get_fields('Set-Cookie')
      .select { |c| c.match(%r{^websitesessionid}) }.first
      .match(%r{^websitesessionid=(.+); Domain})[1]

    res.status = 201
    res['Content-Type'] = 'application/json'
    res.body = JSON.dump(
      success: true,
      username: req.query['username'].strip,
      sessionId: session_id
    )
  end
end

# GET /api/proxy?url=URL&sessionId=SESSION_ID
# POST /api/proxy?url=URL&sessionId=SESSION_ID
class ProxyServlet < WEBrick::HTTPServlet::AbstractServlet
  def do_GET(req, res)
    page_request = Net::HTTP::Get.new(URI(req.query['url']))
    page_request['Cookie'] = "websitesessionid=#{req.query['session_id']}"

    Net::HTTP.start('www.dandad.org', 80) do |http|
      page_response = http.request(page_request)

      res.status = 200
      res['Content-Type'] = 'application/json;charset=utf-8'
      res.body = JSON.dump(
        status: page_response.code,
        body: page_response.body.encode(Encoding::UTF_8, undef: :replace, invalid: :replace),
        headers: page_response.to_hash,
        url: req.query['url']
      )
    end
  end

  def do_POST(req, res)
    session_id = req.request_uri.query.match(%r{session_id=([^&]+)})[1]
    url = req.request_uri.query.match(%r{url=([^&]+)})[1]

    csrf_token_request = Net::HTTP::Get.new(URI('http://www.dandad.org/manage/pages/basepage/add/'))
    csrf_token_request['Cookie'] = "websitesessionid=#{session_id}"

    post_request = Net::HTTP::Post.new(URI(req.request_uri.query.match(%r{url=(.+)$})[1]))

    Net::HTTP.start('www.dandad.org', 80) do |http|
      csrf_token = http.request(csrf_token_request).get_fields('Set-Cookie')
        .select { |c| c.match(%r{csrftoken}) }.first
        .match(%r{csrftoken=(.+); expires})[1]

      params = req.query.to_h
      params['csrfmiddlewaretoken'] = csrf_token
      post_request.set_form_data(params)
      post_request['Cookie'] = "websitesessionid=#{session_id};csrftoken=#{csrf_token}"

      post_response = http.request(post_request)

      res.status = 200
      res['Content-Type'] = 'application/json'
      res.body = JSON.dump(
        status: post_response.code,
        body: String.new(post_response.body, encoding: Encoding::UTF_8),
        headers: post_response.to_hash,
        url: url
      )
    end
  end
end

trap 'INT' do server.shutdown end

server.mount '/api/sessions', SessionsServlet
server.mount '/api/proxy', ProxyServlet
server.mount '/', WEBrick::HTTPServlet::FileHandler, File.dirname(__FILE__),
  FileCallback: -> (req, res) { res['Pragma'] = 'no-cache' }

puts <<BANNER

-------------------------------------------------

 8888888b.   .d8888b.            d8888 8888888b.
 888  "Y88b d88P  "88b          d88888 888  "Y88b
 888    888 Y88b. d88P         d88P888 888    888
 888    888  "Y8888P"         d88P 888 888    888
 888    888 .d88P88K.d88P    d88P  888 888    888
 888    888 888"  Y888P"    d88P   888 888    888
 888  .d88P Y88b .d8888b   d8888888888 888  .d88P
 8888888P"   "Y8888P" Y88bd88P     888 8888888P

 Starting server on http://localhost:3000

-------------------------------------------------

BANNER

server.start
