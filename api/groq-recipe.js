export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  if (!ingredients || ingredients.length < 4) {
    return res.status(400).json({ error: "At least 4 ingredients required" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that generates a simple, clear recipe based on a list of ingredients the user has on hand. You don't need to use every ingredient. Format your response in Markdown, including a title, ingredient list, and numbered steps.",
            },
            {
              role: "user",
              content: `I have these ingredients: ${ingredients.join(
                ", "
              )}. Please suggest a recipe I can make.`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const recipeText = data.choices?.[0]?.message?.content || "";

    return res.status(200).json({ recipe: recipeText });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate recipe" });
  }
}