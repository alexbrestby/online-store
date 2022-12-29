import './global.css';
import { headerRender } from './layout/header/header';
import { mainRender } from './pages/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';
import { cartRender } from './pages/cart-render/cartRender';
import { productRender } from './pages/product-render/productRender';
import { footerRender } from './layout/footer/footer';
import { globalFilter } from './components/global-filter/globalFilter';

const init = (): void => {
  {
    console.log(location.href);
    headerRender();
    if (location.pathname === '/') {
      console.log('main Render');
      mainRender();
      stateCheck();
      globalFilter();
    } else if (location.pathname === '/cart') {
      cartRender();
      console.log('cart Render');
    } else if (location.pathname.match(/\/product_\d+/)) {
      stateCheck();
      productRender();
      console.log('product Render');
    } else {
      console.log('404');
    }
    footerRender();
  }
};

document.addEventListener('DOMContentLoaded', init);
