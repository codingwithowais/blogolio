# 📰 Blogolio – Your Personal Blogging Portfolio

![Blogolio Banner](https://blogolio-app.netlify.app/favicon.png)

**Blogolio** is a full-stack, responsive blogging platform built with **React**, **Vite**, and **Appwrite**. It allows users to create, edit, and manage their blogs with a rich text editor — all in a beautiful and intuitive interface.

> 🔗 [Live Demo](https://blogolio-app.netlify.app)

---

## 🚀 Features

- 🔐 User Authentication (Sign Up, Login, Logout)
- ✍️ Rich Text Editor for blog creation (TinyMCE)
- 📃 Public blog listings with SEO-friendly slugs
- 🖼️ Image upload support via Appwrite Storage
- 🌐 Responsive design for all screen sizes
- 💌 Password reset functionality (email-based)
- 🔒 Protected routes with route guards
- 🧑‍💻 Clean code and modular structure

---

## 🛠️ Tech Stack

| Frontend     | Backend / Auth / DB     | Deployment        |
|--------------|--------------------------|--------------------|
| React + Vite | Appwrite (Auth, DB, RTE) | Netlify (Frontend) |
| TailwindCSS  | Appwrite Functions       | GitHub (Version Control) |
| TinyMCE RTE  | CORS-configured endpoints |                    |

---

## 📸 Screenshots

<!-- Replace below with real links if you have screenshots -->
| Home Page | Create Post | 
|----------|-------------|
| ![home](https://blogolio-app.netlify.app/home.png) | ![create](https://blogolio-app.netlify.app/create.png) | 

---

## 🔧 Local Setup Instructions


# 1. Clone the repository
git clone https://github.com/codingwithowais/blogolio.git
cd blogolio

# 2. Install dependencies
npm install

# 3. Create a .env file and configure:
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_POST_COLLECTION_ID=your_collection_id
VITE_APPWRITE_COMMENT_COLLECTION_ID = your_comment_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id


# 4. Start the dev server
npm run dev


---

## 🌍 Live Project

> 🚀 [https://blogolio-app.netlify.app](https://blogolio-app.netlify.app)

---

## 🧠 Folder Structure
```bash
src/
│
├── components/ → Reusable UI components
├── store/ → Redux Toolkit setup
├── pages/ → Route-based views (Login, Signup, All Posts, Post, etc.)
├── services/ → Appwrite service abstraction
├── App.jsx → Main application component
└── main.jsx → ReactDOM bootstrap
```

## 📧 Contact

Made with 💙 by **Owais**  
📬 [LinkedIn](https://www.linkedin.com/in/your-profile)  
📂 [GitHub](https://github.com/codingwithowais)  

---

## 🏷️ License

This project is licensed under the **MIT License** – feel free to use, fork, or contribute!