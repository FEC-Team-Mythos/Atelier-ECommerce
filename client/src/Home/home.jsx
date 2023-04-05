import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';

function Home({ setProductId }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // get products 10 per page
  useEffect(() => {
    axios.get('/products', { params: { page: page, count: 10 } })
      .then((response) => {
        setProducts(response.data);
      });
  }, [page]);

  const navigateToProduct = (id) => {
    window.location.assign('product?' + id);
  };

  return (

    <div>
      <h3>Home page</h3>
      <div className="home-card">
        {products.map((item, index) => (
          <ProductCard navigateToProduct={navigateToProduct} id={item.id} setProductId={setProductId} product={item} key={index} />
        ))}
      </div>
      Page: {page}
      <br />
      <br />
      {page > 1 ? <button onClick={()=>{setPage(page - 1)}}>Previous Page</button> : null}
      <button onClick={()=>{setPage(page + 1)}}>Next page</button>
    </div>

  );
}

export default Home;
