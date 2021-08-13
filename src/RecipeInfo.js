import React, { useEffect, useState } from "react";
import requests from "./request";
import axios from "./axios";
import { useParams } from "react-router";
import "./RecipeInfo.css";
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Link } from "react-router-dom";

const RecipeInfo = () => {
  let { id, title } = useParams();
  const fetchURL2 = `/recipes/${id}/analyzedInstructions${requests.normal}`;
  const fetchURL3 = `/recipes/${id}/ingredientWidget.json${requests.normal}`;
  const fetchURL4 = `recipes/${id}/similar${requests.normal}`
  const [fullRecipe, setFullRecipe] = useState("");
  const [ingred, setIngred] = useState([]);
  const [similarRecipe,setSimilarRecipes] = useState([]);
  

  useEffect(() => {
    async function fetchRecipe() {
      const request = await axios.get(fetchURL2);
      setFullRecipe(request.data[0]);
    }
    fetchRecipe();
  }, [fetchURL2]);

  useEffect(() => {
    async function fetchIngredients() {
      const request = await axios.get(fetchURL3);
      setIngred(request.data.ingredients);
      //  console.log(request.data.ingredients);
    }
    fetchIngredients();
  }, [fetchURL3]);

  useEffect(() => {
    async function fetchSimilarRecipes() {
      const request = await axios.get(fetchURL4);
      setSimilarRecipes(request.data);
      // console.log(request);
    }
    fetchSimilarRecipes();
  }, [fetchURL4])

  return (
    <div className="recipeInfo">
      <p className="recipeInfo__title">{title}</p>
      <img className="recipeInfo__image" src={`https://spoonacular.com/recipeImages/${id}-556x370.jpg`} alt="foodImage" />
      <h3 className="recipe__procedure">List of all Ingredients : </h3>
      <div className="recipeInfo__ingredients">
      {ingred?.map((ingredient) => {
        return (
          <div className="recipeInfo_ingredList">
          <img className="recipeInfo__ingredImage" src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`} alt="" />
          <p className="recipe__ingred">
            {ingredient.name} - {ingredient.amount.metric.value}{" "}
            {ingredient.amount.metric.unit}
          </p>
          </div>
        );
      })}
      </div>
      <h3 className="recipe__procedure">Step Wise Procedure : </h3>
      {fullRecipe.steps?.map((dish) => {
        return (
          <p className="recipe__step">
            {dish.number}. {dish.step}
          </p>
        );
      })}
      <button className="recipeInfo__button">
      <a href={`https://www.youtube.com/results?search_query=${title}+recipe`} target="_blank" rel="noopener noreferrer"> Get Video Recipe</a>
      <YouTubeIcon className="recipeInfo__yt"/>
      </button>
      <h3 className="recipe__procedure">Similar Recipes :</h3>
      {similarRecipe?.map((recipe) => {
         return (
           <Link to={`/recipe/${recipe.id}/${recipe.title}`}>
           <p className="recipe__ingred">{recipe.title}</p>
           </Link>
           
         )
      })}
      
    </div>
  );
};

export default RecipeInfo;
