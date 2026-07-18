import React, { useEffect, useState } from "react";
import "./ClaudeRecipe.css";

const ClaudeRecipe = ({ ingredients }) => {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/groq-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        });

        const data = await res.json().catch(() => null);

        console.log("Status:", res.status);
        console.log("Response body:", data);

        if (!res.ok) {
          throw new Error(
            `Request failed: ${res.status} - ${JSON.stringify(data)}`
          );
        }

        setRecipe(data.recipe);
      } catch (err) {
        console.error("Fetch error details:", err);
        setError("Something went wrong generating your recipe. Please try again.");
        
      } finally {
        setLoading(false);
      }
    };

    if (ingredients && ingredients.length >= 4) {
      fetchRecipe();
    }
  }, [ingredients]);

  return (
    <section className="claude-recipe">
      {loading && <p>Generating your recipe...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && recipe && (
        <div className="recipe-content">
          {recipe.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClaudeRecipe;