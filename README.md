## Golumn
Golumn is a desktop application for viewing data provided from the terminal.

### Running locally for development
* First install the dependencies: `yarn install`
* The web server for the react app needs to be running in the background: `yarn start`
* UI changes will be hot reloaded on save

**Installing and running Golumn CLI**
* From the root of the project:
  * `cd /command_line/golumn`
  * `npm install -g`
  * `npm link`
* Now the golumn-cli should be available globally.

Here is how to execute golumn in your terminal:
* `cat ~/Documents/test.csv | golumn --dev`
* NOTE: While developing you must provide the `--dev` flag so that golumn-cli looks for the project folder instead of the golumn electron executable.

### Building The Application
* `npm run preelectron-pack`
* `npm run electron-pack`
* The application installer and executable will be generated in the `dist` folder.

NOTE: The golumn command line app should look for the electron executable. This is still a work in progress. The electron app currently does not install the golumn-cli when it starts.
