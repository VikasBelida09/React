import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";
const StripeCheckout = ({
  products,
  setreload = (f) => f,
  reload = undefined,
}) => {
  const [data, setdata] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const [message, setmessage] = useState("");
  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getTotal = () => {
    let ammount = 0;
    products.map((product, index) => {
      ammount += product.price;
    });
    return ammount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "Application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        if (status === 200) {
          setmessage(true);
        } else {
          setmessage(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_CLmDueAsXE5YRebBTkYsEzEe009x03U0hZ"
        token={makePayment}
        name="Buy tshirts"
        amount={getTotal() * 100}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success mt-4">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };
  const displayMessage = () => {
    return message ? (
      <div className="alert alert-success mt-3">
        <strong>Payment Successful. </strong> Order received
      </div>
    ) : (
      <></>
    );
  };
  return (
    <div>
      <div>{displayMessage()}</div>
      <h3 className="text-white">Stripe checkout: total price {getTotal()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
