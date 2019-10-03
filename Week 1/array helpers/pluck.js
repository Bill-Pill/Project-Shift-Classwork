
var users = [
  { id: 1, name: 'Bob', email: 'bob@gmail.com' },
  { id: 2, name: 'Cindy', email: 'cindy@gmail.com' },
  { id: 3, name: 'Susan', email: 'susan@gmail.com' },
  { id: 4, name: 'Sarah', email: 'sarah@gmail.com' },
  { id: 5, name: 'Tim', email: 'tim@gmail.com' }
];

var pluck = function (arr, property) {
   var userEmails = arr.map(function(item){

      return item[property];
      
   })
   return userEmails;
  };

console.log(pluck(users, 'email')); // returns ['bob@gmail.com', `cindy@gmail.com`, `susan@gmail.com`, `sarah@gmail.com`, `tim@gmail.com` ];