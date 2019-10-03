let recipe = 

{
  "name": "Broccoli Cheese Soup",
    "serves": 6,
      "servings": {
    "count": 3,
      "unit": "cup",
        "calories": 600
  },
  "ingredients": [
    {
      "name": "broccoli",
      "unit": "head",
      "count": 4
    },
    {
      "name": "garlic clove",
      "count": 2
    },
    {
      "name": "onion",
      "count": 2
    },
    {
      "name": "chicken stock",
      "count": 4.5,
      "unit": "cup"
    },
    {
      "name": "sharp cheddar cheese",
      "count": 4.5,
      "unit": "cup"
    },
    {
      "name": "parmesan cheese",
      "count": 1.25,
      "unit": "cup"
    },
    {
      "name": "milk",
      "count": 2,
      "unit": "cup"
    },
    {
      "name": "water"
    },
    {
      "name": "butter",
      "count": 4,
      "unit": "tablespoon"
    },
    {
      "name": "salt",
      "count": 2,
      "unit": "teaspoon"
    },
    {
      "name": "pepper",
      "count": 1,
      "unit": "teaspoon"
    }
  ],
    "directions": [
      "Trim broccoli florets from stalks.",
      "Chop broccoli stalks into 1 inch cubes.",
      "Dice onion.",
      "Mince garlic.",
      "In a pot large enough to contain all ingredients, sauté onions in butter until tender, about 5 minutes.",
      "Add garlic and sauté until fragrant.",
      "Add chicken stock and bring to a low simmer. Simmer uncovered for 20 minutes.",
      "Meanwhile, add milk to a pot over low heat.",
      "Stir in cheeses slowly, a 1/2 cup at a time, waiting for each batch to melt before adding any more.",
      "Remove from heat.",
      "Once broccoli is done simmering, divide up contents of pot and blend to a find consistency. Return to pot once done.",
      "Add cheese sauce, salt, and pepper to the large pot over medium heat. Stir to combine.",
      "Add water as necessary to achieve desired consistency.",
      "Remove from heat.",
      "Do not attempt to actually make this! I made it up and it would be terrible."
    ]
}
var converter = function(decimal) {
  var gcd = function (a, b) {
    if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.
    return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
  };
  var fraction = decimal;
  var len = fraction.toString().length - 2;
  var denominator = Math.pow(10, len);
  var numerator = fraction * denominator;
  var divisor = gcd(numerator, denominator);    // Should be 5
  numerator /= divisor;                         // Should be 687
  denominator /= divisor;                       // Should be 2000
  return (numerator + "/" + denominator)
}


console.log(recipe.name)
console.log("====")
console.log("")
console.log("")

console.log("Makes " + recipe.serves 
+ ", " + recipe.servings.count + " "
+ recipe.servings.unit + " servings of " + recipe.servings.calories 
+ " calories each.")
console.log("")
console.log("")

console.log("Ingredients")
console.log("----")
recipe.ingredients.forEach(function(ingredient) {
  let amount = ""
  let unit = ""
  if (ingredient.count) {
    unit = (Math.trunc(ingredient.count / 1)).toString();
    if (ingredient.count % 1 > 0) {
      unit += " " + converter(ingredient.count % 1).toString();

    }
  }

  if (ingredient.unit) {
    amount = " (" + unit
    + " " + ingredient.unit + (ingredient.count > 1 ? "s":"") + ")"
  } else if (ingredient.count) {
    amount = " (" + unit
    + ")"
  }
  console.log("* " + ingredient.name + amount)
})

console.log("")
console.log("Directions")
console.log("----")

let stepCount = 1;
recipe.directions.forEach(function(direction) {
  console.log(stepCount + ". " + direction)
  stepCount += 1;
})