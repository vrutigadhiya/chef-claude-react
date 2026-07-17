import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [ingredients, setIngredients] = useState([]);

  const ingredientListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

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
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">{ingredientListItems}</ul>
          {ingredients.length < 4 && <p className="condition">Minimum Four Ingredients Needed.</p> }
          {ingredients.length > 3 && <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button>Get a recipe</button>
          </div>}
        </section>
        }
      </main>
    </>
  );
};

export default Header;
