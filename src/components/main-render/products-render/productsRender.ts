import './product-render.css';
import { Iproduct, IbasketRender } from '../../types/types';

export let basketRender: IbasketRender;

//функция возвращает количество ненулевых ключей(кол-во товара ключа больше 0)
export function getNonNullKeys(obj: IbasketRender) {
  let quantity = 0;
  for (const item of Object.values(obj)) {
    if (item > 0) {
      quantity++;
    }
  }
  return quantity;
}

//функция удаляет id со значением 0 и возвращает сумму количества всех товаров
export function getTotalNumberGoods(obj: IbasketRender) {
  for (let key of Object.keys(obj)) {
    if (obj[key] === 0) {
      delete obj[key];
    }
  }
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

//функция обновляет на иконке корзины общее кол-во товаров в корзине
export const refreshTotalItemInBasket = () => {
  const totalItemInBasket = <HTMLElement>document.querySelector('.total-item');
  totalItemInBasket.textContent = '' + getTotalNumberGoods(basketRender);
};

//функция подтягивает в переменную -basketRender- данные из localStorage
export const refreshBasketRender = () => {
  basketRender = localStorage.getItem('basket') !== null ? JSON.parse(localStorage.getItem('basket')!) : {};
  return basketRender;
};

//функция записывает в localStorage объект по ключу localName
export function setLocalStorage(localName:string, obj: IbasketRender) {
  localStorage.setItem(localName, JSON.stringify(obj));
} 
// function getLocalStorage(localName:string, obj: IbasketRender) {
//   localStorage.setItem(localName, JSON.stringify(obj));
// } 

// функция создает карточки товара с кнопками
export const productsRender = (product: Iproduct) => {
  refreshTotalItemInBasket();

  const render = <HTMLElement>document.querySelector('.render-area');

  const item = <HTMLElement>document.createElement('div');
  item.classList.add('product-item');

  item.dataset.id = `${product.id}`;
  const itemButtonsWrapper = document.createElement('div');
  itemButtonsWrapper.classList.add('item-buttons-wrapper');

  const itemWrapperButtonBuy = document.createElement('button');
  itemWrapperButtonBuy.classList.add('item-wrapper-button-buy');
  itemWrapperButtonBuy.classList.add('button');
  itemWrapperButtonBuy.dataset.buy = `${product.id}`;
  itemWrapperButtonBuy.textContent = basketRender[`${product.id}`] ? 'remove' : 'add to cart';

  itemWrapperButtonBuy.addEventListener('click', () => {
    const idIndex = itemWrapperButtonBuy.dataset.buy as string;
    if (basketRender[idIndex] < 1 || basketRender[idIndex] === undefined) {
      basketRender[idIndex] = 1;
      itemWrapperButtonBuy.textContent = 'remove';
    } else {
      basketRender[idIndex] = 0;
      itemWrapperButtonBuy.textContent = 'add to cart';
    }
    refreshTotalItemInBasket();
    setLocalStorage('basket', basketRender)
    
    // localStorage.setItem('basket', JSON.stringify(basketRender));
    console.log('BTN addtocart/remove', basketRender);
  });

  const itemWrapperButtonInfo = document.createElement('button');
  itemWrapperButtonInfo.classList.add('item-wrapper-button-info');
  itemWrapperButtonInfo.classList.add('button');
  itemWrapperButtonInfo.dataset.info = `${product.id}`;
  itemWrapperButtonInfo.textContent = 'info';

  itemButtonsWrapper.append(itemWrapperButtonBuy, itemWrapperButtonInfo);

  const itemWrapper = document.createElement('div');
  itemWrapper.classList.add('item-wrapper');
  itemWrapper.style.background = `url(${product.thumbnail}) 0% 0% / cover`;

  const title = document.createElement('h3');
  title.innerHTML = `${product.title}`;

  const itemInfoBlock = document.createElement('div');
  itemInfoBlock.classList.add('item-info-block');
  getItemInfoBlock(product, itemInfoBlock);

  itemWrapper.append(itemButtonsWrapper);
  itemWrapper.append(itemInfoBlock);
  item.append(title);
  item.append(itemWrapper);
  render.append(item);
};

const getItemInfoBlock = (product: Iproduct, div: HTMLDivElement) => {
  [
    ['category', 'Category'],
    ['brand', 'Brand'],
    ['price', 'price'],
    ['discountPercentage', 'Discount'],
    ['rating', 'Rating'],
    ['stock', 'Stock'],
  ].forEach((elem) => {
    const pItemInfo = document.createElement('p');
    pItemInfo.classList.add('p-item-info');
    pItemInfo.textContent = `${product[elem[0] as keyof Iproduct]}`;
    const spanItemInfo = document.createElement('span');
    spanItemInfo.classList.add('span-item-info');
    spanItemInfo.textContent = elem[1] + ': ';
    pItemInfo.prepend(spanItemInfo);
    div.append(pItemInfo);
  });
};
