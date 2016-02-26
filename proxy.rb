#!/usr/bin/env ruby

# A vanilla Ruby HTTP server that proxies requests to www.dandad.org
# to allow unauthorised cross-origin browser requests whilst retaining
# user session.

require 'socket'
require 'net/http'

$session_cookie = nil

ROUTES = [
  # Receive a username and password to make a login request and store the cookie
  [/^GET \/login/, -> (req) {
    username = nil
    password = nil

    # Get the username and password from the headers
    req.each do |line|
      if line =~ /^X-Username: /
        username = line.match(/^X-Username: (.+)$/)[1]
      end

      if line =~ /^X-Password: /
        password = line.match(/^X-Password: (.+)$/)[1]
      end
    end

    return "Error\n" unless username && password

    Net::HTTP.start('www.dandad.org', 80) do |http|
      # Make an initial request to the login form page to get the cookie and token
      login_page_response = http.request(Net::HTTP::Get.new(URI('https://www.dandad.org/manage/')))

      # Get the CSRF token from the form in order to validate the next request
      token = login_page_response.body.match(/name='csrfmiddlewaretoken' value='(.+)'/)[1]

      login_submit_request = Net::HTTP::Post.new(URI('https://www.dandad.org/manage/'))

      login_submit_request.set_form_data(
        'csrfmiddlewaretoken' => token,
        'username' => username.strip,
        'password' => password.strip,
        'this_is_the_login_form' => '1', # Yep...
        'next' => '/manage/'
      )

      puts "\t> Logging in as #{username}"

      login_submit_request['Cookie'] = login_page_response['Set-Cookie']

      response = http.request(login_submit_request)

      # Login is successful if the response is a redirect
      return "Error\n" unless response.is_a?(Net::HTTPFound)

      puts "\t> Successfully logged in"

      # Store the new cookie for authenticating new requests
      $session_cookie = response['Set-Cookie']

      return "OK\n"
    end
  }]
]

server = TCPServer.new('localhost', 3456)

loop do
  # Serving only one client, so block until they make a request
  socket = server.accept

  request = []

  while line = socket.gets
    break if line.strip.empty?
    request << line
  end

  puts request[0]

  response = nil

  ROUTES.each do |route|
    response = route[1].(request) if request[0] =~ route[0]
  end

  response = "Not Found\n" if response.nil?

  socket.print(
    "HTTP/1.1 200 OK\r\n" +
    "Content-Type: text/plain\r\n" +
    "Content-Length: #{response.bytesize}\r\n" +
    "Connection: close\r\n\r\n"
  )

  socket.print(response)

  socket.close
end
