import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";
export default function Home() {
  const [product, setproduct] = useState([]);
  const [error, seterror] = useState(false);
  const loadALlProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          seterror(data.error);
        } else {
          console.log(data);
          setproduct(data);
        }
      })
      .catch();
  };
  useEffect(() => {
    loadALlProducts();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <div className="row">
          {product.map((prod, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
