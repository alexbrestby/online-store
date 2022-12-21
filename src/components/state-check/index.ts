const stateCheck = () => {
  const filters = <HTMLElement>document.querySelector('.filters-area');

  // функция для поиска родителей она тут не используется, но пусть полежит...
  // const getParents = function (elem: any) {
  //   const parents = [];
  //   for (; elem && elem !== document; elem = elem.parentNode) {
  //     parents.push(elem);
  //   }
  //   return parents;
  // };

  filters.addEventListener('input', function (e) {
    console.clear();

    // получаем значения из отмеченных чекбосов
    const brandsArray: string[] = [];
    const categoriesArray: string[] = [];
    let filterFlag: string | undefined = '';
    const checkedBoxes = document.querySelectorAll('.checkbox:checked');

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

    // формируем объект history.state
    let globalState = history.state;
    if (!globalState) {
      globalState = {};
    }
    const flag = (e.target as HTMLElement).parentElement?.classList.value.split('-')[0];
    if (globalState.category !== categoriesArray && flag === 'category') {
      !categoriesArray.length ? delete globalState.category : (globalState.category = categoriesArray);
    }
    if (globalState.brand !== brandsArray && flag === 'brand') {
      !brandsArray.length ? delete globalState.brand : (globalState.brand = brandsArray);
    }
    if ((e.target as HTMLInputElement).id === 'slider-1' || (e.target as HTMLInputElement).id === 'slider-2') {
      globalState.min_price = minPrice?.innerHTML;
      globalState.max_price = maxPrice?.innerHTML;
    }
    if ((e.target as HTMLInputElement).id === 'slider-3' || (e.target as HTMLInputElement).id === 'slider-4') {
      globalState.min_stock = minStock?.innerHTML;
      globalState.max_stock = maxStock?.innerHTML;
    }
    history.pushState(globalState, '', `?${formQueryString(globalState)}`);
    console.log('текущее состояние (state):', history.state);
  });

  // сброс state к значению null
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    history.pushState(null, '', '');
    console.log('страница перезагружена');
  }
  console.log(
    'параметры из URL для фильтрации элементов после обновления страницы:',
    location.search.slice(1).split('&')
  );

  // TODO: debouncer для регуляторов диапазонов
  // TODO: npm run lint
};

export { stateCheck };
