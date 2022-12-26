import { priceSlider } from "../price-slider/priceSlider";
import { stockSlider } from "../stock-slider/stockSlider";

const markLoadedValues = () => {
  const globalState = history.state;
  if (globalState.category) {
    for (let i = 0; i < globalState.category.length; i++) {
      const categoriesArray = <HTMLInputElement>document.getElementById(`${globalState.category[i]}`);
      categoriesArray.checked = true;
    }
  }
  if (globalState.brand) {
    for (let i = 0; i < globalState.brand.length; i++) {
      const brandsArray = <HTMLInputElement>document.getElementById(`${globalState.brand[i]}`);
      brandsArray.checked = true;
    }
  }
  if (globalState.sort) {
    const sortOption = <HTMLInputElement>document.getElementById('sort-selector');
    sortOption.value = globalState.sort.join();
  }
  if (globalState.price) {
    const minPrice = <HTMLInputElement>document.getElementById('slider-1');
    const maxPrice = <HTMLInputElement>document.getElementById('slider-2');
    minPrice.value = globalState.price[0];
    maxPrice.value = globalState.price[1];
    priceSlider();
  }
  if (globalState.stock) {
    const minStock = <HTMLInputElement>document.getElementById('slider-3');
    const maxStock = <HTMLInputElement>document.getElementById('slider-4');
    minStock.value = globalState.stock[0];
    maxStock.value = globalState.stock[1];
    stockSlider();
  }
}


export { markLoadedValues };
