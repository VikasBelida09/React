import React, { useState, useEffect } from "react";
import ImageHelper from "./ImageHelper";
import { Redirect } from "react-router-dom";
import { CartHelper, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const cardtitle = product ? product.name : "A photo from pexel";
  const carddescriptoion = product
    ? product.description
    : "default description";
  const cardprice = product ? product.price : "10$";
  const [redirect, setredirect] = useState(false);
  const [count, setcount] = useState(product.count);
  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const AddtoCart = () => {
    CartHelper(product, () => {
      setredirect(true);
    });
  };
  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={AddtoCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardtitle}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          {getRedirect(redirect)}
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {carddescriptoion}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{cardprice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">
            {showRemoveFromCart((removeFromCart = true))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
