import './basket.css';
import {
  basketRender,
  getNonNullKeys,
  refreshTotalItemInBasket,
  setLocalStorage,
} from '../products-render/productsRender';
// import { IbasketRender } from '../../types/types';

// перерисовка содержимого страницы корзины в соответствии с допустимым кол-вом записей на странице по событию 'input' на ITEMS:
const itemsPerPage = <HTMLInputElement>document.querySelector('.items-per-page');
itemsPerPage.addEventListener('input', function () {
  console.log('событие input=', this.value);
  buildBasket();
});

//отрисовка корзины в зависимости от кол-ва товаров, кол-ва допустимых записей, номера страницы
const buildBasket = () => {
  document.querySelector('.prod-items')!.innerHTML = '';
  console.log('in buildBasket', basketRender);
  const quantityId: number = getNonNullKeys(basketRender);
  const quantityInInput: string = itemsPerPage.value;
  const numberOfPage = document.querySelector('.page-numbers-span')!.textContent;
  console.log('buildBasket()=', quantityId, +quantityInInput, +numberOfPage!);

  splitIdByPage(numberOfPage);

  //функция меняет вид корзины в зависимости от номера страницы
  function splitIdByPage(numberOfPage: string | null | undefined) {
    if (quantityId > +quantityInInput * (+numberOfPage! - 1)) {
      if (quantityId > +quantityInInput * +numberOfPage!) {
        console.log('сработал 1-2 элс');
        for (let i = +quantityInInput * (+numberOfPage! - 1); i < +quantityInInput * +numberOfPage!; i++) {
          getBasketInfo(Object.keys(basketRender)[i]);
        }
      } else {
        console.log('сработал 2-2 элс');
        for (let i = +quantityInInput * (+numberOfPage! - 1); i < Object.keys(basketRender).length; i++) {
          getBasketInfo(Object.keys(basketRender)[i]);
        }
      }
    }
  }
};

//блок отрисоки корзины в зависимости от номера страницы
const pageNumbersDel = <HTMLElement>document.querySelector('.page-numbers-del');
const pageNumbersAdd = <HTMLElement>document.querySelector('.page-numbers-add');
const pageNumber = <HTMLElement>document.querySelector('.page-numbers-span');

addDelDiv(pageNumbersDel, 1, pageNumbersAdd, 9, pageNumber, buildBasket);

//функция навешивает листенеры на две кнопки, меняет значение HTMLElement, запускает функцию
function addDelDiv(
  del: HTMLElement,
  delMin: number,
  add: HTMLElement,
  addMax: number,
  elem: HTMLElement,
  func?: Function
): void {
  del.addEventListener('click', () => {
    if (+elem.textContent! == delMin) {
      return;
    }
    console.log('сработала кнопка Del');
    elem.textContent = '' + (+elem.textContent! - 1);
    if (func !== undefined) {
      func();
    }
  });
  add.addEventListener('click', () => {
    if (+elem.textContent! == addMax) {
      return;
    }
    console.log('сработала кнопка Add');
    elem.textContent = '' + (+elem.textContent! + 1);
    if (func !== undefined) {
      func();
    }
  });
}

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

// формирование HTML корзины и получение инфо о товаре с API
const getBasketInfo = (id: string) => {
  fetch(`https://dummyjson.com/products/${+id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log('id=', id, 'data=', data);

      const prodCartItem = document.createElement('div');
      prodCartItem.classList.add('prod-cart-item');

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const itemI = document.createElement('div');
      itemI.classList.add('item-i');
      itemI.textContent = data.id;

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
      stockControl.textContent = '' + (+data.stock - 1);

      const quantityControl = document.createElement('div');
      quantityControl.classList.add('quantity-control');

      const quantityControlSpan = document.createElement('span');
      quantityControlSpan.classList.add('quantity-control-span');
      quantityControlSpan.textContent = `${basketRender[id]}`;

      const amountControl = document.createElement('div');
      amountControl.classList.add('amount-control');
      amountControl.textContent = '' + data.price * basketRender[id];

      const plusButton = document.createElement('button');
      plusButton.classList.add('quantity-control-plus');
      plusButton.textContent = '+';
      plusButton.addEventListener('click', () => {
        if (+stockControl.textContent! == 0) {
          return;
        }
        quantityControlSpan.textContent = '' + (+quantityControlSpan.textContent! + 1);
        basketRender[id] = +quantityControlSpan.textContent;
        refreshTotalItemInBasket();
        stockControl.textContent = '' + (+stockControl.textContent! - basketRender[id]);
        amountControl.textContent = '' + (+amountControl.textContent! + data.price);
        setLocalStorage('basket', basketRender);
      });

      const minusButton = document.createElement('button');
      minusButton.classList.add('quantity-control-minus');
      minusButton.textContent = '-';
      minusButton.addEventListener('click', () => {
        // console.log(typeof data.price);
        quantityControlSpan.textContent = '' + (+quantityControlSpan.textContent! - 1);
        basketRender[id] = +quantityControlSpan.textContent;
        refreshTotalItemInBasket();
        setLocalStorage('basket', basketRender);
        if (+quantityControlSpan.textContent! == 0) {
          delete basketRender[id];
          setLocalStorage('basket', basketRender);
          buildBasket();

          return;
        }

        amountControl.textContent = '' + (+amountControl.textContent! - data.price);
        stockControl.textContent = '' + (+stockControl.textContent! + 1);
      });

      productTitle.prepend(productTitleH3);
      productOther.prepend(divRating, divDiscount);
      itemDetailP.prepend(productTitle, productDescription, productOther);
      itemInfo.prepend(itemInfoImg, itemDetailP);
      quantityControl.prepend(plusButton, quantityControlSpan, minusButton);
      numberControl.prepend(stockControl, quantityControl, amountControl);
      cartItem.prepend(itemI, itemInfo, numberControl);
      prodCartItem.prepend(cartItem);
      document.querySelector('.prod-items')?.append(prodCartItem);
    });
};
