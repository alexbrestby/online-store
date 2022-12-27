
import './basket.css';
import { basketRender, getNonNullKeys } from '../products-render/productsRender';

const itemsPerPage = <HTMLInputElement>document.querySelector('.items-per-page');
export const basketBlock = () => {
  const buttonBasket = document.querySelector('.header-cart__img');
  const mainBlock = document.querySelector('.content-wrapper');
  const basketDiv = document.querySelector('.basket');
  buttonBasket?.addEventListener('click', () => {
    console.log('basket button', basketRender, '===', getNonNullKeys(basketRender));
    console.log("document.querySelector('.items-per-page')=", itemsPerPage.value);
    mainBlock?.classList.add('display-none');
    basketDiv?.classList.remove('display-none');
  });
};

// const getBasketBlock = (product: Iproduct, div: HTMLDivElement) => {
//   [['category', 'Category'], ['brand', 'Brand'], ['price', 'price'], ['discountPercentage', 'Discount'], ['rating', 'Rating'], ['stock', 'Stock']].forEach((elem) => {
//     const pItemInfo = document.createElement('p');
//     pItemInfo.classList.add('p-item-info');
//     pItemInfo.textContent = '' + product[elem[0] as keyof Iproduct]
//     const spanItemInfo = document.createElement('span');
//     spanItemInfo.classList.add('span-item-info');
//     spanItemInfo.textContent = elem[1] + ': ';
//     pItemInfo.prepend(spanItemInfo);
//     div.append(pItemInfo);
//   });
// };
