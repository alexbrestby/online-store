import { mainRender } from '../products-render/main-render/main-render';

const globalFilter = (): void => {
  const renderArea = <HTMLElement>document.querySelector('.render-area');
  const filterParams = { ...history.state };
  console.log(filterParams);

  // подтягиваем список товаров

  const base: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: null;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }[] = [];

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

  fetch('https://dummyjson.com/products?limit=48')
    .then((res) => res.json())
    .then((data) => {
      renderArea.innerHTML = ``;
      let resultArray = data.products;

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
      for (let i = 0; i < resultArray.length; i++) {
        mainRender(resultArray[i]);
      }
      console.log(resultArray);
    })
    .catch((e) => console.log(e));

};

export { globalFilter };
