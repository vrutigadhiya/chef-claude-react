import React, { useEffect, useRef, useState } from "react";
import "./ClaudeRecipe.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

import {
  Copy,
  FileDown,
  ImageDown,
  Check,
} from "lucide-react";

export default function ClaudeRecipe({
  ingredients,
  serves,
}) {
  const recipeRef = useRef(null);

  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ingredients || ingredients.length < 4) return;

    async function fetchRecipe() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/groq-recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients,
            serves,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed");
        }

        setRecipe(data.recipe);
      } catch (err) {
        console.log(err);
        setError("Unable to generate recipe.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [ingredients, serves]);

  async function copyRecipe() {
    try {
      await navigator.clipboard.writeText(recipe);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      alert("Unable to copy.");
    }
  }

  async function saveAsImage() {
    const canvas = await html2canvas(recipeRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");

    link.download = "Chef-Claude-Recipe.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const downloadPDF = useReactToPrint({
    contentRef: recipeRef,
    documentTitle: "Chef-Claude-Recipe",

    pageStyle: `
      @page{
        size:A4;
        margin:18mm;
      }

      body{
        font-family:Arial,sans-serif;
        color:#1f2937;
        line-height:1.7;
      }

      h1{font-size:28px;}
      h2{font-size:22px;}
      h3{font-size:18px;}

      ul{
        margin-left:20px;
      }

      ol{
        margin-left:22px;
      }

      li{
        margin-bottom:8px;
      }
    `,
  });

  return (
    <section className="recipe-section">
      {loading && (
        <div className="loading">
          <h2>🍳 Chef Claude is cooking...</h2>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading && !error && recipe && (
        <>
          <h2 className="recipe-heading">
            🍳 Chef Claude Recommendation
          </h2>

          <div
            ref={recipeRef}
            className="recipe-card"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {recipe}
            </ReactMarkdown>
          </div>

          <div className="recipe-actions">
            <button
              className="recipe-btn secondary"
              onClick={copyRecipe}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Recipe
                </>
              )}
            </button>

            <button
              className="recipe-btn secondary"
              onClick={saveAsImage}
            >
              <ImageDown size={18} />
              Save Image
            </button>

            <button
              className="recipe-btn primary"
              onClick={downloadPDF}
            >
              <FileDown size={18} />
              Download PDF
            </button>
          </div>
        </>
      )}
    </section>
  );
}