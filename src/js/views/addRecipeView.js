import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _uploadColEl = document.querySelector('.upload__column');
  _ingredientInputs = document.querySelectorAll('.input-ingredient');

  constructor() {
    super();
    this._addHanlderShowWindow();
    this._addHanlderHideWindow();
    this._ingredientsValidation();
  }

  _ingredientsValidation() {
    const foodUnits = [
      'g',
      'kg',
      'mg',
      'ml',
      'l',
      'oz',
      'lbs',
      'tsp',
      'tbsp',
      'cup',
      'cups',
      'piece',
      'pieces',
      'clove',
      'cloves',
      'pinch',
      'can',
      'slice',
    ];

    this._ingredientInputs.forEach(input => {
      input.addEventListener('input', function (e) {
        const value = e.target.value.toLowerCase();

        const part = value.split(',').map(ing => ing.trim());

        const partQuantity = part[0];
        const partUnit = part[1];
        const partDescription = part[2];

        if (
          (partQuantity === '' && partUnit !== '' && partDescription === '') ||
          (partQuantity !== '' && partUnit !== '' && partDescription === '')
        ) {
          e.target.setCustomValidity(
            'Make sure input the Description if Quantity or Unit have been inputed',
          );
          e.target.reportValidity();
          return;
        }

        if (value === '') {
          // valid
          e.target.setCustomValidity('');
          return;
        }

        if (
          part.length === 3 &&
          foodUnits.includes(partUnit) &&
          !isNaN(partQuantity)
        ) {
          e.target.setCustomValidity('');
          return;
        }

        // invalid format
        if (part.length !== 3) {
          e.target.setCustomValidity(
            'Make sure mathcing the input format "Quantity,Unit,Description", if it is blank separated with coma',
          );
          e.target.reportValidity();
          return;
        }

        // invalid quantity
        if (isNaN(partQuantity)) {
          e.target.setCustomValidity(
            'Quantity should be a number eg 1,1.5 etc..',
          );
          e.target.reportValidity();
          return;
        }

        // invalid unit
        if (!foodUnits.includes(partUnit) && partUnit !== '') {
          e.target.setCustomValidity(
            'Unit should be mass of units eg kg, ml, oz',
          );
          e.target.reportValidity();
          return;
        }
      });
    });
  }
  toggleWindow() {
    [this._window, this._overlay].forEach(el => el.classList.toggle('hidden'));
  }

  _addHanlderShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHanlderHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
