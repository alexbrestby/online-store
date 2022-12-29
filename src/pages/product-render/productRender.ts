import './product-render.css';
import { HistoryState, Iproduct } from '../../types/types';

const productRender = () => {
  (document.querySelector('.header-search') as HTMLElement).style.display = 'none';

  const globalState = history.state as HistoryState;
  const productId = globalState.product as string;

  const productDetailPage = document.createElement('div');
  productDetailPage.classList.add('product-detail-page');

  const breadcrumbWrapper = document.createElement('div');
  breadcrumbWrapper.classList.add('link-navigation');

  const productWrapper = document.createElement('div');
  productWrapper.classList.add('product-wrapper');

  const renderArea = <HTMLElement>document.querySelector('.main');
  renderArea.innerHTML = '';

  renderArea.append(productWrapper);
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((result) => result.json())
    .then((data: Iproduct) => {
      const mainCrumb = document.createElement('div');
      mainCrumb.innerHTML = `STORE`;
      breadcrumbWrapper.append(mainCrumb);

      const categoryCrumb = <HTMLElement>document.createElement('div');
      categoryCrumb.innerHTML = data.category;
      breadcrumbWrapper.append(categoryCrumb);

      const brandCrumb = document.createElement('div');
      brandCrumb.innerHTML = data.brand;
      breadcrumbWrapper.append(brandCrumb);

      const titleCrumb = document.createElement('div');
      titleCrumb.innerHTML = data.title;
      breadcrumbWrapper.append(titleCrumb);
    })
    .catch((e) => console.log(e));

  productDetailPage.append(breadcrumbWrapper);
  productDetailPage.append(productWrapper);
  renderArea.append(productDetailPage);
};

export { productRender };
