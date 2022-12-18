import './style.css';

const productsRender = () => {
  const render = document.querySelector('.render-area');

  // подтягиваем список товаров
  const base:
    {
      id: number,
      title: string,
      description: string,
      price: number,
      discountPercentage: number,
      rating: number,
      stock: null,
      brand: string,
      category: string,
      thumbnail: string,
      images: string[]
    }[] = [];

  fetch('https://dummyjson.com/products?limit=48')
    .then((res) => res.json())
    .then((data) => {
      for (const product of data.products) {

        base.push(product);

        const item = document.createElement('div');
        item.classList.add('product-item');

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.style.background = `url(${product.thumbnail}) 0% 0% / cover`;

        const title = document.createElement('h2');
        title.innerHTML = `${product.title}`;

        item.append(title);
        item.append(itemWrapper);
        render?.append(item);
      }
    })
    .catch(e => console.log((e)));

  return base;
};

export default productsRender;
