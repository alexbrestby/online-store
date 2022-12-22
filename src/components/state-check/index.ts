import { globalFilter } from "../global-filter/index";

const stateCheck = () => {
  const categoryFilters = <HTMLElement>document.querySelector('.category-filter');
  const brandFilters = <HTMLElement>document.querySelector('.brand-filter');
  const priceFilters = <HTMLElement>document.querySelector('.price-filter');
  const stockFilters = <HTMLElement>document.querySelector('.stock-filter');
  const searchInput = <HTMLInputElement>document.getElementById('search');

  //handle listener function
  const handleListener = (e: Event) => {
    console.clear();
    // получаем значения из отмеченных чекбосов
    const searchString = searchInput.value || '';
    const brandsArray: string[] = [];
    const categoriesArray: string[] = [];
    const checkedBoxes = document.querySelectorAll('.checkbox:checked');
    let filterFlag: string | undefined = '';

    Array.from(checkedBoxes).forEach((elem) => {
      filterFlag = elem.parentElement?.classList.value.split('-')[0];
      filterFlag === 'brand'
        ? brandsArray.push((elem as HTMLInputElement).value)
        : categoriesArray.push((elem as HTMLInputElement).value);
    });

    // получаем значения из регуляторов диапазонов
    const minPrice = document.getElementById('range1');
    const maxPrice = document.getElementById('range2');
    const minStock = document.getElementById('range3');
    const maxStock = document.getElementById('range4');

    // фомируем query string
    function formQueryString(currentState: any): string {
      let queryString = '';
      Object.keys(currentState).forEach((elem) => (queryString += `${elem}=${currentState[elem]}*`));
      queryString = queryString.replace(/\*/gi, '&').slice(0, -1);
      return queryString;
    }

    // флаг для определения фильтра (brand or category)
    const flag = (e.target as HTMLElement).parentElement?.classList.value.split('-')[0];

    let globalState = history.state;
    // формируем объект history.state
    if (!globalState) {
      globalState = globalState = {};
    }
    if (searchString) {
      globalState.search = searchString;
    } else {
      delete globalState.search;
    }
    if (globalState.category !== categoriesArray && flag === 'category') {
      !categoriesArray.length ? delete globalState.category : (globalState.category = categoriesArray);
    }
    if (globalState.brand !== brandsArray && flag === 'brand') {
      !brandsArray.length ? delete globalState.brand : (globalState.brand = brandsArray);
    }
    if ((e.target as HTMLInputElement).id === 'slider-1' || (e.target as HTMLInputElement).id === 'slider-2') {
      globalState.price = [minPrice?.innerHTML, maxPrice?.innerHTML];
    }
    if ((e.target as HTMLInputElement).id === 'slider-3' || (e.target as HTMLInputElement).id === 'slider-4') {
      globalState.stock = [minStock?.innerHTML, maxStock?.innerHTML];
    }
    history.pushState(globalState, '', `?${formQueryString(globalState)}`);
    globalFilter();
  }

  [categoryFilters, brandFilters, searchInput].forEach(elem => elem.addEventListener('input', handleListener));
  [priceFilters, stockFilters].forEach(elem => elem.addEventListener('change', handleListener));

  // сброс state к значению null
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    history.pushState(null, '', '');
    console.log('страница перезагружена');
  }
  console.log(
    'параметры из URL для фильтрации элементов после обновления страницы:',
    location.search.slice(1).split('&')
  );

  // TODO: npm run lint
};

export { stateCheck };
