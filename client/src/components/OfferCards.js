import React, { useState, useEffect } from "react";
import Axios from "axios";
import OfferCardItem from "./OfferCardItem";
import "./Cards.css";

function OfferCards() {
  const [offerList, setOfferList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getOffer").then((response) => {
      setOfferList(response.data);
    });
  }, []);

  return (
    <div className="cards">
      <h1>OfferCards.js Line 6</h1>

      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {offerList.map((item) => (
              <>
                <OfferCardItem
                  src={item.img_src}
                  alt={item.img_alt}
                  path={item.tyre_path}
                  name={item.name}
                  code={item.idoffer}
                  data={item.data}
                  price={item.price}
                />
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OfferCards;
