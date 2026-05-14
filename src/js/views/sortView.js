import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class SortView extends View {
  _parentElement = document.querySelector('.sort-result');

  render() {
    const markup = this._generateMarkup();
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerSort(handler) {
    this._parentElement.addEventListener('change', function (e) {
      const selectEl = e.target.closest('.sort-result__select')
      if (!selectEl) return;

      const sortBy = selectEl.value
      handler(sortBy);
    });
  }

  _generateMarkup() {
    return `
        <label for="sort-by" class="sort-result__label">Sorts recipe by</label>
        <select name="sort-by" id="id-sort" class="sort-result__select">
          <option value="default" class="sort--default">Default</option>
          <option value="duration" class="sort--duration">Duration</option>
          <option value="number-ings" class="sort--number-ing">Number of Ingredients</option>
        </select>
  `;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new SortView();
