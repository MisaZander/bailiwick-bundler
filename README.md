# The Bailiwick Bundler
Can you fill out a form? Good! Now you can start your own website.

## Description
The Internet is a big world, and navigating it is confusing enough as it is. Why make things more confusing trying
to figure out how to establish a prescence within it? Designed with the on-the-go freelancer in mind, the BB only 
asks of you to fill out a few forms with what you want the pages to read, and it handles the rest. No more negotiating
with a middleman or struggling with code to keep your content up-to-date, the BB allows you to add and remove content with ease
as your freelancing portfolio expands. Perfect for those who want a free and speedy solution to establishing a web prescence.

See the live demo: https://bailiwick-bundler-zs.herokuapp.com/

## Software Requirements
Deveopment and production builds of this app require the server to use NodeJS. You must also have access to a MongoDB server (locally or remotely).

- NPM/NodeJS on the machine running the app
- Access to a MongoDB server (local or remote)

## Getting Started
1. Use the `git clone` command to obtain a copy of this repo.
2. `cd` into the new repo from a shell of your choice.
3. Run `npm install` or `yarn install` (depending on your preference) to install dependencies. This will also install the 
client dependencies as well.
4. The MongoURI and SECRETORKEY environment variables must be set for the app to function. If your web server has an interface
to set those, continue to step 5. Otherwise, skip to step 6 to create a .env file.
5. If you can set the environment variables over an interface, set the `MONGODB_DB` value to the URL of your MongoDB database.
Then set the `SECRETORKEY` to any value of your choice, and keep it secret from others. Skip to step 7.
6. If the server does not have an interface to set those, you must create a `.env` file in the project root. You can use
the `.envEX` file as a base template. Run `cp .envEX .env` to copy it. Open `.env` in a text editor and change the
`MONGOURI` value to the URL of your Mongo instance, and `SECRETORKEY` to a nonsense value of your choice.
7. Run `npm start` to start the development servers.
8. If this is your first run and the MongoDB database is bare, some content and an admin user will be seeded.

## Basic Usage
1. On the first run, the admin user will be created. Go to the login page and login with credentials "admin@admin.com" and password "password".
2. You should immediately edit the credentials of the admin profile to your. Click the name "Admin" up top to go to the edit profile page. Replace the name, email, and password to new credentials and save.
3. Click the logo in the upper left at any point and page to go back home. Click around and checkout the basic look and feel of the site.
4. While logged in as the site owner, the control panel link will be visible in the navbar. Click this to be presented with options
to alter the public facing content.
5. New users who register and login will only have basic access and not see the control panel option. Users who try to access the back-end without the proper authority are kicked back to the login page or given a 403.
