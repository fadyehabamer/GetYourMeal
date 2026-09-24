const searchBtn = document.getElementById('search-input')

const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('input', getMealList);
// the magnifier button was not wired up; let it (re)run the search, e.g. after a network error
document.getElementById('search-btn').addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

let latestRequest = 0;

function getMealList() {
    // results can arrive out of order while the user types; only render the newest one
    const requestId = ++latestRequest;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchBtn.value.trim())}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (requestId !== latestRequest) return;
            let html = ''
            if (data.meals) {
                data.meals.forEach(meal => {
                    html +=
                        `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        })
        .catch(() => {
            if (requestId !== latestRequest) return;
            mealList.innerHTML = "Sorry, we couldn't reach the recipe service. Please try again.";
            mealList.classList.add('notFound');
        });
}


function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(mealItem.dataset.id)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!data.meals) throw new Error('Meal not found');
                mealRecipeModal(data.meals);
            })
            .catch(() => {
                alert("Sorry, we couldn't load this recipe. Please try again.");
            });
    }
}

function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}