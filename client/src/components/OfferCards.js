import React from 'react'
import OfferCardItem from './OfferCardItem'
import './Cards.css'

function OfferCards() {
    return (
        <div className="cards">
            <h1>OfferCards.js Line 6</h1>

            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <OfferCardItem
                            src="../images/img-1.jpg"
                            alt="Cards.js Line 15"
                            path="/Cards.jsLine18"
                            name="Bridgestone Blizzak LM005"
                            data="Giulia zimske"
                            price="1000,00"
                        />

                        <OfferCardItem
                            src="../images/tire-2.jpg"
                            alt="Cards.js Line 23"
                            path="/Cards.jsLine26"
                            name="Toyo Proxes"
                            data="156"
                            price="2000,00"
                        />

                        <OfferCardItem
                            src="../images/tire-3.jpg"
                            alt="Cards.js Line 23"
                            path="/Cards.jsLine26"
                            name="Imperial"
                            data="MiTo zimske"
                            price="3000,00"
                        />

                        <OfferCardItem
                            src="../images/tire-4.jpg"
                            alt="Cards.js Line 23"
                            path="/Cards.jsLine26"
                            name="GoodYear Eagle F1"
                            data="Giulia"
                            price="4444,00"
                        />

                        <OfferCardItem
                            src="../images/tire-5.jpg"
                            alt="Cards.js Line 23"
                            path="/Cards.jsLine26"
                            name="Uniroyal RainSport 3"
                            data="MiTo"
                            price="5555,00"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OfferCards
