# 🍴 Forkify — Modern JavaScript Application

![JavaScript](https://img.shields.io/badge/javascript-ES6%2B-yellow?style=for-the-badge\&logo=javascript)
![MVC](https://img.shields.io/badge/architecture-MVC-blue?style=for-the-badge)
![Parcel](https://img.shields.io/badge/parcel-bundler-blueviolet?style=for-the-badge)
![API](https://img.shields.io/badge/API-REST-green?style=for-the-badge)
![Async](https://img.shields.io/badge/async-await-orange?style=for-the-badge)

A modern recipe application built with vanilla JavaScript using an MVC-inspired architecture, asynchronous data fetching, and modular development practices.

> **Note:** This project is part of my progression through "The Complete JavaScript Course" by Jonas Schmedtmann.
> In this section, I focus on applying modern JavaScript concepts into a larger real-world project called **Forkify**.

---

## ✨ Features

* 🔎 Search recipes from external API
* 📄 Display detailed recipe information
* ⏱ Update servings dynamically
* 🔖 Bookmark favorite recipes
* ➕ Upload custom recipes
* ♻️ Modular and scalable architecture
* ⚡ Asynchronous API communication using `async/await`
* 📦 Parcel bundler integration
* 💾 Persistent bookmarks using local storage

---

## 🧠 What I Learned

This project helped me connect many modern JavaScript concepts into one complete application:

1. **MVC Architecture**

   * Separating logic into Model, View, and Controller layers.

2. **Asynchronous JavaScript**

   * Working with APIs using `fetch`
   * Using `async/await`
   * Handling errors gracefully

3. **State Management**

   * Managing application state centrally.

4. **Modular JavaScript**

   * Organizing code with ES6 modules.

5. **Rendering UI Dynamically**

   * Updating DOM efficiently based on application state.

6. **Working with External APIs**

   * Sending and receiving data from REST APIs.

7. **Modern Development Workflow**

   * Using Parcel for bundling and development tooling.

---

## 📁 Project Structure

```bash
/src
  ├── js
  │   ├── controller.js
  │   ├── model.js
  │   ├── config.js
  │   └── views
  │       ├── recipeView.js
  │       ├── searchView.js
  │       ├── resultsView.js
  │       ├── bookmarksView.js
  │       └── paginationView.js
  ├── sass
  └── img

/dist
index.html
```

---

## 🚀 How to Run Locally

1. Clone this repository:

```bash
git clone https://github.com/fahri238/complete-js-forkify.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm start
```

4. Build for production:

```bash
npm run build
```

---

## 🎯 Goals

* Build a complete real-world JavaScript application
* Practice clean architecture and separation of concerns
* Improve understanding of asynchronous JavaScript
* Apply modular programming concepts
* Learn scalable frontend project structure

---

## 🧠 Personal Notes

This section feels like a major turning point in my JavaScript journey.

Instead of learning isolated concepts, this project combines:

* asynchronous JavaScript,
* architecture patterns,
* modules,
* state management,
* and UI rendering

into a single cohesive application.

Forkify helped me better understand how real frontend applications are structured and maintained.

---

## 🙌 Acknowledgment

Huge thanks to Jonas Schmedtmann for creating one of the most practical and structured JavaScript courses available.
