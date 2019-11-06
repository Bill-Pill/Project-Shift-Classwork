var http = require('http');
var finalHandler = require('finalhandler');
var queryString = require('querystring');
var url = require('url');
var Router = require('router');
var bodyParser = require('body-parser');
var fs = require('fs');
// State holding variables
var goals = [];
var user = {};
var users = [];
var categories = [];

// Setup router
var myRouter = Router();
myRouter.use(bodyParser.json());

// This function is a bit simpler...
http.createServer(function (request, response) {
  myRouter(request, response, finalHandler(request, response))
}).listen(3001, () => {
  // Load dummy data into server memory for serving
  goals = JSON.parse(fs.readFileSync("goals.json", "utf-8"));

  // Load all users into users array and for now hardcode the first user to be "logged in"
  users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  user = users[0];

  // Load all categories from file
  categories = JSON.parse(fs.readFileSync("categories.json", "utf-8"));
});

// Notice how much cleaner these endpoint handlers are...
myRouter.get('/v1/goals', function (request, response) {
  // Get our query params from the query string
  const queryParams = queryString.parse(url.parse(request.url).query)

  if (queryParams.query) {
    // Saves query value
    const searchQuery = queryParams.query;

    // Return only goals including searchQuery
    const matchingGoals = goals.filter(goal => {
      return (goal.description.includes(searchQuery))
    })
    // Return all matching goals
    return response.end(JSON.stringify(matchingGoals));
  }
  // Returns all goals if no goal query given
  else {
    return response.end(JSON.stringify(goals))
  }

});

myRouter.get('/v1/categories', function (request, response) {

  return response.end(JSON.stringify(categories))
})

myRouter.get('/v1/categories/:categoryId/goals', function (request, response) {

  let goalsInCategory = goals.filter((goal) => {
    return goal.categoryId == request.params.categoryId
  })

  return response.end(JSON.stringify(goalsInCategory));
});

myRouter.get('/v1/me', function (request, response) {

  return response.end(JSON.stringify(user))
})

// See how i'm not having to build up the raw data in the body... body parser just gives me the whole thing as an object.
// See how the router automatically handled the path value and extracted the value for me to use?  How nice!
myRouter.post('/v1/me/goals/:goalId/accept', function (request, response) {
  // Find goal from id in url in list of goals
  let goal = goals.find((goal) => {
    return goal.id == request.params.goalId
  })
  // Add it to our logged in user's accepted goals
  user.acceptedGoals.push(goal);
  // No response needed other than a 200 success
  return response.end("Goal added!");
});

myRouter.post('/v1/me/goals/:goalId/achieve', function (request, response) {
  // Find goal from id in url in list of goals
  let goal = goals.find((goal) => {
    return goal.id == request.params.goalId
  })
  // Add it to our logged in user's accepted goals
  user.achievedGoals.push(goal);
  // No response needed other than a 200 success
  return response.end("Goal achieved!");
});

myRouter.post('/v1/me/goals/:goalId/challenge/:userId', function (request, response) {
  // Find goal from id in url in list of goals
  let goal = goals.find((goal) => {
    return goal.id == request.params.goalId
  })
  // Find the user who is being challenged in our list of users
  let challengedUser = users.find((user) => {
    return user.id == request.params.userId
  })
  // Make sure the data being changed is valid
  if (!goal) {
    response.statusCode = 400
    return response.end("No goal with that ID found.")
  }
  // Add the goal to the challenged user
  challengedUser.challengedGoals.push(goal);
  // No response needed other than a 200 success
  return response.end('CHALLENGE ACCEPTED');
});

myRouter.post('/v1/me/goals/:goalId/gift/:userId', function (request, response) {
  // Find goal from id in url in list of goals
  let goal = goals.find((goal) => {
    return goal.id == request.params.goalId
  })
  // Find the user who is being GIFTED in our list of users
  let giftedUser = users.find((user) => {
    return user.id == request.params.userId
  })
  // Make sure the data being changed is valid
  if (!goal) {
    response.statusCode = 400
    return response.end("No goal with that ID found.")
  }
  // Add the goal to the challenged user
  giftedUser.giftedGoals.push(goal);
  // No response needed other than a 200 success
  return response.end('gift given!');
});