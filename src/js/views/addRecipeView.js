import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _windowMoreIngredients = document.querySelector('.window-add-ingredients');
  _overlay = document.querySelector('.overlay');
  _overlayMoreIngredients = document.querySelector('.overlay-add-ingredients');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnCloseIngredients = document.querySelector('.btn--close-ingrdients');
  _uploadColEl = document.querySelector('.upload__column');
  _addIngredientsBtn = document.querySelector('.upload__more-ingredients');
  _ingredientInputs = document.querySelectorAll('.input-ingredient');
  _additionalIngredientsValue;

  constructor() {
    super();
    this._addHanlderShowWindow();
    this._addHanlderHideWindow();
    this._addHanlderHideWindowMoreIngredients();
    this._ingredientsValidation();
    this._addFieldIngredient();
    this._addhandleConfirmIngredients();
    this._additionalIngredientsValue = [];
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

  toggleWindowMoreIngredients() {
    [this._windowMoreIngredients, this._overlayMoreIngredients].forEach(el =>
      el.classList.toggle('hidden'),
    );
  }

  _addHanlderShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._addIngredientsBtn.addEventListener(
      'click',
      this.toggleWindowMoreIngredients.bind(this),
    );
  }

  _addHanlderHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHanlderHideWindowMoreIngredients() {
    this._btnCloseIngredients.addEventListener(
      'click',
      this.toggleWindowMoreIngredients.bind(this),
    );
    this._overlayMoreIngredients.addEventListener(
      'click',
      this.toggleWindowMoreIngredients.bind(this),
    );
  }
  _addFieldIngredient() {
    const addFieldBtn = document.querySelector('.add-more-ingredient');
    const parentField = document.querySelector('.ingredient-group');
    addFieldBtn.addEventListener('click', e => {
      const currentCount = parentField.querySelectorAll('input').length;

      const nextNumber = 6 + currentCount;

      const newField = `
      <label>Ingredient ${nextNumber}</label>
      <input
        type="text"
        required
        name="ingredient-${nextNumber}"
        placeholder="Format: 'Quantity,Unit,Description'"
        class="input-ingredient input-ingredient--${nextNumber}""
      />
      `;

      parentField.insertAdjacentHTML('beforeend', newField);
    });
  }

  _addhandleConfirmIngredients() {
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.addEventListener('click', e => {
      const ingredientValues = document.querySelectorAll('.input-ingredient');
      this._additionalIngredientsValue = [...ingredientValues]
        .filter((el, i) => i > 4)
        .map(input => [input.name, input.value]);
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      console.log(this._additionalIngredientsValue);
      const dataArr = [
        ...new FormData(this._parentElement),
        ...this._additionalIngredientsValue,
      ];
      const data = Object.fromEntries(dataArr);
      console.log(dataArr);
      console.log(data);
      handler(data);
    });
  }
}

export default new AddRecipeView();
