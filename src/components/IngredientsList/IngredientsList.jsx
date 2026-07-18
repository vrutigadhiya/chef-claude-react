import React from "react";
import "./IngredientsList.css";
import { X } from "lucide-react";

const IngredientsList = ({ ingredients, removeIngredient, toggleRecipeShown }) => {

  const ingredientListItems = ingredients.map((ingredient, index) => (
    <li key={index} className="ingredient-item">
      <span>{ingredient}</span>

      <button
        className="remove-btn"
        onClick={() => removeIngredient(index)}
        aria-label={`Remove ${ingredient}`}
      >
        <X size={18} />
      </button>
    </li>
  ));

  return (
    <section>
      <h2>Ingredients on hand:</h2>

      <ul className="ingredients-list" aria-live="polite">
        {ingredientListItems}
      </ul>

      {ingredients.length < 4 && (
        <p
          className="condition"
        >
          Minimum Four Ingredients Needed.
        </p>
      )}

      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>

          <button onClick={toggleRecipeShown}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;