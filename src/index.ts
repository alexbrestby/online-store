import './global.css';
import { mainRender } from './components/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';
import { basketBlock } from './components/main-render/basket/basket';

const init = (): void => {
  {
    mainRender();
    stateCheck();
    basketBlock();
  }
};

document.addEventListener('DOMContentLoaded', init);
