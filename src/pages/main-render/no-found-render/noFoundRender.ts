import './style.css';

const noFoundRender = () => {
  const renderArea = <HTMLElement>document.querySelector('.render-area');
  const noFoundHeader = document.createElement('h1');
  noFoundHeader.innerHTML = 'No products found!';
  noFoundHeader.classList.add('render-no-found');

  renderArea.style.placeContent = 'center';

  renderArea.innerHTML = '';
  renderArea.appendChild(noFoundHeader);
};

export { noFoundRender };
