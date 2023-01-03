import './global.css';
import { mainRender } from './components/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';
import { getBasketBlock } from './components/main-render/basket/basket';

const init = (): void => {
  {
    mainRender();
    stateCheck();
    getBasketBlock();
  }
};

document.addEventListener('DOMContentLoaded', init);
