if (
  localStorage.getItem("userFoodChoice") == null ||
  localStorage.getItem("userFoodChoice") == undefined
) {
  localStorage.setItem("userFoodChoice", "pizza");
}
var breakfastList = ["pancakes" ,"breakfast potatoes", "Full English Breakfast"];
var lunchList = [];
var dinnerList = [];
var userChoice = localStorage.getItem("userFoodChoice");
var userChoicePhoto = localStorage.getItem("userFoodChoice");
userChoicePhoto.toLowerCase();
userChoicePhoto.replace(" ", "|");
console.log(userChoicePhoto);

var recipeURL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userChoice;
$(".random-meal").click(function () {
  console.log($(this).attr("value"));
});
//search functions for user choices
$("#search").click(function () {
  localStorage.setItem("userFoodChoice", $("#inputSearch").val());
  window.open("index.html", "_self");
});

$("#search").click(function () {
  userChoice = $("#inputSearch").val();
  console.log(userChoice);
});
//image for food item searched by user
function displayImage(URL, alt) {
  $("#foodPic").attr("src", URL);
  $("#foodPic").attr("alt", alt);
}
//info on the food item searched
function displayText(header, paragraph) {
  $("#title").append(header);
  $("#recipeText").append(paragraph);
}
//food items recipe in a list
function displayList(list) {
  for (let i = 0; i < list.length; i++) {
    let recipeItem = $("<li>" + list[i] + "</li>");
    $("#foodItemRecipe").append(recipeItem);
  }
}



// grabbing response from mealdb api
$.ajax({
  url: recipeURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  var imageURL = response.meals[0].strMealThumb;
  let ingredientPath = response.meals[0];

  let list = [];

  for (let i = 1; i < 20; i++) {
    var ingredient = "strIngredient" + i;
    var measurement = "strMeasure" + i;

    if (ingredientPath[ingredient] === "") {
      break;
    }
    list.push(ingredientPath[ingredient] + ": " + ingredientPath[measurement]);
  }
  console.log(list);
  console.log(response);
  header = response.meals[0].strMeal;
  paragraph = response.meals[0].strInstructions;
  displayImage(imageURL, header);
  displayText(header, paragraph);
  displayList(list);
});
