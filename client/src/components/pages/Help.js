import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import FAQ from '../FAQ'
import '../FAQ.css'

export default function Help() {

    const [faqs, setFaq] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getQuestions").then((response) => {
            setFaq(response.data);
        });
    }, []);

    const toggleFAQ = (index) => {
        setFaq(faqs.map((faq, i) => {
            {i === index ? faq.open = !faq.open : faq.open = false}
            return faq;
        }))
    }

    return (
        <form className="help">
            <div className="form--container">
                <p className="title">Pomoć</p>
                <p className="text">
                    Ova stranica je namijenjena za upravljanje Gumi servisom.... <br/>
                    U Help.js promjeniti tekst
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
        </form>
    )
}