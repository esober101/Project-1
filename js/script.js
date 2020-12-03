// if there was a error and the elements from $() are hidden we need the show method() to display them again on the page in case the page is reloaded
$("h5, #foodItemRecipe").show();
// we check the first condition if we have any userFoodChoice in the local storage to display it on the screen and if there is none then we need to add one in order to get something displayed on the screen
if (
  localStorage.getItem("userFoodChoice") == null ||
  localStorage.getItem("userFoodChoice") == undefined
) {
  localStorage.setItem("userFoodChoice", "pizza");
}
var header, paragraph;
//bellow are lists with names of food or cocktail which will be used when user will push random button
var breakfastList = [
  "Pancakes",
  "Breakfast Potatoes",
  "English Breakfast",
  "Full English Breakfast",
  "French Omelette",
  "Banana Pancakes",
  "Salmon Eggs Eggs Benedict",
  "Polskie Naleśniki (Polish Pancakes)",
  "Provençal Omelette Cake",
  "Spanish Tortilla",
];
var lunchList = [
  "Big mac",
  "Vegetarian chilli",
  "Thai green curry",
  "Lasagna Sandwiches",
  "Chicken Ham and Leek Pie",
  "Clam chowder",
  "Creamy Tomato Soup",
  "Corba",
  "Egg Drop Soup",
  "French Onion Soup",
  "Grilled Mac and Cheese Sandwich",
  "Lamb Tzatziki Burgers",
  "Mediterranean Pasta Salad",
  "Shawarma",
];
var dinnerList = [

  "Beef lo mein",
  "Chicken handi",
  "Salmon Prawn Risotto",
  "Beef Brisket Pot Roast",
  "Beef Wellington",
  "Beef stroganoff",
  "Chilli prawn linguine",
  "Beef Bourguignon",
  "Coq au vin",
  "Chicken Ham and Leek Pie",
  "Chicken Marengo",
  "Duck Confit",
  "Kentucky Fried Chicken",
  "Kung Po Prawns",
  "Honey Teriyaki Salmon",
  "General Tso's Chicken",
  "Seafood fideuà",
  "Vegan Lasagna",
  "Vegetarian Casserole",
];
var alcoholicCocktailList = [
  "Margarita",
  "Daiquiri",
  "Old Fashioned",
  "Long Island Tea",
  "Negroni",
  "Whiskey Sour",
  "Dry Martini",
  "Manhattan",
  "Moscow Mule",
  "Michelada",
  "Gin and Soda",
  "Orange Rosemary Collins",
  "Garibaldi Negroni",
  "The Strange Weaver",
  "Pure Passion",
  "Autumn Garibaldi",
  "Blueberry Mojito",
  "Lazy Coconut Paloma",
  "Death in the Afternoon",
];
var nonalcoholicCocktailList = [
  "Afterglow",
  "Apple Karate",
  "Fruit Cooler",
  "Limeade",
  "Yoghurt Cooler",
  "Thai Iced Tea",
  "Sweet Bananas",
  "Strawberry Shivers",
  "Spiced Peach Punch",
  "Rail Splitter",
  "Pysch Vitamin Light",
  "Pineapple Gingerale Smoothie",
  "Lassi - Mango",
  "Just a Moonmint",
  "Kill the cold Smoothie",
  "Holloween Punch",
  "Coke and Drops",
  "Bora Bora",
];
var userChoice = localStorage.getItem("userFoodChoice");
var userChoicePhoto = localStorage.getItem("userFoodChoice");
var cocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userChoice;
var recipeURL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userChoice;
//display the userChoice that is in the localStorage
displayFoodOrDrink();
//on click on a random meal button will be displayed a random meal
$(".random-meal").click(function () {
  console.log($(this).attr("value"));
  if ($(this).attr("value") === "Breakfast") {
    userChoice = getRandomItem(breakfastList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  } else if ($(this).attr("value") === "Lunch") {
    userChoice = getRandomItem(lunchList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  } else {
    userChoice = getRandomItem(dinnerList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  }
});
//on click on a random cocktail button will be displayed a random cocktail depending on the choice of the user
$(".random-cocktail").click(function () {
  console.log($(this).attr("value"));
  if ($(this).attr("value") === "Alcoholic") {
    userChoice = getRandomItem(alcoholicCocktailList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  } else if ($(this).attr("value") === "Non-alcoholic") {
    userChoice = getRandomItem(nonalcoholicCocktailList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  }
});

// on pushing the search button we get the value from the text field, then using that word we look in the apis.
$("#searchButton").click(function () {
  $("h5, #foodItemRecipe").show();
  userChoice = $("#inputSearch").val();
  // Grabbing cocktail from cocktailDB
  cocktailUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userChoice;
  recipeURL =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userChoice;
  //when we look in the apis if we find a positive response then we display it, if the response is negative, we display a error message
  displayFoodOrDrink();
});

function displayFoodOrDrink() {
  $.ajax({
    url: cocktailUrl,
    method: "GET",
  }).then(function (cocktailResponse) {
    $.ajax({
      url: recipeURL,
      method: "GET",
    }).then(function (response) {
      //condition bellow checks if the return object is equal with null or not
      if (response.meals != null) {
        console.log(response);
        var imageURL = response.meals[0].strMealThumb;
        let ingredientPath = response.meals[0];

        let list = [];

        for (let i = 1; i < 15; i++) {
          var ingredient = "strIngredient" + i;
          var measurement = "strMeasure" + i;

          if (ingredientPath[ingredient] === "") {
            break;
          }
          list.push(
            ingredientPath[ingredient] + " | " + ingredientPath[measurement]
          );
        }
        console.log(list);
        console.log(response);
        header = response.meals[0].strMeal;
        paragraph = response.meals[0].strInstructions;
        displayImage(imageURL, header);
        displayText(header, paragraph);
        displayList(list);
      } else if (cocktailResponse.drinks != null) {
        console.log(cocktailResponse);
        var imageURL = cocktailResponse.drinks[0].strDrinkThumb;
        let ingredientPath = cocktailResponse.drinks[0];

        let list = [];

        for (let i = 1; i < 20; i++) {
          var ingredient = "strIngredient" + i;
          var measurement = "strMeasure" + i;

          if (
            ingredientPath[ingredient] === "" ||
            ingredientPath[ingredient] == null
          ) {
            break;
          }
          if (ingredientPath[measurement] == null) {
            ingredientPath[measurement] = "To taste";
          }
          list.push(
            ingredientPath[ingredient] + ": " + ingredientPath[measurement]
          );
        }
        console.log(list);
        console.log(cocktailResponse);
        header = cocktailResponse.drinks[0].strDrink;
        paragraph = cocktailResponse.drinks[0].strInstructions;
        displayImage(imageURL, header);
        displayText(header, paragraph);
        displayList(list);
      } else {
        //we need to add here what will be displayed on the screen
        // when we will not get an positive response from Api
        displayErrorMessage();
        console.log(
          "This alert happens when user introduces a word that MealDB API cannot find."
        );
      }
    });
  });
}

//image for food item searched by user
function displayImage(URL, alt) {
  $("#foodPic").attr("src", URL);
  $("#foodPic").attr("alt", alt);
}
//info on the food item searched
function displayText(header, paragraph) {
  $("#title").text("");
  $("#recipeText").text("");
  $("#title").append(header);
  $("#recipeText").append(paragraph);
}
//food items recipe in a list
function displayList(list) {
  $("#foodItemRecipe").empty();
  for (let i = 0; i < list.length; i++) {
    let recipeItem = $("<li>" + list[i] + "</li>");
    $("#foodItemRecipe").append(recipeItem);
  }
}
//this function has the parameter a list and returns back a random element from that list
function getRandomItem(mealList) {
  var random = Math.floor(Math.random() * mealList.length);
  return mealList[random];
}
//this function returns a message on the screen when the word user inserted is not found in the APIs
function displayErrorMessage() {
  $("h5, #foodItemRecipe").hide();
  $("#title").text("Sorry, We cannot find your search request.");
  $("#recipeText").text(
    "If you are not sure what to search, try our random cocktail or food buttons."
  );
  displayImage(
    "images/clipart645651.png",
    "Error Message For Not Finding Search Item"
  );
}
