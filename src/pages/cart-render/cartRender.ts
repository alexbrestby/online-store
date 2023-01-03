import './cart-render.css';
import { cartItemRender } from './cartItem-render/cartItemRender';

const cartRender = () => {
  (document.querySelector('.header-search') as HTMLElement).style.display = 'none';
  const renderArea = <HTMLElement>document.querySelector('.main');

  const cartWrapper = document.createElement('div');
  cartWrapper.classList.add('cart-wrapper');

  const products = document.createElement('div');
  products.classList.add('products-in-cart');

  const productsControl = document.createElement('div');
  productsControl.classList.add('cart-controls');

  const productsControlH2 = document.createElement('h2');
  productsControlH2.innerHTML = `Products in cart`;

  const productsControlParams = document.createElement('div');
  productsControlParams.classList.add('cart-controls__params');
  productsControl.append(productsControlH2, productsControlParams);

  const productsControlLimit = document.createElement('div');
  productsControlLimit.classList.add('cart-limit');
  productsControlLimit.innerHTML = `Limit: `;

  const productsControlLimitInput = document.createElement('input');
  productsControlLimitInput.type = 'number';
  productsControlLimitInput.min = '1';
  productsControlLimitInput.max = '7';
  productsControlLimitInput.value = '3';
  productsControlLimit.append(productsControlLimitInput);

  const productsControlPages = document.createElement('div');
  productsControlPages.classList.add('cart-pages');
  productsControlPages.innerHTML = `Page: `;

  const productsControlPagesLeft = document.createElement('div')
  productsControlPagesLeft.classList.add('button', 'button-left');
  const productsControlPagesRight = document.createElement('div')
  productsControlPagesRight.classList.add('button', 'button-right');

  const productsControlPagesSpan = document.createElement('span');
  productsControlPages.append(productsControlPagesLeft, productsControlPagesSpan, productsControlPagesRight);
  productsControlPagesSpan.innerHTML = `1`;
  productsControlParams.append(productsControlLimit, productsControlPages);

  const productsItems = document.createElement('div');
  productsItems.classList.add('products-items');
  products.append(productsControl, productsItems);

  const productsArray = JSON.parse(localStorage.getItem('inCart') as string) || [];
  if (productsArray && productsArray.length > 0) {
    cartItemRender(productsArray);
  }

  const totalCart = document.createElement('div');
  totalCart.classList.add('total-cart');

  const totalCartH2 = document.createElement('h2');
  totalCartH2.innerHTML = `Summary`;

  const totalCartInfo = document.createElement('div');
  totalCartInfo.classList.add('total-cart__info')

  totalCart.append(totalCartH2, totalCartInfo);

  const totalQnt = document.createElement('div');
  totalQnt.classList.add('total-quantity');
  totalQnt.innerHTML = `Products: `;
  const qntSpan = document.createElement('span');
  qntSpan.innerHTML = `0`;
  totalQnt.append(qntSpan);

  const totalPrice = document.createElement('div');
  totalPrice.classList.add('total-price');
  totalPrice.innerHTML = 'Total: '

  const priceSpan = document.createElement('span');
  priceSpan.innerHTML = `0`;
  totalPrice.append(priceSpan);

  const buyButton = document.createElement('div');
  buyButton.classList.add('button', 'button-buy');
  buyButton.innerHTML = `Buy Now`;

  totalCartInfo.append(totalQnt, totalPrice, buyButton);

  renderArea.innerHTML = '';
  cartWrapper.append(products, totalCart);
  renderArea.append(cartWrapper);
};
export { cartRender };
