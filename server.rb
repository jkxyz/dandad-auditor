#!/usr/bin/env ruby

# Serves the static client files for the D&AD Auditor tool and manages authentication to the CMS to circumvent
# browser cross-origin security features. Several HTTP endpoints are provided to login, determine the logged in user,
# and proxy authenticated requests to www.dandad.org.
#
# Usage:
#
#   ruby server.rb
#
# HTTP API Methods:
#
#   GET  /api/username
#     If an authenticated session cookie and username exists, return the username as a text/plain response.
#
#   POST /api/login
#     Parameters: username, password
#     Store in memory an authenticated CMS session cookie for the provided `username` and `password`. Return 200 OK
#     for a successful login attempt and 403 Forbidden for a failed login attempt.
#
#   GET  /api/get
#     Parameters: url
#     Return a 200 OK response with the body received from a request to `url`, using the contents of the stored
#     session cookie to authenticate as a logged-in user of the CMS.

require 'webrick'
require 'net/http'

SESSION = Struct.new(:cookie, :username).new
SERVER  = WEBrick::HTTPServer.new(Port: 3000)

SERVER.mount_proc('/api/username') do |req, res|
  res.status = SESSION.username ? 200 : 404
  res.body = SESSION.username || ''
  res['Content-Type'] = 'text/plain'
end

SERVER.mount_proc('/api/login') do |req, res|
  username = req.query['username'].strip
  password = req.query['password'].strip

  Net::HTTP.start('www.dandad.org', 80) do |http|
    login_form_res = http.request(Net::HTTP::Get.new(URI('http://www.dandad.org/manage/')))
    login_submit_req = Net::HTTP::Post.new(URI('http://www.dandad.org/manage/'))

    login_submit_req.set_form_data(
      'csrfmiddlewaretoken'    => login_form_res.body.match(/name='csrfmiddlewaretoken' value='(.+)'/)[1],
      'username'               => username,
      'password'               => password,
      'this_is_the_login_form' => 1,
      'next'                   => '/manage/'
    )

    login_submit_req['Cookie'] = login_form_res['Set-Cookie']
    login_submit_res = http.request(login_submit_req)

    unless login_submit_res.is_a?(Net::HTTPFound)
      res.status = 403
      return
    end

    SESSION.cookie = login_submit_res['Set-Cookie']
    SESSION.username = username
    res.status = 200
  end
end

SERVER.mount_proc('/api/get') do |req, res|
  Net::HTTP.start('www.dandad.org', 80) do |http|
    request = Net::HTTP::Get.new(URI(req.query['url']))
    request['Cookie'] = SESSION.cookie

    res.status = 200
    res.body = http.request(request).body
    res['Content-Type'] = 'text/html'
  end
end

SERVER.mount('/', WEBrick::HTTPServlet::FileHandler, File.dirname(__FILE__),
  FileCallback: -> (req, res) { res['Pragma'] = 'no-cache' }
)

trap 'INT' do SERVER.shutdown end

puts <<BANNER

-------------------------------------------------

 8888888b.   .d8888b.            d8888 8888888b.
 888  "Y88b d88P  "88b          d88888 888  "Y88b
 888    888 Y88b. d88P         d88P888 888    888
 888    888  "Y8888P"         d88P 888 888    888
 888    888 .d88P88K.d88P    d88P  888 888    888
 888    888 888"  Y888P"    d88P   888 888    888
 888  .d88P Y88b .d8888b   d8888888888 888  .d88P
 8888888P"   "Y8888P" Y88bd88P     888 8888888P"

Design and Art Direction — Website Audit Tool

Server starting on http://localhost:3000

-------------------------------------------------

BANNER

system('open http://localhost:3000') if RUBY_PLATFORM.include?('darwin')

SERVER.start
