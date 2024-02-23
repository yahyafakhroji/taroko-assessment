# Contact List CRUD with Next.js

This is a simple CRUD (Create, Read, Update, Delete) application built with Next.js. It provides basic functionality for managing data.

## Technologies Used

- **Next.js v14 (Typescript)**: Next.js is a React framework that enables server-side rendering, static site generation, and more for React-based web applications. 
- **Jotai**: Jotai is a simple and atomic state management library for React. 
- **Tanstack Query**: A JavaScript library for fetching, caching, and synchronizing data in React applications. 
- **React Hot Toast**: React Hot Toast is a minimalistic and flexible toast library for React.
- **Sass**: Sass is a preprocessor scripting language that is interpreted or compiled into CSS.
- **Jest**: A JavaScript testing framework.
- **ESLint**: A pluggable JavaScript linter.
- **Prettier**: An opinionated code formatter.
- **Stylelint**: A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- **Docker**: Docker is a platform for developing, shipping, and running applications using containerization technology.

## Features

- **Create**: Add new contact to the database.
- **Read**: View existing contact in the database.
- **Update**: Modify existing contact in the database.
- **Delete**: Remove contact from the database.
- **Favorite**: Save your favorite contact in the your localstorage.
- **Sort**: Sort contacts by the name.
- **Search**: Search contact by name, job or description of the contact.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Clone `.env.example` to `.env.local` .
3. Install dependencies using `pnpm install`. ([Guide for Setup `pnpm`](https://pnpm.io/installation))
4. Start the development server using `pnpm dev`.
5. Visit `http://localhost:3000` in your browser to view the application.

## Folder Structure

- `/src`: Main Source Folder 
	- `/app`: Contains Next.js app for routing.
	- `/components`: Contains React components used in the application.
	- `/hooks`: Contains hooks function used in the application.
	- `/interfaces`: Contains TypeScript type definitions or interfaces used throughout the application.
	- `/layouts`: Layouts Folder that define the overall structure or layout of different pages within the application.
	- `/states`: Contains state management for managing the application's using Jotai.
	- `/styles`: Contains Global CSS stylesheets for styling the application.
	- `/utils`: Contains utilities function that used in the application. *e.g Generate Initial Name Function*
- `/public`: Contains static assets such as images, fonts, etc.
- `/__tests__`: Contains Unit Testing for check the function of the application.
