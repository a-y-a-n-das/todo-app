# Todo App

A minimal full-stack Todo application with a modern UI, theme toggle, and a simple Express backend storing todos in memory.

## Features
- Add new todos
- Mark complete/undo
- Delete todos
- Light/Dark theme toggle (respects system theme by default)
- Modern, responsive UI

## Tech Stack
- Backend: Node.js + Express
- Frontend: Vanilla HTML/CSS/JS

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the server
```bash
npm start
```
The server starts on `http://localhost:3000`.

### 3) Open the frontend
Open `public/index.html` in your browser (double-click or via a live server extension). The frontend is not served by Express by default.

Optionally, to serve the frontend via Express, add this to `server.js`:
```js
app.use(express.static('public'))
```
Then open `http://localhost:3000/index.html`.

## API
Base URL: `http://localhost:3000/api/todos`

- GET `/` — List todos
  - Response: `[{ id, text, completed }]`
- POST `/` — Create todo
  - Body: `{ text: string }`
  - Response: `{ message, todo }`
- PATCH `/` — Toggle complete
  - Body: `{ idToComplete: number }`
  - Response: `{ message }`
- DELETE `/` — Delete todo
  - Body: `{ idToDelete: number }`
  - Response: `{ message }`

Note: Data is stored in-memory and resets when the server restarts.

## Scripts
- `npm start` — run the server with nodemon

## Project Structure
```
.
├─ controllers/
│  └─ todocontrollers.js    # Handlers for CRUD actions (in-memory store)
├─ routes/
│  └─ todoroutes.js         # Express routes
├─ public/
│  ├─ index.html            # UI markup
│  ├─ styles.css            # Modern styling + theme toggle
│  └─ script.js             # Frontend logic (fetch + render)
└─ server.js                # Express app entry
```

## Troubleshooting
- If requests fail due to JSON parsing, replace body-parser with native Express JSON:
  ```js
  app.use(express.json())
  ```
- On case-sensitive systems, ensure import paths match file names exactly. For example, `todoRoutes` vs `todoroutes.js`, `todoControllers` vs `todocontrollers.js`.

## License
MIT


