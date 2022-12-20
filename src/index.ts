import './global.css';
import { categoryFilter } from './components/category-filter/index';
import { brandFilter } from './components/brand-filter/index';
import { priceSlider } from './components/price-slider/index';
import { stockSlider } from './components/stock-slider/index';
import {productsRender} from './components/products-render/index';
import { globalSearch } from './components/global-search/index';


const APP = {
  init() {
    categoryFilter();
    brandFilter();
    priceSlider();
    stockSlider();
    productsRender();
    globalSearch();
  },
};

document.addEventListener('DOMContentLoaded', APP.init);



