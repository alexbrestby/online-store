import './global.css';
import { mainRender } from './components/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';

const init = (): void => {
  {
    mainRender();
    stateCheck();
  }
};

document.addEventListener('DOMContentLoaded', init);
