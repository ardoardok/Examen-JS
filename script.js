document.addEventListener('DOMContentLoaded', displayRecipes);
document.getElementById('recipe-form').addEventListener('submit', addRecipe);

function getRecipes() {
    return JSON.parse(localStorage.getItem('recipes')) || [];
}

function setRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function addRecipe(e) {
    e.preventDefault();

    let title = document.getElementById('recipe-title').value;
    let ingredients = document.getElementById('recipe-ingredients').value;
    let steps = document.getElementById('recipe-steps').value;

    let recipe = { title, ingredients, steps };
    let recipes = getRecipes();
    recipes.push(recipe);
    setRecipes(recipes);

    document.getElementById('recipe-form').reset();
    displayRecipes();
}

function displayRecipes() {
    let recipes = getRecipes();
    let recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        let div = document.createElement('div');
        div.className = 'recipe';
        div.innerHTML = `
            <h2>${recipe.title}</h2>
            <p><strong>Ingrédients:</strong> ${recipe.ingredients}</p>
            <p><strong>Étapes:</strong> ${recipe.steps}</p>
            <button onclick="editRecipe(${index})">Modifier</button>
            <button onclick="deleteRecipe(${index})">Supprimer</button>
        `;
        recipeList.appendChild(div);
    });
}

function deleteRecipe(index) {
    let recipes = getRecipes();
    recipes.splice(index, 1);
    setRecipes(recipes);
    displayRecipes();
}

function editRecipe(index) {
    let recipes = getRecipes();
    document.getElementById('recipe-title').value = recipes[index].title;
    document.getElementById('recipe-ingredients').value = recipes[index].ingredients;
    document.getElementById('recipe-steps').value = recipes[index].steps;

    deleteRecipe(index);
}
