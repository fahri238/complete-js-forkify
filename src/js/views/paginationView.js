import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // Page 1: there are other page
    if (currentPage === 1 && numPages > 1) {
      return this.__generateMarkupPagination(currentPage, 'next');
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      // Page 1: there are NO other page
      return this._generateMarkupPagination(currentPage, 'previous');
    }

    // Other page
    if (currentPage < numPages) {
      return this._generateMarkupPagination(currentPage, 'previousNext');
    }

    // Page 1: there are NO other page
    return ``;
  }

  _generateMarkupPagination(currPage, previosOrNext) {
    if (previosOrNext === 'next') {
      return `
      <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    if (previosOrNext === 'previous') {
      return `
      <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>`;
    }

    if (previosOrNext === 'previousNext') {
      return `
      <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
  }
}

export default new PaginationView();
