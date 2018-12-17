import React from 'react';
import './css/Product.css';

const Product = (props) => {  
  return (
      <div className="product-container" key={props.product._id}>
        <div className="d-flex j-between">
          <div className="d-flex j-start w-80">
            <div className="img-container d-flex j-around">
              <img src={`https://ammotest-products-api.herokuapp.com/${props.product.productImages.img0}`} alt="" />
              <img src={`https://ammotest-products-api.herokuapp.com/${props.product.productImages.img1}`} alt="" />
              <img src={`https://ammotest-products-api.herokuapp.com/${props.product.productImages.img2}`} alt="" />
              <img src={`https://ammotest-products-api.herokuapp.com/${props.product.productImages.img3}`} alt="" />
            </div>
            <div className="product-title d-flex fd-column j-center">
              <h4>{props.product.name || props.product.item}</h4>
              <p className="product-line">Linha: {props.product.productLine}</p>
            </div>
          </div>
          <div className="d-flex al-center w-20">
            <div className="d-flex j-end price-container w-100">
              <p className="old-price"><span>R${props.product.originalPrice.toFixed(2).toString().replace('.', ',')}</span> por</p>
              <p className="new-price">R${props.product.newestPrice.toFixed(2).toString().replace('.', ',')}</p>
            </div>
          </div>
        </div>
      </div>
  )
};

export default Product;