D&AD CMS Auditor
================

A tool for managing the [www.dandad.org](http://www.dandad.org/) CMS and website by displaying a full listing of pages 
and other in-page components in a sortable table. Requires a valid login for the D&AD website CMS.

Requirements
------------

* Ruby 2.x
* Firefox 44+ or Chrome 45+ (for ES2015 support)

Usage
-----

From the command line, run:

```
$ ruby server.rb
```

Alternatively, on OS X, open the `server.rb` file with `Terminal.app` from Finder (and set to default).

Then open [http://localhost:3000](http://localhost:3000) to launch the web application.

Constraints and Design 
----------------------

This application needs to be simple to launch and develop on a stock non-root Mac OS X installation in order
to be usable by non-technical staff. The web server and API uses vanilla Ruby WEBrick without any additional 
libraries. To remove the need for any additional build process the JavaScript frontend uses in-browser RequireJS.

The frontend is a React and Redux application written in ES2015.

All of the page crawling logic is performed client-side, with the API providing the ability to login, store
the authenticated session cookie, and perform authenticated cross-origin requests to dandad.org via a simple proxy end-point.
The application is intended to be run locally on a single user's machine, removing the need to store session data, and
therefore the script will only store a single persistent authenticated cookie in-memory.
