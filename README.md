# YemayaPrideAPI

### Visit the beta deployment of this web application at the following url:

http://www.ypride.me

  1. Sign Up Via the forms provided on the page, an authentication token will be sent via email. :exclamation::exclamation::exclamation: Save the token :exclamation::exclamation::exclamation:

  2. Add the value returned to the x-auth header of all your requests to the various endpoints.

### Testing the API Endpoints

  Mocha and SuperTest frameworks are used to perform unit testing on the various endpoints:
  1. Resolve project dependencies using npm install

  2. ```npm start ``` to start the server.

  3. ```npm run test-watch ``` to run the full test suite.
    The server uses separate environments for testing and development. Operations performed on one collection
    will not affect another.
  
  [![Build Status](https://travis-ci.org/dwil2444/YemayaPrideAPI.svg?branch=master)](https://travis-ci.org/dwil2444/YemayaPrideAPI)
  [![License](https://img.shields.io/github/license/dwil2444/YemayaPrideAPI.svg?style=flat)](https://github.com/dwil2444/YemayaPrideAPI/blob/master/LICENSE)

### Help & Community
The Website serves as the user interfacing frontend for the Yemaya's Pride Project

The responsive layout is built from the creative one-page bootstrap template:

### https://github.com/BlackrockDigital/startbootstrap-creative
