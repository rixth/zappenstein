# Zappenstein

This is my "artists statement" to go along with Zappenstein.

## Technical notes

Broadly, the system is comprised of three things. Data sources ("models"), controllers and the slide UI ("view"). I tried to genericise as much code as I could between the three discrete data sources (Zappos, Flickr and Twitter).

The code for fetching data (and more when we run out), handling no results, etc is all abstracted away from the controllers. They only run `DataSource.purchases.getItem`; the rest is handled elsewhere. This helped keep the code cleaner and more readble.

The controllers make extensive use of setInterval for timing the rendering of new slides. I am aware that this is slightly slower than stacking setTimeout, but it was easier and quicker to use intervals for this prototype.

## Technologies used

### Javascript frameworks

I originally used jQuery in the project, seeing as I am most familiar with it. I then stripped that out and used Zepto (a tiny, Webkit only library). However, this was missing some of jQuery's custom event management which I wanted. I also considered using native DOM methods, but as this was quick prototype, I finally settled back on jQuery 1.6.

### Sinatra

Sinatra is a lightweight web server with many plugins. I chose it for this project as I needed a simple, deployable (Heroku) backend. I learnt about making rack configuration files too, which was great.

### haml & scss

I used these Ruby DSLs to make my HTML and CSS. Some of the CSS generated by scss/sass could be a little cleaner, but the nesting in-file and syntax checking increased my development speed.

### CSS3 3D transforms

This is probably the area which I feel I learnt most about through making Zappenstein. I tried several approaches early on, trying to achieve this effect. I was originally inspired by Safari's "Top Sites" feature. 3D transforms were touched on at a meetup I attended a few weeks back, and I had been itching to use them.

### Miscellany

* LAB.js was used for loading the javascript required by the application.
* Web fonts were used. Bebas from FontSquirrel and Merriweather from the Google Font Library.
* Shotgun is awesome tool for reloading rack-based ruby apps when you change a file.
* Heroku for hosting

## Issues encountered

### Google Maps API

It only allows you to get so many static maps in a certain time period, so every so often, the app will, rather than displaying a map, display a speedometer. This speedometer indicates that the app has hit this threshold.

### CSS3 3D transforms

Originally, I had wanted to have the tiles flip backward, revealing the Zappos logo, then back with new content. However, I found some weird issues when animating the -webkit-transform property. It'd show garbled tiles and sometimes they'd stick in the flipped state. It's for that reason I opted for transparency based transitions.

### Safari bugs

The recent purchase slides show a static map. In Safari, when an image fully loads, if it has been 3D-transformed, it flickers white for a moment. I resolved this by implementing the slideContentReady event, which allows the slide renderer code to tell the UI that everything is loaded, and to display the slide.

### Zappos API

I was counting on using the Statistics/topStyles method in the API, however, I found that often it would not return any data. It appears the time window that it looks at is far too small. For this reason, I subbed in the Flickr API for photos.