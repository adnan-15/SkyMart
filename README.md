# SkyMart 🛍️

A modern e-commerce web application built with **React** and **Tailwind
CSS**, designed to provide a clean, responsive shopping experience.

🌐 **Live Demo:** https://skymart-d6ss.onrender.com/\
💻 **GitHub Repository:** https://github.com/adnan-15/SkyMart

## Overview

SkyMart is a front-end e-commerce project focused on reusable React
components, responsive UI, product browsing, and authentication-related
flows. The interface uses a dark theme with neon-lime accents for
consistent branding.

## Features

-   **Authentication UI:** Login and registration pages.
-   **Product browsing:** Product listing UI powered by API requests.
-   **Product details:** Product overview navigation.
-   **Shopping cart UI:** Add products to the cart and open the cart
    panel.
-   **Category-based browsing:** Organize and filter products by
    category where supported by the API.
-   **Reusable components:** Shared components such as the navbar,
    product cards, and layout.
-   **Responsive interface:** Tailwind CSS styling for different screen
    sizes.
-   **User feedback:** Toast notifications for actions and messages.
-   **Client-side navigation:** Route-based page navigation.
-   **API requests:** Axios for communicating with the product API.

> Features may depend on the API and current project configuration.

## Tech Stack

-   **React**
-   **JavaScript**
-   **Tailwind CSS**
-   **Axios**
-   **React Router**
-   **React Hook Form**
-   **Context API** for shared authentication/application state
-   **React Hot Toast** for toast notifications

## Getting Started

### Prerequisites

-   Node.js and npm installed
-   Access to the API used by the project, if running API-powered
    features

### Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/adnan-15/SkyMart.git
    ```

2.  Open the project directory:

    ``` bash
    cd SkyMart
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Configure the API base URL in the project's Axios configuration, if
    required.

5.  Start the development server:

    ``` bash
    npm run dev
    ```

6.  Open the local URL shown in your terminal.

## Project Structure

The exact structure may evolve, but the project is organized around
common React application areas:

``` text
SkyMart/
├── public/          # Static assets, including branding
├── src/
│   ├── components/  # Reusable UI components
│   ├── context/     # Shared application/authentication state
│   ├── pages/       # Route-level pages
│   └── ...          # API configuration and supporting files
├── index.html
├── package.json
└── README.md
```

## Branding

SkyMart uses a dark interface with neon-lime accents (`#c8f400`) and the
**SkyMart** wordmark.

## What I Practiced

-   Building reusable components with React
-   Managing shared state with Context API and React hooks
-   Handling forms and user feedback
-   Fetching data with Axios
-   Creating responsive layouts with Tailwind CSS
-   Organizing pages and navigation in a React project

## Future Improvements

-   Add more robust loading, empty, and error states
-   Improve accessibility and keyboard navigation
-   Add automated tests
-   Refine performance and production deployment configuration

## Links

-   **Live Demo:** https://skymart-d6ss.onrender.com/
-   **GitHub Repository:** https://github.com/adnan-15/SkyMart

## Author

**Adnan Khan**

Built as a hands-on project to practice modern React development and
e-commerce UI implementation.
