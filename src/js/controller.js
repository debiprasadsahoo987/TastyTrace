import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1.Load recipe

    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1. get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2.load search results
    await model.loadSearchResults(query);

    // 3.render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.adHandlerSearch(controlSearchResults);
};

init();
