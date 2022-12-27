import './style.css';
import { categoryFilter } from './category-filter/categoryFilter';
import { brandFilter } from './brand-filter/brandFilter';
import { priceSlider } from './price-slider/priceSlider';
import { stockSlider } from './stock-slider/stockSlider';
import { refreshBasketRender } from './products-render/productsRender';

const mainRender = () => {
  categoryFilter();
  brandFilter();
  priceSlider();
  stockSlider();
  refreshBasketRender();
};

export { mainRender };
