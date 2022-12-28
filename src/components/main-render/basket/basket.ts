import './basket.css';
import { basketRender, getNonNullKeys } from '../products-render/productsRender';

// перерисовка содержимого страницы корзины в соответствии с допустимым кол-вом записей на странице по событию 'input' на ITEMS:
const itemsPerPage = <HTMLInputElement>document.querySelector('.items-per-page');
itemsPerPage.addEventListener('input', function () {
  console.log('событие input=', this.value);
  buildBasket();
});

const pageNumbersDel = <HTMLElement>document.querySelector('.page-numbers-del');
const pageNumbersAdd = <HTMLElement>document.querySelector('.page-numbers-add');
const pageNumber = <HTMLElement>document.querySelector('.page-numbers-span');
pageNumbersDel.addEventListener('click', ()=>{
  console.log('сработала кнопка pageNumbersDel');
  pageNumber.textContent = ''+ (+pageNumber.textContent! - 1);
  buildBasket();
});
pageNumbersAdd.addEventListener('click', ()=>{
  console.log('сработала кнопка pageNumbersAdd');
  pageNumber.textContent = ''+ (+pageNumber.textContent! + 1);
  buildBasket();
});



//при нажатии на рисунок корзины в хедере скрывается основной раздел и добавляется корзина(basketDiv.remove('display-none'))
//отрисовывается содержимое текущей страницы корзины
export const basketBlock = () => {
  const buttonBasket = <HTMLElement>document.querySelector('.header-cart__img');
  const mainBlock = <HTMLElement>document.querySelector('.content-wrapper');
  const basketDiv = <HTMLElement>document.querySelector('.basket');

  buttonBasket.addEventListener('click', () => {
    mainBlock.classList.add('display-none');
    basketDiv.classList.remove('display-none');

    buildBasket();
  });
};

//отрисовка корзины в зависимости от кол-ва товаров, кол-ва допустимых записей, номера страницы
const buildBasket = () => {
  document.querySelector('.prod-items')!.innerHTML = '';

  const quantityId: number = getNonNullKeys(basketRender);
  const quantityInInput: string = itemsPerPage.value;
  const numberOfPage: string | null | undefined = document.querySelector('.page-numbers-span')?.textContent;
  console.log('buildBasket()=', quantityId, +quantityInInput, +numberOfPage!);
  
  if (quantityId <= +quantityInInput && +numberOfPage! == 1) {
    for (let i = 0; i < Object.keys(basketRender).length; i++) {
      getBasketInfo(Object.keys(basketRender)[i]);
    }
  } else if (quantityId > +quantityInInput && +numberOfPage! == 1) {
    for (let i = 0; i < +quantityInInput; i++) {
      getBasketInfo(Object.keys(basketRender)[i]);
    }
  } else if (quantityId > +quantityInInput && +numberOfPage! == 2) {
    console.log('сработало условие (quantityId > +quantityInInput && +numberOfPage! == 2) ')
    for (let i = +quantityInInput; i < Object.keys(basketRender).length; i++) {
      getBasketInfo(Object.keys(basketRender)[i]);
    }
  }
};
// формирование HTML и получение инфо о товаре с API
const getBasketInfo = (id: string) => {
  fetch(`https://dummyjson.com/products/${+id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('id=', id, 'data=', data);

      const prodCartItem = document.createElement('div');
      prodCartItem.classList.add('prod-cart-item');

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const itemI = document.createElement('div');
      itemI.classList.add('item-i');

      const itemInfo = document.createElement('div');
      itemInfo.classList.add('item-info');

      const itemInfoImg = document.createElement('img');
      itemInfoImg.src = data.thumbnail;

      const productTitle = document.createElement('div');
      productTitle.classList.add('product-title');

      const productTitleH3 = document.createElement('h3');
      productTitleH3.textContent = data.title;

      const productDescription = document.createElement('div');
      productDescription.classList.add('product-description');
      productDescription.textContent = data.description;

      const productOther = document.createElement('div');
      productOther.classList.add('product-other');

      const divRating = document.createElement('div');
      divRating.textContent = 'Rating:' + data.rating;

      const divDiscount = document.createElement('div');
      divDiscount.textContent = 'Discount:' + data.discountPercentage;

      const itemDetailP = document.createElement('div');
      itemDetailP.classList.add('item-detail-p');

      const numberControl = document.createElement('div');
      numberControl.classList.add('number-control');

      const stockControl = document.createElement('div');
      stockControl.classList.add('stock-control');
      stockControl.textContent = data.stock;

      const quantityControl = document.createElement('div');
      quantityControl.classList.add('quantity-control');

      const plusButton = document.createElement('button');
      plusButton.textContent = '+';

      const minusButton = document.createElement('button');
      minusButton.textContent = '-';

      const amountControl = document.createElement('div');
      amountControl.classList.add('amount-control');
      amountControl.textContent = data.price;

      productTitle.prepend(productTitleH3);
      productOther.prepend(divRating, divDiscount);
      itemDetailP.prepend(productTitle, productDescription, productOther);
      itemInfo.prepend(itemInfoImg, itemDetailP);
      console.log('======', basketRender[id]);
      quantityControl.prepend(plusButton, `${basketRender[id]}`, minusButton);
      numberControl.prepend(stockControl, quantityControl, amountControl);
      cartItem.prepend(itemI, itemInfo, numberControl);
      prodCartItem.prepend(cartItem);
      document.querySelector('.prod-items')?.append(prodCartItem);
    });
};
