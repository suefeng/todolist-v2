# README

## Setup
If you have `asdf` as your version management for Ruby and NodeJS, make sure you have the tool versions specified in `.tool_versions` by running `asdf install`.

### Backend 
1. In one tab or window, `cd backend`
2. Make sure to set the database credentials in a `.env` by copying `.env.example` and putting in your credentials.
3. Run `bin/setup` to install the gems and setup the database. 
4. Run `./bin/rails s` to start the API server.

### Frontend
1. In another tab or window, `cd frontend`
2. Run `npm install` to install the packages.
3. Run `npm run dev` to start the frontend server.
4. Navigate to [http://localhost:3008](http://localhost:3008) in your browser.