import { stateCheck } from "../state-check/index";

const globalSearch = () => {
  const searchInput = <HTMLInputElement>document.getElementById('search');
  const renderArea = <HTMLElement>document.querySelector('.render-area');

  // renderArea.innerHTML = '';
  // fetch(`https://dummyjson.com/products/search?q=${currentState.search}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     for (product of data.products) {
  //       // console.log(product);
  //       let item = document.createElement("div");
  //       item.classList.add('product');
  //       let brandName = document.createElement("h1");
  //       brandName.innerHTML = `${product.brand}`;
  //       item.append(brandName);
  //       renderArea.append(item);
  //     };
  //   })

  stateCheck();
}

export { globalSearch };
