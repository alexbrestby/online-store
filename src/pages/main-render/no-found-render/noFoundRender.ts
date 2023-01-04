import './style.css';

const noFoundRender = (path: string) => {
  const noFoundHeader = document.createElement('h1');
  noFoundHeader.classList.add('render-no-found');
  let renderArea: HTMLElement;

  if (path === '/') {
    renderArea = (document.querySelector('.render-area') as HTMLElement);
    noFoundHeader.innerHTML = 'No products found!';
    renderArea.style.placeContent = 'center';
    renderArea.innerHTML = '';
    renderArea.appendChild(noFoundHeader);
  }
}

export { noFoundRender };
