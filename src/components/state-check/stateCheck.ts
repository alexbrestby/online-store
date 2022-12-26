import { globalFilter } from "../global-filter/globalFilter";
import { markLoadedValues } from "../mark-values/markLoadedValues";

const stateCheck = () => {
  const categoryFilters = <HTMLElement>document.querySelector('.category-filter');
  const brandFilters = <HTMLElement>document.querySelector('.brand-filter');
  const priceFilters = <HTMLElement>document.querySelector('.price-filter');
  const stockFilters = <HTMLElement>document.querySelector('.stock-filter');
  const searchInput = <HTMLInputElement>document.getElementById('search');
  const sortSelector = <HTMLElement>document.querySelector('.sort-selector');
  const resetButton = <HTMLElement>document.querySelector('.reset');
  const copyLinkButton = <HTMLElement>document.querySelector('.copy-link');

  //handle listener function
  const handleListener = (e: Event) => {
    console.clear();

    // получаем значения из отмеченных чекбосов
    const searchString = searchInput.value || '';
    let sortString = '';
    (sortSelector as HTMLSelectElement).selectedOptions[0].value === 'sort-title'
      ? sortString = ''
      : sortString = (sortSelector as HTMLSelectElement).selectedOptions[0].value;
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
    if (sortString && (e.target as HTMLSelectElement).id === 'sort-selector') {
      globalState.sort = [sortString];
    }
    history.pushState(globalState, '', `?${formQueryString(globalState)}`);
    globalFilter();
  }

  [categoryFilters, brandFilters, searchInput].forEach(elem => elem.addEventListener('input', handleListener));
  [priceFilters, stockFilters].forEach(elem => elem.addEventListener('change', handleListener));
  [sortSelector].forEach(elem => elem.addEventListener('change', handleListener));
  resetButton.addEventListener('click', function () {
    history.pushState({}, '', '/');
    location.search = '';
    globalFilter();
  });
  copyLinkButton.addEventListener('click', function () {
    navigator.clipboard.writeText(location.href);
    copyLinkButton.innerHTML = `Copied`;
    setTimeout(() => {
      copyLinkButton.innerHTML = `Copy link`;
    }, 1000);
  })

  // начальная проверка параметров при перезагрузке
  if (location.search.slice(1)) {
    const stateObjectInArray = location.search.slice(1).split('&');
    const globalFilterInit: any = {};
    for (const key of stateObjectInArray) {
      globalFilterInit[key.split('=')[0]] = key.split('=')[1].split(',');
    }
    console.log(globalFilterInit);
    history.pushState(globalFilterInit, '');
    // расставляем галочки
    markLoadedValues();
  }
  // пропускаем через фильтр
  globalFilter();


  // TODO: npm run lint
};

export { stateCheck };
