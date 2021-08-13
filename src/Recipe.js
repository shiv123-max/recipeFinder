import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./request";
import "./Recipe.css";
import { Link } from "react-router-dom";

const Recipe = () => {
  const [recipe, setRecipe] = useState("");
  const [recipeDetails, setRecipeDetails] = useState([]);

  const fetchURL1 = `/recipes/complexSearch${requests.normal}&query=${recipe}&number=50`;

  useEffect(()=> {
   const data = localStorage.getItem("my-recipe-list");
   if(data) {
     setRecipeDetails(JSON.parse(data));
   }
  },[])

  useEffect(() => {
    localStorage.setItem("my-recipe-list", JSON.stringify(recipeDetails));
  })

  async function handleSubmit() {
    const request = await axios.get(fetchURL1);
    setRecipeDetails(request.data.results);
  }

  const handleChange = (e) => {
    setRecipe(e.target.value);
  };

  return (
    <div className="recipe">
      <h1 className="recipe__title">The Foodies</h1>
      <input
        type="text"
        placeholder="Search any dish..."
        onChange={handleChange}
        value={recipe}
      />
      <button className="recipe__link" onClick={handleSubmit}>
        Search
      </button>
      {recipeDetails.length === 0 ? "" : <h3 className="recipe__header">Top Recommendations</h3>}
      {/*  */}
      <div className="recipe__cards">
        {recipeDetails?.map((dish) => (
          <div className="recipe__card">
            <img src={dish.image} alt="" />
            <h3 className="recipe__name">{dish.title}</h3>
            <Link className="recipe__link" to={`recipe/${dish.id}/${dish.title}`}>
             Get the Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
