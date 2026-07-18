# 🍳 Chef Claude - AI Recipe Generator

Chef Claude is a modern AI-powered recipe generator built with **React**, **Vercel Serverless Functions**, and **Groq AI (Llama 3.3 70B)**. Simply enter the ingredients you have at home, choose the number of servings, and Chef Claude instantly creates a delicious recipe complete with cooking instructions, preparation time, chef's tips, and both gas stove and oven cooking methods.

---

## ✨ Live Demo

🔗 https://chef-claude-react-psi.vercel.app/


# 🚀 Features

### 🥗 Ingredient Management

- ➕ Add ingredients
- ❌ Remove ingredients
- 🚫 Prevent duplicate ingredients
- ✅ Minimum 4 ingredients required
- 🔍 Clean ingredient list

---

### 👨‍🍳 AI Recipe Generation

Powered by **Groq AI (Llama 3.3 70B)**

Generates:

- 🍽 Recipe Name
- ⏱ Prep Time
- 🔥 Cook Time
- 👨‍👩‍👧 Servings
- 🛒 Ingredients List
- 👨‍🍳 Step-by-step Instructions
- 🍳 Gas Stove Method
- 🔥 Alternative Oven Method
- 💡 Chef's Tips
- 🌟 Why You'll Love This Recipe

---

### 🍽 Serving Size

Choose how many people the recipe should serve.

Examples:

- 1 Person
- 2 People
- 4 People
- 6 People
- 8 People

Chef Claude automatically scales the recipe.

---

### 📄 Export Options

- 📋 Copy Recipe
- 🖼 Download as Image
- 📄 Download as PDF

---

### 📱 Responsive Design

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js, JavaScript (ES6+), HTML5, CSS3 |
| **AI Model** | Groq API, Llama 3.3 70B Versatile |
| **Markdown Rendering** | React Markdown, Remark GFM |
| **Export Features** | HTML2Canvas, React-to-Print |
| **Icons** | Lucide React |
| **Backend** | Vercel Serverless Functions (Node.js) |
| **Package Manager** | npm |
| **Deployment** | Vercel |
| **Version Control** | Git & GitHub |
| **Development Tools** | Visual Studio Code, Vite |
# 📂 Folder Structure

```
chef-claude
│
├── api
│   └── groq-recipe.js
│
├── public
│
├── src
│   ├── components
│   │
│   ├── ClaudeRecipe
│   ├── IngredientsList
│   ├── Header
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/vrutigadhiya/chef-claude-react.git
```

Go inside the project

```bash
cd chef-claude-react
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env.local` file

```env
GROQ_API_KEY=your_groq_api_key
```

# 📦 Required Packages

```bash
npm install react-markdown
npm install remark-gfm
npm install html2canvas
npm install react-to-print
npm install lucide-react
```

Or install everything together

```bash
npm install react-markdown remark-gfm html2canvas react-to-print lucide-react
```

---

# 🧠 How It Works

1. User enters ingredients.
2. Duplicate ingredients are prevented.
3. User selects the number of servings.
4. Clicks **Get Recipe**.
5. React sends ingredients to the Vercel API.
6. Serverless function securely calls the Groq API.
7. Groq AI generates a structured recipe.
8. Recipe is rendered using Markdown.
9. User can copy, download as PDF, or save as an image.

---

# 🔒 Security

- API Key stored securely in Vercel Environment Variables.
- API requests handled through a serverless backend.
- No API key is exposed to the frontend.

---

# 🎯 Future Improvements

- ❤️ Favorite Recipes
- 📚 Recipe History
- 🌙 Dark Mode
- 🌍 Multi-language Support
- 🛒 Grocery List Generator
- 🥦 Dietary Preferences (Veg, Vegan, Gluten-Free)
- 🎤 Voice Input
- 📸 Ingredient Image Recognition
- 🍱 Nutrition Information
- 📱 PWA Support

---
