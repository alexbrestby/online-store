import './style.css';
interface IbasketRender {
  [ind: string]: number;
}

const basketRender: IbasketRender = {};
const totalItemInBasket = <HTMLElement>document.querySelector('.total-item');
// totalItemInBasket.textContent ='111';

export const productsRender = () => {
  const render = document.querySelector('.render-area');
  

  // подтягиваем список товаров
  const base: {
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
  }[] = [];

  fetch('https://dummyjson.com/products?limit=48')
    .then((res) => res.json())
    .then((data) => {
      for (const product of data.products) {
        base.push(product);

        const item = document.createElement('div');
        item.classList.add('product-item');

        item.dataset.id = product.id;

        const itemButtonsWrapper = document.createElement('div');
        itemButtonsWrapper.classList.add('item-buttons-wrapper');

        const itemWrapperButtonBuy = document.createElement('button');
        itemWrapperButtonBuy.classList.add('item-wrapper-button-buy');
        itemWrapperButtonBuy.classList.add('button');
        itemWrapperButtonBuy.dataset.buy = product.id;
        itemWrapperButtonBuy.textContent = 'добавить';

        itemWrapperButtonBuy.addEventListener('click', () => {
          let idIndex = itemWrapperButtonBuy.dataset.buy;
          if (basketRender[idIndex!] !== 1) {
            basketRender[idIndex!] = 1;
            itemWrapperButtonBuy.textContent = 'удалить';
          } else {
            basketRender[idIndex!]--;
            itemWrapperButtonBuy.textContent = 'добавить';
          }
          totalItemInBasket.textContent = ''+getNonNullKeys(basketRender);
          localStorage.setItem('basket', JSON.stringify(basketRender));
        });

        const itemWrapperButtonInfo = document.createElement('button');
        itemWrapperButtonInfo.classList.add('item-wrapper-button-info');
        itemWrapperButtonInfo.classList.add('button');
        itemWrapperButtonInfo.dataset.info = product.id;
        itemWrapperButtonInfo.textContent = 'подробно';

        itemButtonsWrapper.append(itemWrapperButtonBuy, itemWrapperButtonInfo);

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.style.background = `url(${product.thumbnail}) 0% 0% / cover`;

        const title = document.createElement('h2');
        title.innerHTML = `${product.title}`;

        itemWrapper.append(itemButtonsWrapper);
        item.append(title);
        item.append(itemWrapper);
        render?.append(item);
      }
    })
    .catch((e) => console.log(e));

  return base;
};

function getNonNullKeys(obj: IbasketRender) {
  let quantity = 0;
  for (let item of Object.values(obj)) {
    if (item > 0) {
      quantity++;
    }
  }
  return quantity;
}
