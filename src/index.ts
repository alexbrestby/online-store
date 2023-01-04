import './global.css';
import { mainRender } from './components/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';
import { getBasketBlock } from './components/main-render/basket/basket';
import { modalCard } from './components/main-render/modal-card/modal-card';

const init = (): void => {
  {
    mainRender();
    stateCheck();
    getBasketBlock();
    modalCard();
  }
};

document.addEventListener('DOMContentLoaded', init);
