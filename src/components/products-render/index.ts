import './style.css';
import { mainRender } from "./main-render/main-render";


const productsRender = () => {
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
        mainRender(product);
      }
    })
    .catch((e) => console.log(e));
};

export default productsRender;
