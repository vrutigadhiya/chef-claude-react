export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients, serves } = req.body;

  if (!ingredients || ingredients.length < 4) {
    return res.status(400).json({ error: "At least 4 ingredients required" });
  }

  try {
    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
    console.log("First 8 chars:", process.env.GROQ_API_KEY?.substring(0, 8));

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
              content: `
                You are Chef Claude, a professional AI chef.

                The user will provide a list of ingredients. Generate one delicious recipe using the available ingredients.

                Return the recipe in clean Markdown using EXACTLY this format:

                # 🍳 Chef Claude Recommendation

                ## [Recipe Name]

                **⏱ Prep Time:** XX mins
                **🔥 Cook Time:** XX mins
                **🍽 Serves:** X

                ---

                ## 🛒 Ingredients

                - Ingredient 1
                - Ingredient 2
                - Ingredient 3

                ---

                ## 👨‍🍳 Gas Stove Method

                1. Step one.
                2. Step two.
                3. Continue until finished.

                ---

                ## 🔥 Oven Method (If Possible)

                1. Preheat the oven to the required temperature.
                2. Explain how to cook the same recipe in an oven.
                3. Mention cooking temperature and cooking time.

                If the recipe genuinely cannot be prepared in an oven, write:

                "This recipe is best prepared on a gas stove."

                ---

                ## 💡 Chef's Tips

                - Tip 1
                - Tip 2

                ---

                ## 🌟 Why You'll Love This Recipe

                Write 2–3 short sentences explaining why this recipe is delicious.

                Rules:
                - Use ONLY the ingredients provided by the user whenever possible.
                - Common pantry items (salt, pepper, oil, butter) are allowed.
                - Adjust ingredient quantities according to the requested serving size.
                - The primary recipe should always be the Gas Stove Method.
                - Also provide an Oven Method whenever it is realistically possible.
                - Include oven temperature (°C/°F) and cooking time.
                - Never make the oven method the primary method.
                - Keep instructions simple and beginner-friendly.
                - Use proper Markdown headings and bullet points.`,
            },
            {
              role: "user",
              content: `
                Available ingredients:
                ${ingredients.join(", ")}

                Generate a recipe for exactly ${serves} people.

                Requirements:
                - Make the Gas Stove Method the primary cooking method.
                - Also provide an Oven Method whenever possible.
                - If the recipe cannot be made in an oven, clearly mention that it is best prepared on a gas stove.
                - Scale ingredient quantities for ${serves} servings.
                `,
            },
          ],
        }),
      },
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
