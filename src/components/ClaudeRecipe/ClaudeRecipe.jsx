import React, { useEffect, useState } from "react";
import "./ClaudeRecipe.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ClaudeRecipe = ({ ingredients, serves }) => {
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
          body: JSON.stringify({ ingredients, serves }),
        });

        const data = await res.json().catch(() => null);

        console.log("Status:", res.status);
        console.log("Response body:", data);

        if (!res.ok) {
          throw new Error(
            `Request failed: ${res.status} - ${JSON.stringify(data)}`,
          );
        }

        setRecipe(data.recipe);
      } catch (err) {
        console.error("Fetch error details:", err);
        setError(
          "Something went wrong generating your recipe. Please try again.",
        );
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
      {loading && (
        <div className="loading-spinner">
          <p>✨ Generating your recipe...</p>
        </div>
      )}
      {error && <p className="error-message">❌ {error}</p>}
      {!loading && !error && recipe && (
        <div className="recipe-card">
          <div className="recipe-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe}</ReactMarkdown>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClaudeRecipe;
