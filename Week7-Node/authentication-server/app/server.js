var http = require("http");
var fs = require("fs");
const finalHandler = require("finalhandler");
const Router = require("router");
const bodyParser = require("body-parser");
const uid = require('rand-token').uid

const CORS_HEADERS = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, X-Authentication"};
// Created with https://www.uuidgenerator.net/
const VALID_API_KEYS = ["88312679-04c9-4351-85ce-3ed75293b449","1a5c45d3-8ce7-44da-9e78-02fb3c1a71b7"];
const TOKEN_VALIDITY_TIMEOUT = 15 * 60 * 1000;

const PORT = 3001;
// State holding variables
let stores = [];
let users = [];
let tokens = [];
let failedLoginAttempts = {};

// Helper method to process access token
var getValidTokenFromRequest = function(request) {
  var parsedUrl = require('url').parse(request.url, true);
  if (parsedUrl.query.accessToken) {
    // Verify the access token to make sure it's valid and not expired
    let currentAccessToken = tokens.find(accessToken => {
       return accessToken.token == parsedUrl.query.accessToken && ((new Date) - accessToken.lastUpdated) < TOKEN_VALIDITY_TIMEOUT;
    });
    if (currentAccessToken) {
      return currentAccessToken;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Setup router
var myRouter = Router();
myRouter.use(bodyParser.json());

http.createServer((request, response) => {
    // Handle CORS Preflight request
  if (request.method === 'OPTIONS'){
    response.writeHead(200, CORS_HEADERS);
    return response.end();
  }

  // Verify that a valid API Key exists before we let anyone access our API
  if (!VALID_API_KEYS.includes(request.headers["x-authentication"])) {
    response.writeHead(401, "You need to have a valid API key to use this API", CORS_HEADERS);
    return response.end();
  }

    myRouter(request, response, finalHandler(request, response));
  }).listen(PORT, error => {
    if (error) {
      return console.log("Error on Server Startup: ", error);
    }
    fs.readFile("stores.json", "utf8", (error, data) => {
      if (error) throw error;
      stores = JSON.parse(data);
      console.log(`Server setup: ${stores.length} stores loaded`);
    });
    fs.readFile("users.json", "utf8", (error, data) => {
      if (error) throw error;
      users = JSON.parse(data);
      console.log(`Server setup: ${users.length} users loaded`);
    });
    console.log(`Server is listening on ${PORT}`);
  });

myRouter.get("/", (request, response) => {
  response.end("There's nothing to see here, please visit /api/stores");
});

// Public route - all users of API can access
myRouter.get("/api/stores", (request, response) => {
    response.writeHead(200, Object.assign(CORS_HEADERS,{'Content-Type': 'application/json'}));
    return response.end(JSON.stringify(stores.map((store)=> {
      let clonedStore = Object.assign({},store);
      delete clonedStore.issues;
      return clonedStore;
      })));

});

myRouter.post("/api/login", (request, response) => {

  let username = request.body.username;
  let password = request.body.password;

  // Make sure there is a username and password in the request
  if (!username || !password) {
    response.writeHead(400, "Error: username and password cannot be empty.", CORS_HEADERS);
    response.end();
  }
  
  // if no prior failed attempts, initialize value for username
  if (!failedLoginAttempts[username]){
    failedLoginAttempts[username] = 0;
  }

  if (failedLoginAttempts[username] >= 3) {
    response.writeHead(401, "Error: Too many unsuccessful login attempts", CORS_HEADERS);
    response.end();
  }

  // See if there is a user that has that username and password
  if (!users.find(user => (user.login.username === username) && (user.login.password === password) && failedLoginAttempts[username] < 3)) {
    let numFailedForUser = failedLoginAttempts[username];
    if (numFailedForUser) {
      failedLoginAttempts[username]++;
    } else {
      failedLoginAttempts[username] = 1
    }
    response.writeHead(401, "Error: username and/or password incorrect", CORS_HEADERS);
    response.end();
  }
  // Write the header because we know we will be returning successful at this point and that the response will be json
  response.writeHead(200, Object.assign(CORS_HEADERS,{'Content-Type': 'application/json'}));

  let currentUser = (users.find(user => (user.login.username === username) && (user.login.password === password)))

  // We have a successful login, if we already have an existing access token, use that
      let currentAccessToken = tokens.find((tokenItem) => {
        return tokenItem.username == user.login.username;
      });
      // Update the last updated value so we get another time period
      if (currentAccessToken) {
        currentAccessToken.lastUpdated = new Date();
        return response.end(JSON.stringify(currentAccessToken.token));
      } else {
        // Create a new token with the user value and a "random" token
        let newAccessToken = {
          username: currentUser.login.username,
          lastUpdated: new Date(),
          token: uid(16)
        }
        tokens.push(newAccessToken);
        return response.end(JSON.stringify(newAccessToken.token));
      }
})


//Public route - view general data for a specific store
myRouter.get("/api/stores/:storeId", (request, response) => {
  const { storeId } = request.params;
  response.end(JSON.stringify(stores[storeId]));
});

// Only logged in users can access a specific store's issues
myRouter.get("/api/stores/:storeId/issues", (request, response) => {
  let currentAccessToken = getValidTokenFromRequest(request);
  if (!currentAccessToken) {
    // If there isn't an access token in the request, we know that the user isn't logged in, so don't continue
    response.writeHead(401, "You need to have access to this call to continue", CORS_HEADERS);
    return response.end();
  } else {
    // Check if the current user has access to the store
  let user = users.find((user) => {
    return user.login.username == currentAccessToken.username;
  });
    // Verify that the store exists to know if we should continue processing
    let store = stores.find((store) => {
      return store.id == request.params.storeId;
    });
    if (!store) {
      // If there isn't a store with that id, then return a 404
      response.writeHead(404, "That store cannot be found", CORS_HEADERS);
      return response.end();
    } else {
      // Only if the user has access to that store do we return the issues from the store
    if (user.storeIds.includes(request.params.storeId)) {
      response.writeHead(200, Object.assign(CORS_HEADERS,{'Content-Type': 'application/json'}));
      return response.end(JSON.stringify(store.issues));
    } else {
      response.writeHead(403, "You don't have access to that store", CORS_HEADERS);
      return response.end();
    }
    }
  }
});

// Only managers can update a store's issues
myRouter.post('/api/stores/:storeId/issues', function(request,response) {
  let currentAccessToken = getValidTokenFromRequest(request);
  if (!currentAccessToken) {
    // If there isn't an access token in the request, we know that the user isn't logged in, so don't continue
    response.writeHead(401, "You need to have access to this call to continue", CORS_HEADERS);
    return response.end();
  } else {
    // Verify that the store exists to know if we should continue processing
    let store = stores.find((store) => {
      return store.id == request.params.storeId;
    });
    if (!store) {
      // If there isn't a store with that id, then return a 404
      response.writeHead(404, "That store cannot be found", CORS_HEADERS);
      return response.end();
    }
    // Check if the current user has access to the store
    let user = users.find((user) => {
      return user.login.username == currentAccessToken.username;
    });

    // Only if the user has access to that store do we return the issues from the store
    if (user.storeIds.includes(request.params.storeId) && (user.role == 'ADMIN' || user.role == 'MANAGER')) {
      store.issues = request.body;
      response.writeHead(200, Object.assign(CORS_HEADERS,{'Content-Type': 'application/json'}));
      return response.end(store);
    } else {
      response.writeHead(403, "You don't have access to that store", CORS_HEADERS);
      return response.end();
    }
  }
});