import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";
const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);
  const loadAllProducts = () => {
    return (
      <div>
        <h2 class="alert alert-info mt-3">your products</h2>
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
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setreload} />
        </div>
      </div>
    </Base>
  );
};
export default Cart;
