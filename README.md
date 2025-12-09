<div align="center">
  <h1="center">NextJS Authentication Application</h1>
</div>

![Home page](./public/screenshots/home.png)
![Register page](./public/screenshots/register.png)
![Login page](./public/screenshots/login.png)
![Dashboard](./public/screenshots/dashoboard.png)
![Settings Tab](./public/screenshots/setting.png)
![Delete Modal](./public/screenshots/delete.png)

### The NextJS Authentication App is a full-stack authentication solution developed as part of modern web security implementation, featuring secure user authentication, JWT-based session management, and protected route enforcement.

### This project demonstrates advanced NextJS patterns with server-side rendering, API route organization, and responsive UI components built with Tailwind CSS. The architecture emphasizes security with bcrypt password hashing, middleware-based authorization, and comprehensive form validation, while maintaining scalability through modular service layers and reusable React hooks.

### The application provides a production-ready authentication foundation suitable for enterprise applications, showcasing robust error handling, and state management with Redux.

- [![Next JS][Next.js]][Next-url]
- [![TailwindCss][TailwindCss]][Tailwind-url]
- [![Node][Node.js]][Node-url]
- [![Express][Express.js]][Express.js-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Sequelize][Sequelize]][Sequelize-url]

## Getting started

### Prerequisites

- node.js: [Node.js download page](https://nodejs.org/en/download)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/CharakaJith/next-authentication-app.git
   ```
2. Step into the project
   ```bash
   cd next-authentication-app
   ```

### Environment variables setup

#### Server side

1. Create a `.env.dev` file in root folder
   ```
   New-Item -Path . -Name ".env.dev" -ItemType "File"
   ```
2. Open the `.env.dev` file and update the variables

   ```
   ## environment variables
   ENV=development
   PORT=8000 (make sure the port is set to 8000 for the development)

   ## database configurations
   PG_USER=<database user>
   PG_PASSWORD=<user password>
   PG_HOST=<database host>
   PG_DATABASE=<database name>
   PG_MAXCONN=150

   ## jwt secrets
   ACCESS_TOKEN_SECRET=<secure random string>
   REFRESH_TOKEN_SECRET=<secure random string>

   ## front-end url
   FRONTEND_URL=http://localhost:3000
   ```

#### Notes

- **For JWT secrets:** The <secure random string> values for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` should be generated securely, for example using crypto.randomBytes in Node.js or a trusted online generator.

### Start the project using terminal

1. Install NPM packages
   ```bash
   npm run install:all
   ```
2. Create database tables
   ```bash
   npm run migrate:dev
   ```
3. Start the server and client
   ```bash
   npm run start
   ```

### Other scripts

1. Start the development server
   ```bash
   npm run dev
   ```
2. Start the client
   ```bash
   npm run client
   ```
3. Undo the last migration
   ```
   npm run migrate:dev:down
   ```
4. Undo all migrations
   ```
   npm run migrate:dev:down:all
   ```

### Declaration

- This project, including all source code and documentation, was developed by me as part of my Next.js skill demonstration to showcase modern full-stack development capabilities.
- Product descriptions and documentation were reviewed and refined using ChatGPT to ensure proper grammar, clarity, and professional English.
- ChatGPT was used as a guidance for UI component styling (CSS) and layout decisions. All backend functionality, including API implementation, database interactions, and business logic, as well as the thought process was independently concluded by the author.

## Contact

Email: [gunasinghe.info@gmail.com](mailto:gunasinghe.info@gmail.com) | LinkedIn: [Charaka Jith Gunasinghe](https://www.linkedin.com/in/charaka-gunasinghe/)

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[TailwindCss]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-12A952?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
