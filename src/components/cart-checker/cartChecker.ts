import { cartItemRender } from "../../pages/cart-render/cartItem-render/cartItemRender";

const inCartArray: any = JSON.parse(localStorage.getItem('inCart')!) || [];
export const inCartCheck = (obj?: { id?: number, price?: number, counter?: number }, e?: Event) => {
  const productCounter = <HTMLElement>document.querySelector('.total-item');
  const productSum = <HTMLElement>document.querySelector('.total-sum');
  if (typeof e !== 'undefined') {

    if ((e.target as HTMLElement).classList.contains('item-wrapper-button-buy')) {
      if (!inCartArray.some((item: any) => item.id === obj?.id)) {
        inCartArray.push(obj);
        (e.target as HTMLElement).innerHTML = `drop from cart`;
        (e.target as HTMLElement).classList.add('added');
      } else {
        for (let i = 0; i < inCartArray.length; i++) {
          if (inCartArray[i].id === obj?.id) {
            inCartArray.splice(i, 1);
          }
        }
        (e.target as HTMLElement).innerHTML = `add to cart`;
        (e.target as HTMLElement).classList.remove('added');
      }

    } else if ((e.target as HTMLElement).classList.contains('button-minus')) {
      for (let i = 0; i < inCartArray.length; i++) {
        if (inCartArray[i].id === obj?.id) {
          inCartArray[i].counter--;
          if (inCartArray[i].counter === 0) {
            inCartArray.splice(i, 1);
            (document.querySelector('.products-items') as HTMLElement).innerHTML = '';
            cartItemRender(
              inCartArray,
              +(document.querySelector('.cart-limit input') as HTMLInputElement)?.value,
              +(document.querySelector('.cart-pages span') as HTMLElement)?.innerHTML
            );
          }
        }
      }
    } else if ((e.target as HTMLElement).classList.contains('button-plus')) {
      for (let i = 0; i < inCartArray.length; i++) {
        if (inCartArray[i].id === obj?.id) {
          inCartArray[i].counter++;
        }
      }
    }
    localStorage.setItem('inCart', JSON.stringify(inCartArray));
  } else {
    return inCartArray.some((item: any) => item.id === obj?.id);
  }

  console.log('cart rechecked');
  let counter = inCartArray.reduce((acc: number, elem: any) => acc + elem.counter, 0);
  if (counter < 10) counter = `&nbsp;${counter}`;
  const sum = inCartArray.reduce((acc: number, elem: any) => acc + elem.counter * elem.price, 0);
  productCounter.innerHTML = counter;
  productSum.innerHTML = sum;
}