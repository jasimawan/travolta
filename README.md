### Travolta: Apartments Booking App

## Technology Used
  ### Frontend
  - React 18
  - Typescript
  - Vite
  - SWR for API Calling
  - MUI-5
  ### Backend
  - Node Express
  - Typescript
  - Jest & supertest
  - memory-cache for caching

## How to run the App Locally
  - Clone the repo
  - Open it with the editor of your choice
  - Your node version should be greater or equal to 18, You can use `nvm` or `n` as a node-manager as well
  - Navigate to frontend in one terminal/shall window
  - Navigate to backend in other terminal/shall window
  - Run `yarn` on both windows separately
  - Add `.env` files in both frontend & backend with the help of `.env.example` files.
  - Get your Airbnb secrets from Rapid API: https://rapidapi.com/3b-data-3b-data-default/api/airbnb13
  - In the fronted `.env` file, add `REACT_BACKEND_URL="http://localhost:3000"`
  - Finally run `yarn start` in backend & `yarn dev` in frontend
  - Voila, you will be able to run and us the app in the browser.
