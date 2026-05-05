// aplication router
// aplication logic

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// Polyfills to support older browsers (e.g., IE11)
// polyfiling everyting
import 'core-js/stable';

// polyfiling async await
import 'regenerator-runtime/runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1: loading recipe
    await model.loadRecipe(id);

    // 2: rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search result
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
  } catch (error) {
    recipeView.renderError(error);
  }
};

// Subscriber
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandleSearch(controlSearchResults);
};
init();
