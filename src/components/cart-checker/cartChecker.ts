export const inCartCheck = (obj: { id: number, price: number }, e?: Event) => {
  const inCartArray: any = JSON.parse(localStorage.getItem('inCart')!) || [];
  if (typeof e !== 'undefined') {
    if (!inCartArray.some((item: any) => item.id === obj.id)) {
      inCartArray.push(obj);
      localStorage.setItem('inCart', JSON.stringify(inCartArray));
      (e.target as HTMLElement).innerHTML = `drop from cart`;
      (e.target as HTMLElement).classList.add('added');
    } else {
      for (let i = 0; i < inCartArray.length; i++) {
        if (inCartArray[i].id === obj.id) {
          inCartArray.splice(i, 1);
        }
      }
      localStorage.setItem('inCart', JSON.stringify(inCartArray));
      (e.target as HTMLElement).innerHTML = `add to cart`;
      (e.target as HTMLElement).classList.remove('added');
    }
  } else {
    return inCartArray.some((item: any) => item.id === obj.id);
  }
}