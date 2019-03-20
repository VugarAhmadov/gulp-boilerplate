# gulp-boilerplate
A [Bootstrap](https://getbootstrap.com/) v4.3.1 boilerplate with [Sass](http://sass-lang.com/), concatenation, minification, autoprefixer, [Browsersync](https://www.browsersync.io/), hot reloading all runned by [Gulp](https://gulpjs.com/).

![bootstrap logo](https://user-images.githubusercontent.com/10498583/31125543-e2a88c2c-a848-11e7-87b0-d20ea38d41d0.jpg)
![sass logo](https://user-images.githubusercontent.com/10498583/31125541-e2a732e6-a848-11e7-959d-7d7b0c138124.jpg)
![gulp logo](https://user-images.githubusercontent.com/10498583/31125542-e2a78b88-a848-11e7-8ac5-c396f46e811f.jpg)
![browsersync logo](https://user-images.githubusercontent.com/10498583/31125540-e2a6eed0-a848-11e7-817a-69c5619f772a.jpg)

## Quick Start
```
# 1 Clone this repo
git clone https://github.com/VugarAhmadov/gulp-boilerplate.git

# 2 Navigate into the repo directory
cd gulp-boilerplate

# 3 Install all node packages
npm install

# 4 Get started
gulp
```

## Requirements
This project requires you have [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) installed.
This project requires you have a global installation of [gulp](http://gulpjs.com/).

```
# Install gulp globally
npm install -g gulp
npm install -g gulp-cli
```

CLI version: 2.0.1
Local version: 4.0.0


## Gulp commands
**gulp**

The 'gulp' command starts a local Browsersync server that serves your files in the browser.
It reloads the current page when changing HTML, Sass and JS files.
The output of all Sass files go to main.min.css
The output of custom JS file goes into main.min.js
You can access the development server with other devices on the same network. Go to the "External" address specified by Browsersync (see the terminal) in the web browser of your device.
```
gulp 
```

## Vendors
* **Bootstrap** - v4.3.1
* **jQuery** - v3.3.1
* **popper.js** - v1.14.7
* **FontAwesome.js** - v5.7.2