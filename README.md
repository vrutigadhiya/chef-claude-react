# 🍳 Chef Claude – AI Recipe Generator

> **Chef Claude** is an AI-powered recipe generator built with **React**. Simply add the ingredients you have, and the application generates a delicious, well-formatted recipe using AI.

---

## ✨ Features

* 🥕 Add ingredients dynamically
* 🗑️ Remove ingredients individually
* 🚫 Prevent duplicate and empty submissions
* 👨‍🍳 Select serving size (1, 2, 4, or 6 people)
* 🤖 Generate recipes using **Groq AI (Llama 3.1)**
* 🥗 Automatically keeps recipes vegetarian unless non-vegetarian ingredients are provided
* 📋 Copy generated recipes to the clipboard
* 🖼️ Export recipes as an image
* 📄 Download recipes as a PDF
* 📝 Beautiful Markdown rendering
* 📱 Fully responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend             | Libraries       |
| -------------------- | --------------- |
| ⚛️ React (Vite)      | React Markdown  |
| 💻 JavaScript (ES6+) | Tailwind CSS v4 |
|                      | html2canvas     |
|                      | react-to-print  |
|                      | lucide-react    |

---

## 📖 What I Learned

* ✅ Integrating AI APIs into a React application
* ✅ Prompt engineering for better AI responses
* ✅ Rendering Markdown safely in React
* ✅ Managing asynchronous state, loading, and error handling
* ✅ Building responsive UI with Tailwind CSS
* ✅ Dynamic form handling and ingredient management
* ✅ Preventing duplicate and empty inputs
* ✅ Using the Clipboard API
* ✅ Exporting content as images and PDFs
* ✅ Creating reusable React components

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18 or later

### Clone the repository

```bash
git clone https://github.com/vrutigadhiya/chef-claude.git
cd chef-claude
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Visit the application at:

```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
chef-claude/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```
