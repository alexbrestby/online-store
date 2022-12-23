import { mainRender } from '../products-render/main-render/mainRender';
import { noFoundRender } from '../products-render/no-found-render/noFoundRender';

const globalFilter = (): void => {
  const renderArea = <HTMLElement>document.querySelector('.render-area');
  const counterItems = <Element>document.querySelector('.header-found span');
  const searchInput = <HTMLInputElement>document.getElementById('search');

  const filterParams = { ...history.state };
  console.log(filterParams);

  function checkboxHandler(arr: [], filterName: string) {
    let params: [] = [];
    const result: [] = [];
    filterName === 'brand'
      ? params = filterParams.brand
      : params = filterParams.category;

    arr.forEach(element => {
      for (let i = 0; i < params.length; i++) {
        if (Object.values(element).indexOf(params[i]) > -1) {
          result.push(element);
        }
      }
    });
    return result;
  }

  function rangeHandler(arr: [], rangeName: string) {
    let params = [];
    const result: [] = [];
    rangeName === 'price'
      ? params = filterParams.price
      : params = filterParams.stock;

    for (let element of arr) {
      if (element[rangeName] >= params[0] && element[rangeName] <= params[1]) {
        result.push(element);
      }
    }
    return result;
  }

  function searchHandler(arr: any[]) {
    let params = '';
    filterParams.search.length >= 3 ? params = filterParams.search : params = '';
    const result = [];
    if (params) {
      for (let i = 0; i < arr.length; i++) {
        for (let elem in arr[i]) {
          if (typeof arr[i][elem] === 'string' && elem !== 'thumbnail') {
            // if (arr[i][elem].toLowerCase().startsWith(params)) {               //для поиска по началу вхождения
            if (arr[i][elem].toLowerCase().includes(params.toLowerCase())) {      //для поиска по всему выражению
              result.push(arr[i]);
            }
          }
        }
      }
    }
    return [...new Set(result)];
  }

  function addZero(value: number | string): string {
    if (value < 10) value = '0' + value;
    return value.toString();
  }

  fetch('https://dummyjson.com/products?limit=36')
    .then((res) => res.json())
    .then((data) => {
      let resultArray = data.products;

      if (Object.keys(filterParams).includes('search')) {
        resultArray = searchHandler(resultArray);
        if (resultArray.length < 1 && searchInput.value.length >= 3) noFoundRender();
      }
      if (Object.keys(filterParams).includes('brand')) {
        resultArray = checkboxHandler(resultArray, 'brand');
      }
      if (Object.keys(filterParams).includes('category')) {
        resultArray = checkboxHandler(resultArray, 'category');
      }
      if (Object.keys(filterParams).includes('price')) {
        resultArray = rangeHandler(resultArray, 'price');
      }
      if (Object.keys(filterParams).includes('stock')) {
        resultArray = rangeHandler(resultArray, 'stock');
      }
      if (typeof resultArray !== 'undefined' && resultArray.length > 0) {
        renderArea.style.removeProperty('place-content');
        renderArea.innerHTML = '';
        for (let i = 0; i < resultArray.length; i++) {
          mainRender(resultArray[i]);
        }
      }
      console.log(resultArray);
      counterItems.innerHTML = addZero(resultArray.length);
    })
    .catch((e) => console.log(e));
};

export { globalFilter };
