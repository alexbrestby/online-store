import './global.css';
import { categoryFilter } from './components/category-filter/categoryFilter';
import { brandFilter } from './components/brand-filter/brandFilter';
import { priceSlider } from './components/price-slider/priceSlider';
import { stockSlider } from './components/stock-slider/stockSlider';
import { productsRender } from './components/products-render/productRender';
import { stateCheck } from './components/state-check/stateCheck';
import { selectFilter } from './components/select-filter/selectFilter';
import { refreshBasketRender } from "./components/products-render/main-render/mainRender";

const init = (): void => {
  {
    selectFilter();
    categoryFilter();
    brandFilter();
    priceSlider();
    stockSlider();
    refreshBasketRender();
    productsRender();
    stateCheck();
  }
};

document.addEventListener('DOMContentLoaded', init);
