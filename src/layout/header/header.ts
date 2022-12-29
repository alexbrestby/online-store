import './header.css';
import '../../assets/images/logo.png';
import '../../assets/images/cart.png';

const headerRender = () => {
  console.log('render header');

  const header = document.createElement('header');
  header.classList.add('header');

  /* header logo */
  const headerLogo = <HTMLElement>document.createElement('div');
  headerLogo.classList.add('header-logo');

  const headerLogoImgWrapper = <HTMLElement>document.createElement('div');
  headerLogoImgWrapper.classList.add('header-logo__img');

  const headerLogoImg = document.createElement('img');
  headerLogoImg.src = `./assets/images/logo.png`;
  headerLogoImg.alt = `site-logo`;

  const headerLogoLink = document.createElement('a');
  headerLogoLink.href = `/`;
  headerLogoLink.target = `_blank`;
  // logo click listener
  headerLogoLink.addEventListener('click', function (e) {
    e.preventDefault();
    location.href = `/`;
  });

  headerLogoImgWrapper.append(headerLogoImg, headerLogoLink);
  headerLogo.append(headerLogoImgWrapper);
  /* header logo */

  /* header search */
  const headerSearch = <HTMLElement>document.createElement('div');
  headerSearch.classList.add('header-search');

  const headerSearchInputWrapper = <HTMLElement>document.createElement('div');
  headerSearchInputWrapper.classList.add('header-search__input');

  const headerSearchInput = document.createElement('input');
  headerSearchInput.type = `text`;
  headerSearchInput.name = `search`;
  headerSearchInput.id = `search`;
  headerSearchInput.placeholder = `Search Product`;

  const headerFound = <HTMLElement>document.createElement('div');
  headerFound.classList.add('header-found');
  headerFound.innerHTML = `Found: `;

  const headerFoundCounter = document.createElement('span');
  headerFoundCounter.innerHTML = `0`;

  headerFound.append(headerFoundCounter);
  headerSearchInputWrapper.append(headerSearchInput, headerFound);
  headerSearch.append(headerSearchInputWrapper);
  /* header search */

  /* header cart */
  const headerCart = <HTMLElement>document.createElement('div');
  headerCart.classList.add('header-cart');

  const headerCartTotal = <HTMLElement>document.createElement('div');
  headerCartTotal.classList.add('header-cart__total');
  headerCartTotal.innerHTML = `Total: `;

  const headerCartTotalSum = document.createElement('span');
  headerCartTotalSum.classList.add('total-sum');
  headerCartTotalSum.innerHTML = `0.00`;

  headerCartTotal.append(headerCartTotalSum);

  const headerCartImgWrapper = <HTMLElement>document.createElement('div');
  headerCartImgWrapper.classList.add('header-cart__img');

  const headerCartTotalItem = document.createElement('span');
  headerCartTotalItem.classList.add('total-item');
  headerCartTotalItem.innerHTML = `0`;

  const headerCartImg = document.createElement('img');
  headerCartImg.classList.add('header-cart__img');
  headerCartImg.src = `./assets/images/cart.png`;
  headerCartImg.alt = `cart`;
  headerCartImgWrapper.append(headerCartTotalItem, headerCartImg);

  headerCart.append(headerCartTotal);
  headerCart.append(headerCartImgWrapper);
  /* header cart */

  header.append(headerLogo);
  header.append(headerSearch);
  header.append(headerCart);
  document.querySelector('.wrapper')?.prepend(header);
};

export { headerRender };
