D&AD CMS Auditor
================

A tool for managing the [www.dandad.org](http://www.dandad.org/) CMS and website by displaying a full listing of pages 
and other in-page components in a sortable table. Requires a valid login for the D&AD website CMS.

Requirements
------------

* Ruby 2.x

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

The application should be simple to launch, with no dependencies besides those available to a non-root Mac OS X user.

The web server uses vanilla Ruby WEBrick with Proc handlers, and the client-side JavaScript is sourced from the
[JSPM](http://jspm.io/) CDN with SystemJS for module loading and Babel transpilation. This sacrifices the speed of a
bundled client package for reproducible installations without a build process.

The frontend is a React, Redux, and ReactRouter application written in ES2015.

All of the page crawling logic and data persistence is managed client-side, with the API storing an ephemeral
session cookie for performing authenticated cross-origin requests to www.dandad.org. The application is intended to be
run locally on the user's machine, so no session data is stored.
