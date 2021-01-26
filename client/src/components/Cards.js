import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Novosti</h1>

      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="../images/cards-1.jpg"
              alt="Težina i dimenzija gume"
              text="Težina i dimenzija gume jedna je od njenih glavnih karakteristika."
              label="Težina i dimenzija gume"
              path="/Cards.jsLine18"
            />

            <CardItem
              src="../images/cards-2.jpg"
              alt="Performanse gume"
              text="Performanse gume po mokroj podlozi su glavni kriterij za kupnju kod mngih kupaca."
              label="Performanse gume"
              path="/Cards.jsLine26"
            />
          </ul>

          <ul className="cards__items">
            <CardItem
              src="../images/cards-3.jpg"
              alt="Potrošnja gume"
              text="Odabir gume koja se sporo troši utječe na učestalost potrebe za novim setom guma."
              label="Potrošnja gume"
              path="/Cards.jsLine36"
            />

            <CardItem
              src="../images/cards-4.jpg"
              alt="Sigurnost gume"
              text="Sigurnost gume je na vrhu prioriteta svakog proizvođača."
              label="Sigurnost gume"
              path="/Cards.jsLine44"
            />

            <CardItem
              src="../images/cards-5.jpg"
              alt="Prianjanje gume"
              text="Kod svih uporaba gume na stazi, jedno od njenih najvažnijih odlika je prianjanje."
              label="Prianjanje gume"
              path="/Cards.jsLine52"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
