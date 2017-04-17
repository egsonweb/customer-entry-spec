# Customer Entry Spec
 
See below for the original project's list of features:  

### Features

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* No gulp and no grunt, just npm scripts.

>NOTE: Make sure you're using the latest version of Node.js and NPM

### Quick start

> Clone/Download the repo from git

```bash
# clone repo
git clone <repo_url>

# change directory to your app
$ cd customer-entry-spec

# install the dependencies with npm
$ npm install

#or install via yarn
$ yarn install

# start the server via (npm)
$ npm start

# or

# start the server via (yarn)
$ yarn start
```

Go to [http://localhost:8080](http://localhost:8080) in your browser.
It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080` using LowDB, small local JSON database powered by Lodash & Faker to generate initial seed data.
