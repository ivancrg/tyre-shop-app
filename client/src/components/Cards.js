import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className="cards">
            <h1>Cards.js Line 6</h1>

            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="../images/img-9.jpg"
                            alt="Cards.js Line 15"
                            text="Cards.js Line 16"
                            label="Cards.js Line 17"
                            path="/Cards.jsLine18"
                        />

                        <CardItem
                            src="../images/img-5.jpg"
                            alt="Cards.js Line 23"
                            text="Cards.js Line 24"
                            label="Cards.js Line 25"
                            path="/Cards.jsLine26"
                        />
                    </ul>

                    <ul className="cards__items">
                        <CardItem
                            src="../images/img-9.jpg"
                            alt="Cards.js Line 33"
                            text="Cards.js Line 34"
                            label="Cards.js Line 35"
                            path="/Cards.jsLine36"
                        />

                        <CardItem
                            src="../images/img-5.jpg"
                            alt="Cards.js Line 41"
                            text="Cards.js Line 42"
                            label="Cards.js Line 43"
                            path="/Cards.jsLine44"
                        />

                        <CardItem
                            src="../images/img-5.jpg"
                            alt="Cards.js Line 49"
                            text="Cards.js Line 50"
                            label="Cards.js Line 51"
                            path="/Cards.jsLine52"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
