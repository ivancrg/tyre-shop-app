import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function OfferCardItem(props) {
  return (
    <>
      <li className="cards__item" key={props.id.toString()}>
        <Link
          className="cards__item__link"
          //to={props.path}
        >
          <figure
            className="cards__item__pic-wrap"
            data-category={props.price + " HRK (s PDV-om)"}
          >
            <img src={props.src} alt={props.alt} className="cards__item__img" />
          </figure>

          <div className="cards__item__name__offer">
            <h5 className="cards__item__text">{props.name}</h5>
          </div>

          <div className="cards__item__data__offer">
            <h5 className="cards__item__text">
              {"Šifra proizvoda: " + props.code}
            </h5>
            <h5 className="cards__item__text">{props.data}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default OfferCardItem;

// import React from 'react'
// import { Link } from 'react-router-dom'

// function OfferCardItem(props) {
//     return (
//         <>
//             <li className="cards__item">
//                 <Link className="cards__item__link" to={props.path}>
//                     <figure className="cards__item__pic-wrap" data-category={props.label}>
//                         <img src={props.src} alt={props.alt} className="cards__item__img" />
//                     </figure>

//                     <div className="cards__item__info">
//                         <h5 className="cards__item__text">{props.name}</h5>
//                     </div>

//                     {/* <div className="cards__item__data__offer">
//                         <h6 className="cards__item__text">{props.data}</h6>
//                     </div> */}
//                 </Link>
//             </li>
//         </>
//     )
// }

// export default OfferCardItem
