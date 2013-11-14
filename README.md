# Phase 2: All the Things

Ad-hoc, realtime monitoring of a Twitter search using many of the 
technologies from Dev Bootcamp Phase 2.

* Sinatra/ERB for the web interface
* ActiveRecord for relational-database access (postgres)
* jQuery for Event-binding, DOM Selection/Manipulation, AJAX
* Sidekiq for background jobs

## Running

Requirements

* Ruby 1.9.3
* PostgreSQL
* Redis
* Bundler
* Registered Twitter Application http://dev.twitter.com

In on terminal window, run your normal Sinatra workflow:

        $ bundle
        $ shotgun

In 2 other terminals, run:

        $ redis-server

and

        $ bundle exec sidekiq -r./config/environment.rb

To use the Twitter Streaming API, make sure to set `CONSUMER_KEY`, 
`CONSUMER_SECRET`, `ACCESS_TOKEN` and `ACCESS_TOKEN_SECRET` in your 
environment

## TODO

* Styled, more meaningful view code
* Make JavaScript Object-Oriented
* Make classes for some of the hairier bits of code (e.g. option Twitter env)

## More Info

Ryan Briones <ryan@devbootcamp.com>