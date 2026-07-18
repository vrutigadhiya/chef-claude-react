import React, { useState } from "react";
import "./Header.css";
import IngredientsList from "../IngredientsList/IngredientsList";
import ClaudeRecipe from "../ClaudeRecipe/ClaudeRecipe";

const Header = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);
  const [error, setError] = useState("");
  const [serves, setServes] = useState(2);

  const toggleRecipeShown = () => {
    setRecipeShown((prevShown) => !prevShown);
  };

  function addIngredients(formData) {
    const newIngredient = formData.get("ingredient").trim();

    if (!newIngredient) return;

    if (
      ingredients.some(
        (ingredient) =>
          ingredient.toLowerCase() === newIngredient.toLowerCase(),
      )
    ) {
      setError("⚠️ This ingredient is already in the list.");
      return;
    }

    setIngredients((prev) => [...prev, newIngredient]);
    setError("");
  }

  const removeIngredient = (indexToRemove) => {
  setIngredients((prev) =>
    prev.filter((_, index) => index !== indexToRemove)
  );
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
        {error && <p className="error-message">{error}</p>}
        <div className="serves-container">
          <label htmlFor="serves">🍽 Serves</label>

          <select
            id="serves"
            value={serves}
            onChange={(e) => setServes(e.target.value)}
          >
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="4">4 People</option>
            <option value="6">6 People</option>
            <option value="8">8 People</option>
          </select>
        </div>
        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            toggleRecipeShown={toggleRecipeShown}
            removeIngredient={removeIngredient}
          />
        )}
        {recipeShown && (
          <ClaudeRecipe ingredients={ingredients} serves={serves} />
        )}
      </main>
    </>
  );
};

export default Header;
