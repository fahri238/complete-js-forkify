import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class SortView {
  _parentElement = document.querySelector('.sort-result');

  render() {
    const markup = this._generateMarkup();
    console.log("test");
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
        <label for="cars" class="sort-result__label">Sorts recipe by</label>
        <select name="cars" id="cars" class="sort-result__select">
          <option value="volvo" class="sort--default">Default</option>
          <option value="saab" class="sort--duration">Duration</option>
          <option value="mercedes" class="sort--number-ing">Number of Ingredients</option>
        </select>
  `;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new SortView();
