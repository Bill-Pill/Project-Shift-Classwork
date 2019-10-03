var shoes = [
    { name: 'Nike', price: 200},
    { name: 'Red Wings', price: 250 },
    { name: 'Vans', price: 150 },
    { name: 'Converse', price: 160 },
    { name: 'Reebok', price: 130 },
    { name: 'New Balance', price: 175 },
    { name: 'Adidas', price: 95 },
    { name: 'Keds', price: 140 },
    { name: 'Crocs', price: 135 }
  ];

var findWhere = function (array, criteria) {
    // find on the array and return the result
    return array.find(function(item){
        // look at each key in criteria
        for (key in criteria){
            // If the value for the key in criteria is equal to the value of the key in item, return true
            if (criteria[key] === item[key]) {
                return true
            }
        }
        // If none of the keys have values that match, then return false
        return false
    })
};

var myShoe = findWhere(shoes, { price: 95 }); // result { name: 'Adidas', price: 95 }

console.log(myShoe);