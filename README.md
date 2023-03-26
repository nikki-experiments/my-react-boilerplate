# React + TypeScript + Webpack Project Setup

So your about to create a new React project! How fun.

When I'm creating a simple small [React](https://facebook.github.io/react/) project mainly for demo purposes I'll use [create-react-app](https://create-react-app.dev/docs/getting-started). If I'm building something where I need a few more tools I might follow the steps below and use [Parceljs](https://parceljs.org/) as my no-config bundler instead of Webpack. However webpack now offers no config options too. Most of the time if my project is something I want to scale in the future I'll just use React + Typescript + Webpack.

For React training:
- [Complete Intro to React V6 and Intermediate React V3](https://btholt.github.io/complete-intro-to-react-v6/)
- [Complete Intro to React V6 Transcripts](https://frontendmasters.com/courses/complete-react-v6/)

Here's an outline of what we need to do.

- [Install Node.js](#Install/Update-Node.js)
- [Decide Between Manual or Auto Configuration](#decide-between-manual-or-auto-configuration)
- [Create A Folder Structure](#New-Projects-Create-A-Folder-Structure)
- [Install Dependencies](#install-dependencies)
- [Install React and React-Dom](#install-react-and-reactdom)
- [Create Root Project Files](#create-root-project-files)
- [Install Prettier and ESLint](#install-prettier-and-eslint)
- [Add NPM Scripts](#add-npm-scripts)
- [Install Babel](#install-babel)
- [Install Webpack](#install-webpack)
- [Setup Hot Module Replacement](#setup-hot-module-replacement)
- [Other Tools](#other-tools)

## Install/Update Node.js

[Node](https://nodejs.org/en/download/) is a server framework that allows for asynchronous JavaScript programming on the server. Node files (.js files) must be initiated in the command line. You can include modules in your application. NPM (a package manager for Node) is included with Node.js.

First make sure Node.js is installed. Either install via the website above or you can install via Homebrew. The LTS version is recommended and should be supported for at least 2 years. The current version will include the latest but might have a few things that are unstable. It's recommended to use the LTS version for production.

    $ brew install node

Verify you have node installed: `node -v`
Verify you have npm installed: `npm -v`

## NVM to Install Node

To use different node versions on your machine install [nvm](https://github.com/creationix/nvm) (node version manager). Verify it's installed by running: `command -v nvm`.

To install the latest version of node:

    $ nvm install node

To install a specific version of node:

    $ nvm install node 10.16.0

For more info on nvm go to this [page](https://davidwalsh.name/nvm).

## Update NPM to latest version

NPM comes installed with Node.js.
To update npm to the latest version run: `npm install -g npm@latest`

## If using Yarn - Install

Check with your team if they prefer to use npm or Yarn. A benefit Yarn over the default package manager NPM is that it still builds dependencies faster than NPM and it's 100% deterministic.

    $ npm install --global yarn

Then check that you installed it properly.

    $ yarn --version

## Decide Between Manual or Auto Configuration

You have two choices to set up your project. You can create a simple app with a user-friendly full build setup that requires no manual configuration at all. Or you can create a configurable bundler/transpiler that can scale as your project scales. When I'm doing small React POC, I use **create-react-app**. If I'm doing a tools POC or building something a little bigger, I migtht set up my project using **Parcel.js**. Finally if this is going to be a fully scalable enterprise level project I'll install **Babel** and **Webpack**. Instructions for all options are below.

### Create-React-App:

Again, this is for quick POC single page apps that are NOT meant to scale. It doesn't handle backend logic or databases, so you can use it w/any backend you want. It just creates a front end build pipeline.

First navigate to your desired project directory.

    $ npx create-react-app@latest my-app

This will use the latest version of create-react-app and create a repo for you. Then navigate to your new repo root and run the start script.

    $ cd my-app/
    $ npm start

Create-react-app includes a mini web server, Babel, and Webpack. It also watches the files in your app for changes. When a change is made, your app is rebuilt and your browser automatically reloads to display the updated app. For more info, read the [create-react-app documentation](https://create-react-app.dev/docs/getting-started/).

To deploy to production run `npm run build` to create an optimized build of your app in the build folder.

If you want to add to the configuration tools, you can eject create-react-app by running the following script. Beware, that this can't be undone.

```
npm run eject
```

### Parcel.js

Note: Refer to [Parcel](https://parceljs.org/) documentation for the latest how to instructions.

Parcel is a no-config bundler that can help you get a project up and running quickly. To use, you would create your repo normally using `npm init` to create package.json files. Then you can install it as a dev dependency in your project. In case you have problems installing parcel, use sudo to enter username/password.

```
(sudo) npm i parcel --save-dev
```

Make sure your script tag for your entry js file looks like this in the head tag of your index file.

```
<script defer src="script.js"></script>
```

Next you can start parcel by either running in command line or by setting your script file to run:

```
npx parcel index.html // in command line

scripts: {
  "start": "parcel index.html"  // add new script to package.json
}
```

Index.html is our entry point. Our modules will get bundled together and it will start a new development server. Click that in the console to open in the browser(similar to the live-server). It will just be on a different port as live-server. You only need one to develop. Parcel will create a dist folder (distribution) for our production code. Inside will be a new index.html file with the bundled script file.

You can set up **hot module reloading/replacement** by adding this to your main script.js file. Hot module reloading happens when you make changes to your file, HMR will trigger a rebuild and the new files will automatically get injected into the browser to allow for live updates without triggering whole page reload.

```
if(module.hot) {
  module.hot.accept()
}
```

Web bundlers allow you to only specify the package during imports and will automatically find the path to that in the node_modules folder.

When it's time to build your production files do this:

```
"build": parcel build index.html // add script to package.json
```

Parcel will compile, minify and bundle all your final production files.
After this move on to the step for installing Babel for transpiling your code from ES6 down to readable ES5.

### Manual Project Configuration (Webpack/Babel)

You may find that your project needs custom configuration of the setup files. In that case you'd need to setup the React build tools manually. Follow the remaining sections in order to do that.

## Setting Up Existing Projects

- Run `git clone path-to-project` to pull down the repo files to your local directory.
- Run the following to add module dependencies listed in the package.json file. A package-lock.json or yarn.lock will be created.

  Run: `yarn` or `npm install`

## New Projects - Create A Folder Structure

1. Create a folder with your application name `mkdir my-app`.
2. Navigate to the folder in VScode terminal. `cd my-app`
3. Run `npm init -y` to initialize the project. This creates a new node_modules directory and package.json file and the -y flag will default all the questions for the package.json. You can update the name, version, etc manually later.
4. Create an src folder inside your project. `mkdir src`
5. Create two index files `touch src/index.html src/index.js`
6. Create two root config files: `touch .babelrc webpack.config.js`

## Install React, Babel and Webpack

To save a new dependency: `yarn add <package name>` or `npm install <package name>`

Add `--dev` or `-D` to save to devDependencies.

Add `--save-dev` or `-S` to save to dependencies.

1. Install React and React DOM: `npm i -S react react-dom`.
2. Install Babel as a dev dependency: `npm i -D babel-core babel-loader babel-preset-env babel-preset-react`

- **babel-core**: It is the main engine package for the babel.
- **babel-loader**: Loader will transpiles the react JSX code in backward compatible js code with the help of babel and webpack.
- **babel-preset-env**: Add support to ES5/ES6 JavaScript.
- **babel-preset-react**: Add support for React JSX code. Note: babel-loader8.* requires babel7.. If you’d like to use babel6.. You should install babel-loader.7.*

3. Install Webpack: `npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin`

- **webpack**: Main engine for the webpack plugins.
- **webpack-cli**: Provides a command line tool for setting up webpack and it’s plugins.
- **webpack-dev-server**: This will help us to develop a live server for your application.
- **html-webpack-plugin**: Help to create a HTML template for your application.

## Configuring Babel

[Babel](https://babeljs.io/docs/en/usage) takes es6 (future JavaScript) and compiles it down to es5 (current JavaScript), the version currently supported on the majority of browsers.

Paste the following in your .babelrc file:

```
{"presets":["env", "react"]}
```

## Configuring Webpack

[Webpack](https://webpack.github.io/docs/list-of-loaders.html) takes all components that you’ve created puts it together in one bundled JavaScript file and makes it available to send down. That way you can break huge projects down to smaller more manageable modules.

Copy and paste the code from this repo's webpack.config.js file.

- **entry**: Here we will define entry point of our application. From this point webpack will start bundling.
- **output**: We will define the location where the bundled file will reside. i.e., at /dist/bundle.js
- **devServer**: Here development server related configurations present like we provided port number 8080 for development server.
- **test**: We define some regular expression that define which files will pass through which loader.
- **exclude**: Define files that should be excluded by loader.
- **loader**: Define the loaders here which we are going to use.

## Add NPM Scripts

Open your package.json file and add bash commands to make your longer commands shorter and easier to remember.
The word on the left can be anything you want but these are standard ones. The command on the right is what will actually run.

```
    "scripts": {
        "start": "webpack serve --mode development --open --hot",
        "build": "webpack --mode production"
     }
```

To run this on command line for example,
Run: `yarn build` or `$ npm run build` which will run webpack.
For special words like "test" and "start" running `npm test` or `npm t` will also work.

## Create React component files

Add a simple file to see if React is working.

In index.js

```
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>Hello!!</h1>
      <h2>Welcome to your First React App..!</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

In index.html

```
<!DOCTYPE html>
<html lang = "en">
   <head>
      <meta charset = "UTF-8">
      <title>React Web</title>
   </head>
   <body>
      <div id = "root"></div>
      <script src = 'bundle.js'></script>
   </body>
</html>
```

Then try to start your app: `npm start`
Your application will open at “http://localhost:8080/“

If you want to try to generate a production build: `npm run build`. This will create a dist folder and inside it will create two files called bundle.js and index.html that are prod ready files.
At this stage you've successfully configured the project with React, Webpack and Babel.

[Resources](https://dev.to/shivampawar/setup-webpack-and-babel-for-a-react-js-application-24f5)

## Install TypeScript

[TypeScript](https://www.typescriptlang.org/) is a strongly typed superset of JavaScript which uses TypeScript Compiler to compile it into plain JavaScript.

1. Install TypeScript and packages: `npm i -D typescript ts-loader @types/node @types/react @types/react-dom`

- **typescript** package is main engine for TypeScript.
- **ts-loader** is loader for Webpack that integrates TypeScript in Webpack. This will convert files with .ts extension into .js files and bundle it.
- **@types/node**, **@types/react** and **@types/react-dom** contains the type definitions required for node, react and react dom.

## Configure TypeScript and Webpack

1. Create tsconfig.json file to the root directory.
2. Update webpack to support TypeScript. This should already be from instructions above.

[Resources](https://dev.to/shivampawar/setup-react-application-using-typescript-and-webpack-2kn6)
## Install Prettier and ESLint

### Install as dev dependency vs VScode extension

Both eslint and prettier are available as extension in VScode. So why should we install with our project as a dependency? The main advantage is so that devs who might work on the repo in the future and might not be using VScode would know that this is prettier and eslint project. They could get benefits just by using yarn install.

### Installing Prettier

[Prettier](https://prettier.io/) is a style formatter for your project files. To install:

    $ npm install -D prettier

### Installing Eslint

[ESLint](https://eslint.org/) is a JavaScript linting tool. To install:

    $ npm install -D eslint

These modules will be installed inside your node_modules folder.

### Global Installs

_There is an option to install these tools globally if you wish to use them on all your react projects. Run the same commands above but replace -D with -g. The module will be in your Node.js path accesible from any project. Now you won't have to run the install for these tools each time you create a new project. However, when developing in companies this might not be the best workflow._

### Add VScode Extension

In VScode, add the following extensions:

- **ESLint** by Dirk Baeumer
- **Prettier - Code formatter** by Prettier

Open VScode settings (CMD+SHIFT+P) add the following:

    "prettier.requireConfig": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",

The requireConfig means that if a project has the .prettierrc file, run formatting. If it doesn't, then it won't format your files.

### Configuring Prettier

**Why do you need a config?**
You can set up a prettier config file so that each time you save your file, prettier will format it. Otherwise you'd have to run $ npx prettier YourFile.js each time you wanted to format a file.

To create your config file:

    $ touch .prettierrc
    // add empty object to the file for prettier defaults {}

_Note: There is an order of precedence when naming your config file. For example, .prettierrc will take precedence over .prettierrc.json. We can use JSON for both of those. Refer to [prettier config documentation](https://prettier.io/docs/en/configuration.html)._

### Format onSave vs NPM Scripts

If you don't want to format every time you save then add a script to run Prettier in package.json: "format": "prettier --write \"src/\*_/_ .{js,jsx,css,json}\""
Then to format your files type:

    $ npm run format [(optional) specific file name]

### Configuring ESLint

Create a file in your root directory named `.eslintrc.json`.
Fill it with the config code setup from this [.eslintrc.json example file](https://github.com/nikki-experiments/my-react-boilerplate/blob/master/.eslintrc.json).
Add the bash command "lint" in your NPM scripts section of your package.json file.

You should also install extra plugins that will allow prettier and eslint to work well together.

- **eslint-config-prettier** - *integrates prettier with eslint and turns off rules taht conflict or are unnecessary*
- **eslint-plugin-prettier** - *lets you run prettier as if its a linter rule*
- **eslint-plugin-import** - *checks to make sure import paths are correct*
- **eslint-plugin-jsx-a11y** - *adds accessibility checks when turned on*
- **eslint-plugin-react** - *adds react specific linting rules*

In the .eslintrc.json file, add to extends array:

- "eslint:recommended",
- "plugin:react/recommended",  allows for eslint to recognize imports of components
- "plugin:import/errors", allows eslint to throw error if it cant find import path
- "plugin:jsx-a11y/recommended", allows eslint to display accessibility violations
- "plugin:prettier/recommended", allows eslint to get along w/prettier

### Linting Files

There are several strategies for linting files:

- Manually lint files:

    $ eslint [options] file.js [file.js] [dir]

- Create npm lint script in package.json:

    "lint": "eslint \"src/\*_/_.{js,jsx}\""
    $ yarn run lint

### Create ignore files for Prettier and ESLint

You don't want to lint all files or have prettier format every file either. To avoid this, create ignore config files. Refer to the `.eslintignore` file and the `.prettierignore` file in this repo.

### Polyfilling

Some experimental features of JS may not yet get transpiled by Babel. For example Promise.resolve() is at this time not yet supported. So in the build file it will not be converted. You may have to install core-js then, import 'core-js/stable' in your project. This should polyfill JS features that are not transpiled even if your not using them. For example all Array.prototype ES6 features like .map, .filter, .find, etc... will be defined and allowed for use. You can cherry pick those if you want to help reduce the bundle size of your project.

```
import 'core-js/stable; // get all polyfills    OR
import 'core-js/stable/array/find; // if you want to be specific for what you need in your project.
import 'core-js/stable/promise';
```

### Polyfilling async functions

```
npm i regenerator-runtime
```

Then import in script.js

```
import 'regenerator-runtime/runtime';
```

## Setup Hot Module Replacement

[DEPRECATED?] When Hot Module Replacement is setup, you won't have to continually rebuild your files to see changes made to code after you've saved your file. You will be able to save your current state while only the thing you changed gets updated and all without a hard refresh of the page. This makes for incredibly faster development. Yay!

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

Create a folder called '**tests**'.
Inside create a new file for a component that you want to test. Example: "Search.spec.jsx".
Write your tests here. Add "jest": true to the "env" object of your .eslintrc file. Also add the env object with "test" to your .babelrc file similar to the example .babelrc file. This needs to be done in order to let Node understand import statements and JSX in your test file.

#### Run Test

Then run the following:

    $ NODE_ENV=test ./node_modules/.bin/jest

You can also set up npm scripts for this, `yarn test`, such as what's in the package.json file.
If you ran a test using .toMatchSnapshot() then you will notice a folder called **snapshots**. Inside will be everything your test rendered out.

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
