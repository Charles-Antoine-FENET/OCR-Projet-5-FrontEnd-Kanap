# Kanap #

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.


### Front End Javascript Architecture ###

Elements and assets used on the web site are displayed and managed with javascript. 
The "Utils" directory is used as a library of functions: 
- "dataApiManager" store functions that communicate with the API.
- "displayConfig" store functions needed to be able to display informations on the screen.
- "formManager" store functions needed to check formular inputs.
- "fxLibrary" store different type of functions needed through the project.

Then cart.js, confirmation.js, index.js, product.js are created to feed directly the html pages.
These files import what they need from "utils" directory in order to keep a easy reading code.👌 