import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './RelatedProducts/Components/ProductCard.jsx';

const Home = () => {

  const [products, setProducts] = useState([]);

  const listType = {type: 'related'};

  /*
  request('/products', { page: 1, count: 10 }, 'get')
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    */

  useEffect(() => {
    axios.get('/products', {params: {page: 1, count: 10}})
    .then((response) => {
      setProducts(response.data);
    })
  }, []);

  return (

    <div>
      <h3>Home page</h3>
      <div className="home-card">
      {products.map((item, index) => (
                <ProductCard product={item} listType={listType} key={index}/>
            ))}
            </div>
    </div>

  );
}

export default Home;
