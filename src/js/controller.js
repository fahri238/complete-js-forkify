// aplication router
// aplication logic

import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Polyfills to support older browsers (e.g., IE11)
// polyfiling everyting
import 'core-js/stable';

// polyfiling async await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
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
    alert(err);
  }
};

['hashchange', 'load'].forEach(event => addEventListener(event, controlRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
