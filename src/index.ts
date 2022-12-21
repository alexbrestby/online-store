import './global.css';
import { categoryFilter } from './components/category-filter/index';
import { brandFilter } from './components/brand-filter/index';
import { priceSlider } from './components/price-slider/index';
import { stockSlider } from './components/stock-slider/index';
import productsRender from './components/products-render/index';
import { stateCheck } from './components/state-check/index';
import { selectFilter } from './components/select-filter/index';

const init = (): void => {
  {
    selectFilter();
    categoryFilter();
    brandFilter();
    priceSlider();
    stockSlider();
    productsRender();
    stateCheck();
  }
};

document.addEventListener('DOMContentLoaded', init);
