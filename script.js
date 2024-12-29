// Step1
const searchBox = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details-contant');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

//Step3: function to get recipe 
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
   
   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response = await data.json();

   recipeContainer.innerHTML = "";
   response.meals.forEach(meal => {
    //    console.log(meal);
     const recipeDiv = document.createElement('div');
     recipeDiv.classList.add('recipe');
     recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p> Belongs to <span>${meal.strCategory}</span></p>
     `
     const button = document.createElement('button');
     button.textContent = "View Recipe";
     recipeDiv.appendChild(button);
    
     // Adding Event listner to recipe button
     button.addEventListener('click', () => {
        openRecipePopup(meal);
     })
     
    recipeContainer.appendChild(recipeDiv);
     
   }); 

      
    } catch (error) {
      recipeContainer.innerHTML = "<h2> Error in Fetching Recipes...</h2>";
    }
}



// function to featch ingredents and mesurements
const fetchIngredients = (meal) =>{
   // console.log(meal);
   let ingredientsList = "";
   for (let i = 1; i <=20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
         const measure = meal[`strMeasure${i}`];
         ingredientsList += `<li>${measure} ${ingredient}</li>`
      }
      else {
         break;
      }
   }
   return ingredientsList;
   
}

const openRecipePopup = (meal) => {
   recipeDetails.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul class="ingredientUse">${fetchIngredients(meal)}</ul>
   <div class="recipeInstructions">
      <h3>Instructions:</h3>
      <p >${meal.strInstructions}</p>
   </div>
   `
   
   recipeDetails.parentElement.style.display = 'block';
}

//closebtn
recipeCloseBtn.addEventListener('click', () => {
   recipeDetails.parentElement.style.display = "none";
});


//Step2: Add event listner and create the fetch fun
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    // other step
    if (!searchInput) {
      recipeContainer.innerHTML = `<h2> Type the meal in the search box.</h2>`;
      return;
    }
    fetchRecipe(searchInput);
   //  console.log(searchInput);
    
});
