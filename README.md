# React Project Setup

So your about to create a new or existing React project! How fun. Follow these steps to get your [React](https://facebook.github.io/react/) project up and running quickly. A special thanks to Frontend Masters for the [Intro to react class](https://github.com/btholt/complete-intro-to-react/tree/start).

Here's an outline of what we need to do.

- [Install Node.js](#Install/Update-Node.js)
- [Update NPM](#update-npm-to-latest-version)
- [Install Yarn](#install-yarn-globally)
- [Create Root Project Files](#create-root-project-files)
- [Install Dependencies](#install-dependencies)
- [Install React and React-Dom](#install-react-and-reactdom)
- [Install Prettier and ESLint](#install-prettier-and-eslint)
- [Add NPM Scripts](#add-npm-scripts)
- [Install Babel](#install-babel)
- [Install Webpack](#install-webpack)



## Install/Update Node.js

Node is a server framework that allows for asynchronous JavaScript programming on the server. Node files (.js files) must be initiated in the command line. You can include modules in your application. Most notably is NPM (a package manager for Node).

Make sure Node.js is installed. With Homebrew just run the following:

    $ brew install node
    
Verify you have node installed: `node -v`
Verify you have npm installed: `npm -v`

Note 1: I didn't have issues but if you do, don't use homebrew and install node manually.
Note 2: If you need to use different node versions on your machine install [nvm](https://github.com/creationix/nvm) (node version manager). Verify it's installed by running: `command -v nvm`.
Use this [web page](https://davidwalsh.name/nvm) to learn how to easily use nvm. 

## Update NPM to latest version

NPM comes installed with Node.js. 
To update npm to the latest version run: `npm install -g npm@latest`

## Install Yarn Globally

When NPM 4 was the latest, Yarn was a must because it produced a yarn.lock file that NPM didn't. There was no need to use messy shrinkwrap files. Instead Yarn locked down your dependencies for easy management. Now that NPM 5 is in use, the only real benefit of Yarn is that it still builds dependencies faster than NPM. When NPM improves speed I'll switch back to it. Until then I'll continue using Yarn.

    $ npm install --global yarn
    
Then check that you installed it properly.

    $ yarn --version
    
## Create Root Project Files

Add a index.html and make sure it has at least one div with id="app".
Add script tag with src="js/bundle.js"

Add app.js file. This will contain your import statements for react and react-dom {render}.

## Install Dependencies

New projects:

- Create your first React index.html file. 
- In the root directory for that project run the following to create a new node_modules directory and package.json file.
    
 `npm init` or `yarn init`
    
Existing projects:

- Run `git clone path-to-project` to pull down the repo files to your local directory.
- Run the following to add module dependencies listed in the package.json file. A package-lock.json  or yarn.lock will be created.

 `npm install` or `yarn`

Save a new dependency:
 
 `npm install <package name>` or `yarn add <package name>`

Add `--dev` to this command to save to devDependencies.

## Install React and ReactDom

For any new React projects I'll typically install the following:

 `npm install react react-dom`
 
Other good packages I use with my projects can be found in this [package.json template](https://github.com/nikki-experiments/dev-setup/blob/master/package-json-example.md). 

## Install Prettier and ESLint

Prettier is a style formatter for your project files. To install:

    $ npm install --global prettier
    
ESLint is a JavaScript linting tool. To install:

    $ npm install --global eslint

Can also install them in your project by adding all the eslint dependencies to package.json.

### Set up an ESLint config file

Create a file in your root directory named .eslintrc.json.
Fill it with the config code setup from this [example template](https://github.com/nikki-experiments/dev-setup/blob/master/.eslintrc-example.md).
Add a bash command "lint" in your NPM scripts file shown below.

You can test this by running the command: `yarn lint`.

## Add NPM Scripts

Open your package.json file and add bash commands to make your longer commands shorter and easier to remember.
The word on the left can be anything you want but these are standard ones. The command on the right is what will actually run.

    "scripts": {
        "build": "webpack"
        "start": "node server.js"
        "lint": "eslint --ignore-path .gitignore --cache ./"
     }

To run this on command line for example you could run: `$ npm run build` or `yarn run build` which will run webpack.
For special words like "test" and "start" running `npm test` or `npm t` will also work.
Use the npm scripts from the package.json template file.

## Install Babel

Babel takes es6 (future JavaScript) and compiles it down to es5 (current JavaScript), the version currently supported on the majority of browsers.

Install by addding the dev dependencies below:

    $ yarn add babel-loader babel-core babel-eslint babel-plugin-dynamic-import-node babel-plugin-syntax-dynamic-import babel-plugin-transform-class-properties babel-plugin-transform-es2015-modules-commonjs babel-preset-env babel-preset-react --dev 

### Write config file for Babel

Now create a new file named `.babelrc` in the root directory.
Copy the [template presets for Babel](). Inside this file you set presets which are groups of plugins. Plugins are the transformation tools.

Note: If you were still using npm scripts to run webpack you would change the command to the following:
`"build": "webpack --module-bind 'js=babel' js/ClientApp.js public/bundle.js"`

However this is getting long so you should change remove everything after webpack and set up a webpack config file described in the next section.

## Install Webpack

Webpack takes all components that you’ve created puts it together in one bundled JavaScript file and makes it available to send down. That way you can break huge projects down to smaller more manageable modules. 

To install: 

    $ yarn add webpack (or run $ npm install --global webpack)
    
Now you could run a command to convert your React files into your final js file. Make sure you are in your project's root directory. 

To build an exported js file:
  
    $ webpack js/Clientapp.js public/bundle.js
    
In this example the first file webpack is going to see is js/Clientapp.js. The output file will be public/bundle.js.
The bundle.js file will be pretty large. That is why you should run a separate build for production. This one should be minified, gzipped.

For a Produciton build, run: 

    $ webpack -p js/Clientapp.js public/bundle.js 

### Write config file for Webpack

Now all you need to do is add the file path to your bundle file in your main html file.
You could add this command to your npm scripts. However it will get even longer once you add Babel.
Instead of running longer commands like this, you can create a webpack config file to handle it for you.

Create a new *webpack.config.js* file in the project root directory.
Fill out the config based on the [webpack config template]().
 
EXPLANATION OF CONFIG FILE:
- Context: sets the root directory.
- Entry: is the file where the bundler starts the bundling process.
- Output: is the location where the bundled JS file will be saved.
- Devtool: Uses source maps.
- Resolve: Tells webpack which files to add to bundle and in a particular order.
- Stats: Info configuration.
- Module: Rules for webpack.
- Loaders: are transformations applied on a file in our app. The key property takes on an array of loaders.

Check the [Webpack documentation](https://webpack.github.io/docs/list-of-loaders.html) for more potential loaders you can use.

### Set bash commands for Webpack

Create a bash command "build": "webpack" in npm scripts for webpack. It will know to use the config file settings.
Test the command by running `yarn build` or `npm run build`.

Now instead of building every time you make a change, set up the watcher bash command to build every time you save your files.
Add "start": "webpack --watch" to your package.json scripts.

### Setup Webpack Dev Server

You don't want to use the file protocol, but we do need a static file server. To do this install webpack-dev-server. It should be in your package.json file. Also open webpack config file and add the devServer entry. '/public/' represents the path on the server.

When this is run, it will run a dev server on host 8080, serve files from '/public/', and also run watch which will bundle output your files each time you save. To do this run:
   
   $ /node_modules/.bin/webpack-dev-server
   
Make sure you stop watch before running this. This will start watch again anyway.
Make it easy to run by adding "dev" to your package.json npm scripts. 
To run: `yarn dev`

## React Router

Set up your file routing for your app. 
Add BrowserRouter from your base app.js page and wrap it around your div with className ='app'. 
Set up the file path using exact path='/' component={Landing} (if Landing is the component that will load when you hit the home page). There are more specifics that you can view in the complete-intro-to-react demo files.

## LESS

[LESS](http://lesscss.org/) is a CSS preprocessor that makes it easier to organize and reuse CSS code. I use it because it is what I'm most familiar with but [SASS](http://sass-lang.com/) is also very popular among Ruby developers. I think I'll be moving into CSS Modules for React soon which will make LESS and SASS obsolete.

[gh-page]: http://btholt.github.io/complete-intro-to-react/
