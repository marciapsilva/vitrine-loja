import React from 'react';
import Product from './Product';
import './css/Products.css';

const Products = (props) => {
  let productsData = [];
  let productsGroup = [];

  if (props.products.notFound === false && props.products.totalFound === 0) {
    productsData = props.products.productsDb;
  } else if (props.products.totalFound !== 0) {
    productsData = props.products.productsFound;
  }

  productsData.map( (product, index) => {
    if (index >= (0 + props.products.firstItemOnPage()) && index < (props.products.productsPerPage + props.products.firstItemOnPage())) {
      return productsGroup.push(product);
    } else {
      return null;
    }
  })

  const loading = <div className="d-flex fd-column j-center">
    <p>Carregando produtos</p>
  </div>;

  const produtos = 
  <section>
    <div className="title-container">
      { props.products.searchEntry.length === 0 ? 
        <h1 id="page-title">Lista de produtos</h1> :
        <h1 id="page-title">{props.products.searchEntry}</h1>
      }
    </div>
    <div className="d-flex fd-column j-center">
      <div className="content-container">
        { props.products.searchEntry.length !== 0 ? 
          <div className="numb-container d-flex">
            <p className="numb-products">{productsData.length} produtos encontrados</p>
          </div>
          : null }
        <div className="products-container">
          { (productsGroup.length !== 0) ?
            productsGroup.map(product => <Product key={product._id} product={product} />) : null }
        </div>
      </div>
    </div>
  </section>;

  return (
    <main>
      { props.products.totalProducts === 0 ? loading : produtos }
    </main>
  )
};

export default Products;