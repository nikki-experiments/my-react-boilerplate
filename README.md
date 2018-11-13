# React Project Setup

So your about to create a new or existing React project! How fun. Follow these steps to get your [React](https://facebook.github.io/react/) project up and running quickly. A special thanks to Frontend Masters for the [Intro to react class](https://github.com/btholt/complete-intro-to-react/tree/start). [React Notes](https://btholt.github.io/complete-intro-to-react/)

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
- [Setup Hot Module Replacement](#setup-hot-module-replacement)
- [Other Tools](#other-tools)


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

When NPM 4 was the latest, Yarn was a must because it produced a yarn.lock file that NPM didn't. There was no need to use messy shrinkwrap files. Instead Yarn locked down your dependencies for easy management. Now that NPM 5 is in use, the only real benefit of Yarn is that it still builds dependencies faster than NPM and it's 100% deterministic. When NPM improves speed I may switch back to it. Until then I'll continue using Yarn.

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
    
  Run: `yarn init` or `npm init`
    
Existing projects:

- Run `git clone path-to-project` to pull down the repo files to your local directory.
- Run the following to add module dependencies listed in the package.json file. A package-lock.json  or yarn.lock will be created.

  Run: `yarn` or `npm install`

Save a new dependency:
 
  Run: `yarn add <package name>` or `npm install <package name>` 

  Add `--dev` to this command to save to devDependencies.

## Install React and ReactDom

For any new React projects the default packages needed are the following:

  Run: `yarn add react react-dom` or `npm install react react-dom`
 
Other packages I use with my projects can be found in my [package.json file](https://github.com/nikki-experiments/my-react-boilerplate/blob/master/package.json). 

## Install Prettier and ESLint

Prettier is a style formatter for your project files. To install:

    $ npm install -D prettier
    
ESLint is a JavaScript linting tool. To install:

    $ npm install -D eslint

This will install the modules inside your node_modules folder. For ESLint you will also need to install other ESLint packages shown in this repo's package.json.

To run prettier from node_modules folder on a file called App.:

    $ npx prettier App.js

You can also install these tools globally if you wish to use them on all your react projects. Run the same commands above but replace -D with -g. The module will be in your Node.js path accesible from any project. Now you won't have to run the install for these tools each time you create a new project.

### Set up an ESLint config file

Create a file in your root directory named .eslintrc.json.
Fill it with the config code setup from this [.eslintrc file](https://github.com/nikki-experiments/my-react-boilerplate/blob/master/.eslintrc.json).
Add the bash command "lint" in your NPM scripts section of your package.json file.

You can test this by running the command: `yarn lint`.
Note: Your IDE might also have an extension for ESLint. Good idea to install the extension.

## Add NPM Scripts

Open your package.json file and add bash commands to make your longer commands shorter and easier to remember.
The word on the left can be anything you want but these are standard ones. The command on the right is what will actually run.

    "scripts": {
        "build": "webpack"
        "start": "node server.js"
        "lint": "eslint --ignore-path .gitignore --cache ./"
     }

To run this on command line for example, 
  Run: `yarn build` or `$ npm run build` which will run webpack.
  
For special words like "test" and "start" running `npm test` or `npm t` will also work.
Use the npm scripts from the package.json template file.

## Install Babel

Babel takes es6 (future JavaScript) and compiles it down to es5 (current JavaScript), the version currently supported on the majority of browsers.

Install by addding the dev dependencies below:

    $ yarn add babel-loader babel-core babel-eslint babel-plugin-dynamic-import-node babel-plugin-syntax-dynamic-import babel-plugin-transform-class-properties babel-plugin-transform-es2015-modules-commonjs babel-preset-env babel-preset-react --dev 

### Write config file for Babel

Now create a new file named `.babelrc` in the root directory.
Add the config code from this [.babelrc file](https://github.com/nikki-experiments/my-react-boilerplate/blob/master/.babelrc). This is where presets (which are groups of plugins) are set. Plugins are the transformation tools.

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
Fill out the config based on this [webpack config template](https://github.com/nikki-experiments/my-react-boilerplate/blob/master/webpack.config.js).
 
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
  
    $ ./node_modules/.bin/webpack-dev-server
   
Make sure you stop watch before running this. This will start watch again anyway.
Make it easy to run by adding "dev" to your package.json npm scripts. 
To run: `yarn dev`

## Setup Hot Module Replacement

When Hot Module Replacement is setup, you won't have to continually rebuild your files to see changes made to code after you've saved your file. You will be able to save your current state while only the thing you changed gets updated and all without a hard refresh of the page. This makes for incredibly faster development. Yay!

To set up HMR, open webpack file and 1) import webpack 2) change the entry object to array and add to it 3) add to devServer object 4) then add the new plugins array. Also set publicPath to the output object.

Next open .babelrc and add 'react-hot-loader/babel' to the plugins array.

Finally, you will have to break up your App.js file into two files so in the first file there is an entry point where you will set up HMR for development (and set any other browser based logic you will need). Name this one index.jsx. The other file named App.js will contain the single exported component also named App. 

To see HMR working, restart webpack-dev-server by running: `yarn dev` or `npm run dev`.
The files should build successfully and there will be a HMR console message. If you change anything now in your files (from App.js down) you should see the changes take effect on your page without a refresh.

## Other Tools

The above is the bare minimum you need to setup to start your React project with the modern framework tools to make the job easier. Below are some other tools that are worthy of being included in your project.

### React Router

With React Router you can set up routing for multiple pages of your application.

The basic steps to using React Router include:
  - Choosing your router.
  - Creating your routes.
  - Navigating between routes using links.
  
#### Installation

Of the three React Router packages you will only need to install one in your project.
If not already in package.json file, run:

    $ yarn add --save react-router-dom 
  
#### Choose Your Router
Choose between <HashRouter> and <BrowserRouter> components.
BrowserRouter is preferred if your server will handle dynamic requests.
  
Add BrowserRouter from your base app.js page and wrap it around your div with className ='app'.
Set up the file path using exact path='/' component={Landing} (if Landing is the component that will load when you hit the home page). There are more specifics that you can view in the complete-intro-to-react demo files.
  
#### History
Each router creates a history object that keeps track of the current location.
It will re-render each time this location changes.
This object is available through React’s context.

Note: Changes to Routes you’ll need to restart webpack to recognize them.
Check out this wonderful [React Router V4 tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf).

### Jest

Use Jest to set up tests for your application. In general, testing is good if your application components or page layout will not be changing often.

#### Tests Setup

Create a folder called '__tests__'.
Inside create a new file for a component that you want to test. Example: "Search.spec.jsx". 
Write your tests here. Add "jest": true to the "env" object of your .eslintrc file. Also add the env object with "test" to your .babelrc file similar to the example .babelrc file. This needs to be done in order to let Node understand import statements and JSX in your test file.

#### Run Test
Then run the following:

    $ NODE_ENV=test ./node_modules/.bin/jest 
 
You can also set up npm scripts for this, `yarn test`,  such as what's in the package.json file.
If you ran a test using .toMatchSnapshot() then you will notice a folder called __snapshots__. Inside will be everything your test rendered out. 

After you make updates to markup, you can run above command again but include a -u at the end.
This takes updated snapshot. The next time you run it your test should pass.

#### Run Shallow Test Using Enzyme, and Coverage

Enzyme is a wrapper on top of react-test-renderer.

To see test coverage run `yarn test -u`. Make sure to include "test:coverage": "jest --coverage" in your npm scripts.
The result will be a nice table and will build a coverage directory. To view this:

    $ cd lcov-report
  
Then `open index.html` to view the coverage table in your browser.

### LESS

[LESS](http://lesscss.org/) is a CSS preprocessor that makes it easier to organize and reuse CSS code. I use it because it is what I'm most familiar with but [SASS](http://sass-lang.com/) is also very popular among Ruby developers. I think I'll be moving into CSS Modules for React soon which will make LESS and SASS obsolete.

[gh-page]: http://btholt.github.io/complete-intro-to-react/
