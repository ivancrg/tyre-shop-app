import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import FAQ from "../FAQ";
import "../FAQ.css";

export default function Help() {
  const [faqs, setFaq] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getQuestions").then((response) => {
      setFaq(response.data);
    });
  }, []);

  const toggleFAQ = (index) => {
    setFaq(
      faqs.map((faq, i) => {
        {
          i === index ? (faq.open = !faq.open) : (faq.open = false);
        }
        return faq;
      })
    );
  };

  return (
    <form className="help">
      <div className="form--container">
        <p className="title">Pomoć</p>
        <p className="text">
          Budući da za sve postoje pitanja, na najčešća vezana za izmjenu guma
          smo pokušali odgovoriti.
        </p>
      </div>
      <div className="form--container">
        <p className="title">Često postavljana pitanja</p>
        <div className="faqs">
          {faqs.map((faq, i) => (
            <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
      <div className="form--container">
        <p className="text">
          Ukoliko nismo odgovorili na vaše pitanje, možete nas{" "}
          <a href="/contact">kontaktirati</a>.
        </p>
      </div>
    </form>
  );
}
