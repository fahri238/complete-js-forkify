// business logic
// state
// http library

import 'regenerator-runtime/runtime';
import { API_URL } from './config';
import { getJSON } from './helper';


export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // 1: loading recipe
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    // temp error handling
    throw error;
  }
};
