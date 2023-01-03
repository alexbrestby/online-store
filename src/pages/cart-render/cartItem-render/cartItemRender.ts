import './cart-item.css';
import { Idata, Iproduct } from '../../../types/types';
import { productRender } from '../../product-render/productRender';

const cartItemRender = (arr: any) => {
  fetch(`https://dummyjson.com/products?limit=51`)
    .then(result => result.json())
    .then((data: Idata) => {
      const productsItemWrapper = document.querySelector('.products-items');
      let productsArray = data.products as Iproduct[];
      arr.forEach((element: any, idx: number) => {
        for (let elem of productsArray) {
          if (element.id === elem.id) {
            const product = document.createElement('div');
            product.classList.add('cart-item');

            const productIndex = document.createElement('div');
            productIndex.classList.add('item-index');
            productIndex.innerHTML = `${idx + 1}`;

            const productInfo = document.createElement('div');
            productInfo.classList.add('item-info');

            const productInfoImg = document.createElement('img');
            productInfoImg.src = elem.thumbnail;
            productInfoImg.alt = elem.title;

            const productInfoDetails = document.createElement('div');
            productInfoDetails.classList.add('product-details');

            const productTitle = document.createElement('h2');
            productTitle.innerHTML = elem.title;

            const productDescription = document.createElement('div');
            productDescription.classList.add('product-description');
            productDescription.innerHTML = elem.description;

            const productOther = document.createElement('div');
            productOther.classList.add('product-other');

            const productRating = document.createElement('div');
            productRating.classList.add('product-rating');
            productRating.innerHTML = `Rating: ${elem.rating}`;

            const prodcutDiscount = document.createElement('div');
            prodcutDiscount.classList.add('product-discoutn');
            prodcutDiscount.innerHTML = `Discount: ${elem.discountPercentage}`;

            productOther.append(productRating, prodcutDiscount);
            productInfoDetails.append(productTitle, productDescription, productOther);
            productInfo.append(productInfoImg, productInfoDetails);

            const productControl = document.createElement('div');
            productControl.classList.add('item-control');

            const stockControl = document.createElement('div');
            stockControl.classList.add('stock-control');
            stockControl.innerHTML = `Stock: ${elem.stock}`;

            const inDecContorol = document.createElement('div');
            inDecContorol.classList.add('inc-dec-control');

            const productsControlPagesLeft = document.createElement('div')
            productsControlPagesLeft.classList.add('button', 'button-minus');
            const productsControlPagesRight = document.createElement('div')
            productsControlPagesRight.classList.add('button', 'button-plus');

            const productsControlPagesSpan = document.createElement('span');
            inDecContorol.append(productsControlPagesLeft, productsControlPagesSpan, productsControlPagesRight);
            productsControlPagesSpan.innerHTML = `1`;

            const amountContorl = document.createElement('div');
            amountContorl.classList.add('amount-control');
            amountContorl.innerHTML = `€ ${elem.price}`;

            productControl.append(stockControl, inDecContorol, amountContorl);
            product.append(productIndex, productInfo, productControl);
            productsItemWrapper?.append(product);
          }
        }
      });
      document.querySelectorAll('.item-info img').forEach((e) => {
        e.addEventListener('click', (e) => {
          const id = (e.target as HTMLImageElement).src.split('/')[5];
          window.history.pushState({ product: id }, '', `product_${id}`);
          productRender();
        });
      });
    });
}

export { cartItemRender };
