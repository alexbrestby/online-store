import './main-render.css';

function getNonNullKeys(obj: IbasketRender) {
  let quantity = 0;
  for (let item of Object.values(obj)) {
    if (item > 0) {
      quantity++;
    }
  }
  return quantity;
}
interface IbasketRender {
  [ind: string]: number;
}

let basketRender: IbasketRender;
const totalItemInBasket = <HTMLElement>document.querySelector('.total-item');
interface Iproduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: null;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const refreshTotalItemInBasket = () => (totalItemInBasket.textContent = '' + getNonNullKeys(basketRender));

export const refreshBasketRender = () => {
  basketRender = localStorage.getItem('basket') !== null ? JSON.parse(localStorage.getItem('basket')!) : {};
  // console.log('refreshBasketRender()=>basketRender', basketRender);
};

export const mainRender = (product: Iproduct) => {
  refreshTotalItemInBasket();

  const render = document.querySelector('.render-area');

  const item = document.createElement('div');
  item.classList.add('product-item');

  item.dataset.id = '' + product.id;
  const itemButtonsWrapper = document.createElement('div');
  itemButtonsWrapper.classList.add('item-buttons-wrapper');

  const itemWrapperButtonBuy = document.createElement('button');
  itemWrapperButtonBuy.classList.add('item-wrapper-button-buy');
  itemWrapperButtonBuy.classList.add('button');
  itemWrapperButtonBuy.dataset.buy = '' + product.id;
  itemWrapperButtonBuy.textContent = basketRender['' + product.id] ? 'remove' : 'add to cart';

  itemWrapperButtonBuy.addEventListener('click', () => {
    let idIndex = itemWrapperButtonBuy.dataset.buy;

    if (basketRender[idIndex!] < 1 || basketRender[idIndex!] === undefined) {
      basketRender[idIndex!] = 1;
      itemWrapperButtonBuy.textContent = 'remove';
    } else {
      basketRender[idIndex!] = 0;
      itemWrapperButtonBuy.textContent = 'add to cart';
    }
    refreshTotalItemInBasket();
    localStorage.setItem('basket', JSON.stringify(basketRender));
  });

  const itemWrapperButtonInfo = document.createElement('button');
  itemWrapperButtonInfo.classList.add('item-wrapper-button-info');
  itemWrapperButtonInfo.classList.add('button');
  itemWrapperButtonInfo.dataset.info = '' + product.id;
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
  render?.append(item);
};

const getItemInfoBlock = (product: Iproduct, div: HTMLDivElement) => {
  [['category', 'Category'], ['brand', 'Brand'], ['price', 'price'], ['discountPercentage', 'Discount'], ['rating', 'Rating'], ['stock', 'Stock']].forEach((elem) => {
    const pItemInfo = document.createElement('p');
    pItemInfo.classList.add('p-item-info');
    pItemInfo.textContent = '' + product[elem[0] as keyof Iproduct]
    const spanItemInfo = document.createElement('span');
    spanItemInfo.classList.add('span-item-info');
    spanItemInfo.textContent = elem[1] + ': ';
    pItemInfo.prepend(spanItemInfo);
    div.append(pItemInfo);
  });
};
