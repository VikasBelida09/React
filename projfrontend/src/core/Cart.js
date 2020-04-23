import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);
  const loadAllProducts = () => {
    return (
      <div>
        <h2>this is for displaying products</h2>
        {products.map((item, index) => {
          return (
            <Card
              product={item}
              key={index}
              addtoCart={false}
              removeFromCart={true}
              setReload={setreload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);
  const loadCheckout = () => {
    return (
      <div>
        <h2>This is for checking out</h2>
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};
export default Cart;
