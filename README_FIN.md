# NorthGames - An api app

A simple api [website](https://northgames-joshh.herokuapp.com/ "NorthGames a <> app.") to showcase backend development, using TDD techniques.

## Table of Contents

---

-   [About](#About)
-   [Technologies](#tech)
-   [Setup](#setup)
-   [Status](#Status)

### About

This browser application allows you to get information on games and the comments/reviews associated with them. Includes functionality for updating, creating and deleting posts.

### Technologies

-   **Node v17.1.0**
-   **Postgres 8.7.1**

### Setup

To clone database:

<ol>
    <li>Navigate to desired directory.
    <li>Run code below in terminal.
</ol>

    git clone https://github.com/Josh-Human/northgames.git

To install dependencies, navigate inside northgames directory and run:

    npm install

Databases may then be created using:

    npm run setup-dbs

To seed databases two files must be created:<br>

-   **.env.test**

        PGDATABASE=nc_games_test

-   **.env.development**

        PGDATABASE=nc_games

**These files should not be pushed. Ensure they are in .gitignore**.

All Jest tests may be ran using:

    npm test

To only test the main app endpoints use:

        npm test app

### Status

**No known issues.**
