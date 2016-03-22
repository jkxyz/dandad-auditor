#!/usr/bin/env ruby

# A WEBrick server that serves the static files in this directory and allows
# requests to be proxied to www.dandad.org, bypassing cross-origin restrictions
# and retaining the logged in user session.
#
# Listens on http://localhost:3000
#
# GET  /login -- Returns the currently signed in username as plain text or a 400 error
# POST /login -- Takes a `username` and `password` parameter to login to the CMS
# GET  /get   -- Takes a `url` parameter to request with the stored cookie

require 'webrick'
require 'net/http'

session_cookie = nil
session_username = nil

# An array of arrays where the first element is a RegExp to match the request line
# and the second is a Proc which returns the response status and body
routes = [
  [
    /^GET \/api\/login/, -> (req) {

      return 200, session_username + "\n" if session_username

      return 400, "Not logged in\n"
    }
  ],
  [
    # Receive a username and password to make a login request to the CMS and store
    # the cookie with the session ID
    /^POST \/api\/login/, -> (req) {

      username, password = req.query['username'], req.query['password']

      # Fail if the username and password aren't found in the request
      return 400, "Username and Password required\n" unless username and password

      Net::HTTP.start('www.dandad.org', 80) do |http|
        # Make an initial request to get the login form CSRF token
        login_form_res = http.request(Net::HTTP::Get.new(URI('http://www.dandad.org/manage/')))

        token = login_form_res.body.match(/name='csrfmiddlewaretoken' value='(.+)'/)[1]

        login_submit_req = Net::HTTP::Post.new(URI('http://www.dandad.org/manage/'))
        
        login_submit_req.set_form_data(
          'csrfmiddlewaretoken'    => token,
          'username'               => username.strip,
          'password'               => password.strip,
          'this_is_the_login_form' => 1, # Yep...
          'next'                   => '/manage/'
        )

        # Submit login request with the cookie from the previous request
        login_submit_req['Cookie'] = login_form_res['Set-Cookie']

        res = http.request(login_submit_req)

        return 403, "Bad Login\n" unless res.is_a?(Net::HTTPFound)

        session_cookie = res['Set-Cookie']
        session_username = username.strip
      end

      return 200, "OK\n"
    }
  ],
  [
    /^GET \/api\/get/, -> (req) {

      return 400, "URL required\n" unless url = req.query['url']

      return 403, "Not logged in\n" unless session_cookie

      return 400, "URL host is not www.dandad.org\n" unless URI(url).host == 'www.dandad.org'

      Net::HTTP.start('www.dandad.org', 80) do |http|
        request = Net::HTTP::Get.new(URI(url))

        # Use the cookie containing the authenticated session ID
        request['Cookie'] = session_cookie
        
        # Pass the returned response body back to the client
        return 200, http.request(request).body
      end
    }
  ]
]

server = WEBrick::HTTPServer.new Port: 3000, DocumentRoot: '.'

# Mount the routes at `/api` so that files can still be accessed at the document root
server.mount_proc '/api' do |req, res|

  begin
    # Call the first route that matches the request line and set the response
    res.status, res.body = routes.select { |r| req.request_line =~ r[0] }.first[1].(req)
  rescue NoMethodError => e
    res.status, res.body = 404, "Not Found\n"
  end

  res['Content-Type'] = 'text/plain'

end

# Serve files from the directory root, forcing the Pragma header to 'no-cache'
server.mount '/', WEBrick::HTTPServlet::FileHandler, File.dirname(__FILE__), FileCallback: -> (req, res) { res['Pragma'] = 'no-cache' }

trap 'INT' do server.shutdown end

server.start
