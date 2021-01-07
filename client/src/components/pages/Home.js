import "../../App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import HeroSection from "../HeroSection";
import Cards from "../Cards";

function Home() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    //post request on axios sending movie information into backend
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    /*setMovieReviewList([
      ...movieReviewList,
      {movieName: movieName, movieReview: review}
    ]);*/

    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  };

  const deleteReview = (movieID) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieID}`);

    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  };

  const updateReview = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      movieID: id,
      movieReview: newReview,
    });
  };

  return (
    <>
      <HeroSection />

      <div className="App">
        <h1>CRUD APPLICATION</h1>

        <div className="form">
          <label>Movie name:</label>
          <input
            type="text"
            name="movieName"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />

          <label>Review:</label>
          <input
            type="text"
            name="review"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />

          <button onClick={submitReview}>Submit</button>

          {movieReviewList.map((val) => {
            return (
              <div className="card">
                <h1>{val.movieName}</h1>
                <p>{val.movieReview}</p>

                <button
                  onClick={() => {
                    deleteReview(val.id);
                  }}
                >
                  Delete
                </button>
                <input
                  id="updateInput"
                  type="text"
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateReview(val.id);
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Cards />
    </>
  );
}

export default Home;
