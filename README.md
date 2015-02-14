#basicseed [![Bower version](https://badge.fury.io/bo/basicseed.svg)](http://badge.fury.io/bo/basicseed) [![NPM version](https://badge.fury.io/js/basicseed.svg)](http://badge.fury.io/js/basicseed)

`basicseed` is a starter template for your web based projects. It also includes some basic styles as a starting point for you. 

It does a few simple things...

  1. Lays out the folder structure for a *basic* site
  2. Basic HTML5 page with all the good stuff.
  3. SASS based *blueprint* of styles for a basic layout of your site.
    * CSS resets using [normalize](http://necolas.github.io/normalize.css/)
    * Responsive, mobile first, grid
    * Imports the [fontawesome](http://fortawesome.github.io/Font-Awesome/) package so you have lots of icons at your finger tips!
    * Plus a ton of great styles! [Check them out below](#css) for more details.
  2. Uses [**Bower**](http://bower.io) for dependency management
  3. Implements a few awesome tasks via [**Grunt**](http://gruntjs.com/)
    * Starts a web server that live reloads when you save a file and automatically opens a browser when you run the `grunt` command
    * Compiles SASS on save of a `.scss` file
    * Minifies all CSS and JS files
  
## <a name="css"></a> CSS

This is the info on the styles included in the `sass` folder.

### Framework styles (_framework.scss)

The "meat and potatoes" of the included styles are contained in the `_framework.scss` file. Here's a little overview...

#### Color Variables
Color variables can be specified at the top.

`$primary-color: #52c69c;`

Some mixins are also available, based off of the *primary-color* you set:

```
darken( $primary-color, 10% ) 
lighten( $primary-color, 10% )
saturate( $primary-color, 20% ) 
desaturate( $primary-color, 20% )
tint( $primary-color, 10% )
shade( $primary-color, 10% )
```

Example usage of these mixins:

`background-color: darken($primary-color, 20%);`

#### Font Variable

Change your `font-face` using this variable:

`$fontfamily: Helvetica, Arial, sans-serif;`

#### Scrollbar and Selection Colors

These aren't that important, but if you'd like a unique look, change these to your liking.

**Scrollbar Colors - for -webkit-**
```
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background: darken($primary-color, 10%);
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #F0F0F0;
}
```
**Text Selection Colors**

```
::selection {
  background: darken($primary-color, 10%);
  color:#fff;
}

::-moz-selection {
  background: darken($primary-color, 10%);
  color:#fff;
}
```

#### Headings

Just like every other "framework" out there, I've included some default styles for heading tags. Use them as just an HTML tag `<h2></h2>` or as a class: `.h2`

```
h1,
.h1 {
  font-size: 40px;
  font-size: 2.5rem;
}

h2,
.h2 {
  font-size: 32px;
  font-size: 2rem;
}

h3,
.h3 {
  font-size: 26px;
  font-size: 1.625rem;
}

h4,
.h4 {
  font-size: 20px;
  font-size: 1.25rem;
}

h5,
.h5 {
  font-size: 18px;
  font-size: 1.125rem;
}

h6,
.h6 {
  font-size: 16px;
  font-size: 1rem;
}
```

#### Lists, Paragraphs, Images, Blockquotes, HR

These section is the "kitchen sink" portion. Essentially these are *resets* in a way, to ensure your elements are styled the same in most all browsers.

All **images** get the responsive styles that [bootstrap](http://getbootstrap.com/css/#images) uses by default.

#### Helper Classes

There are some *helper* classes to use when needed...

* `.pull-left` - floats element left
* `.pull-right` - floats element right
* `.inline` - makes element `display: inline;`
* `.inline-block` - makes element `display: inline-block;`
* `.clearfix` - clears a float, the fancy way via a mixin
* `.hidden` - hides an element using `display: none;`
* `.text-left` - makes an element `text-align: left;`. Also available are: `.text-right`, `.text-center`, `.text-justify`

#### Inputs, buttons, labels, etc.

Inputs and buttons have some specific classes to help you quickly create some good looking elements.

`.input-elem` is a normal text box. Usage would look like this: `<input type="text" class="input-elem">`

`.button` will give you a nice, rounded corner button. 

I'll leave it up to the project to determine the colors of the button, but there is a *basic* button color class for you to adjust:

`.button-default`

There are some `.button` sizes too for you to use...

* `.button-lg`
* `.button-sm`
* `.button-xs`

Lastly with buttons, there is a `.button-hollow` class that gives you the ever-popular hollow button.



## Directory Layout

    root/               --> all of the files
      assets/           --> production CSS, JS, font, and image files
        css/            --> css folder
          app.css       --> default stylesheet
        js/             --> js folder
          main.js       --> empty js file
        lib/            --> all library files (packages)
          fontawesome/  --> fontawesome package files
        img/            --> image files
      js/               --> unminified js files
        main.js         --> empty js file
      sass/             --> sass (uncomplied) folder
        _framework.scss --> all *base* styles, including buttons, headings, lists, etc.
        _grid.scss      --> basic grid for responsive design, based on [bootstrap](http://getbootstrap.com/) and [foundation](http://foundation.zurb.com/)
        _mixins.scss    --> any and all mixins used throughout the stylesheets
        _normalize.scss --> [normalize *library*](http://necolas.github.io/normalize.css/) by Nicolas Gallagher
        _responsive.scss--> basic media query layout
        app.scss        --> imports all of the other `.scss` files. Stick your own styles below the `import` statements
      .bowerrc          --> tells bower to install files into `assets/lib`
      .gitignore        --> ignores stuff when committing to git
      bower.json        --> specify [Bower](http://bower.io) packages for the project
      Gruntfile.js      -> [Grunt](http://gruntjs.com/) tasks, like server, minify, compile, etc.
      index.html        --> app layout file (the main html template file of the app)
      LICENSE           --> MIT license
      package.json      --> registers Grunt plugin dependencies
      README.md         --> it's what you are reading, right now!


