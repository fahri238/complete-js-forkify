// business logic
// state
// http library

import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
// import { AJAX, sendJSON } from './helper';
import { AJAX } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    // resultsPerPage: 10, "10" like a magic number
    page: 1, // default
    resultsPerPage: RES_PER_PAGE, // better way, because we know what value for
    sortBy: 'duration', // default
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    // 1: loading recipe
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    // temp error handling
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1; // set new results search to page 1
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity / state.recipe.servings) * newServings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBoomark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBoomark = function (id) {
  // delete bookmark
  const index = state.bookmarks.find(el => (el.id = id));
  state.bookmarks.splice(index, 1);

  // set bookmarked recipe to false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// clear all bookmarked recipes just for development
const clearBookmars = function () {
  localStorage.clear('bookmarks');
};
// clearBookmars();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingArr = ingredient[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong Ingredient format, please use the correct format :)',
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBoomark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const sortResultRecipes = async function (sortBy) {
  state.search.sortBy = sortBy;

  // Fetch ALL search results with full recipe data for accurate sorting
  const res = await Promise.all(
    state.search.results.map(async el => {
      const data = await AJAX(`${API_URL}${el.id}?key=${KEY}`);
      return createRecipeObject(data);
    }),
  );

  // Replace all results with full data
  state.search.results = res;

  // Sort based on selected option
  if (sortBy === 'duration') {
    state.search.results.sort(
      (a, b) => (a.cookingTime || 0) - (b.cookingTime || 0),
    );
  }

  if (sortBy === 'number-ings') {
    state.search.results.sort((a, b) => {
      const ingredsA = a.ingredients.length || 0;
      const ingredsB = b.ingredients.length || 0;
      return ingredsA - ingredsB;
    });
  }

  // Reset to page 1 after sorting
  state.search.page = 1;
};
