import React, { useState } from "react";
import "./Header.css";
import IngredientsList from "../IngredientsList/IngredientsList";
import ClaudeRecipe from "../ClaudeRecipe/ClaudeRecipe";

const Header = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);


  const toggleRecipeShown = () => {
    setRecipeShown(prevShown => !prevShown)
  }

  const addIngredients = (formData) => {
    // const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  };

  return (
    <>
      <main>
        <form action={addIngredients} className="add-ingredient">
          <input
            type="text"
            name="ingredient"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
          />
          <button>Add ingredient</button>
        </form>
        { ingredients.length > 0 &&
          <IngredientsList ingredients={ingredients} toggleRecipeShown={toggleRecipeShown} />
        }
        { recipeShown && <ClaudeRecipe ingredients={ingredients} />}
      </main>
    </>
  );
};

export default Header;
