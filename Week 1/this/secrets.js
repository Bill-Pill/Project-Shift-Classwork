/*Partner Exercise 5
The code below has a few problems. Fix the 3 syntax errors and 1 logical error. The flow of this is really tricky, so take it slow and write it out if you need to:
*/

var revealSecret = function () {
  return this.secret;
};

var shoutIt = function (person, func) {
  person.revealItAll = func;
  var result = person.revealItAll();
  console.log(person.name + " said: " + result);
};

var aaron = {
  name: "Aaron",
  secret: "Im scared of heights!"
};

var sean = {
  name: "Sean",
  secret: "Go, Sox!"
};

shoutIt(aaron, revealSecret);
shoutIt(sean, revealSecret);