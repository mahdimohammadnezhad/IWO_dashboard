# Run, Build, and Deploy Guide

This project is a Create React App (`react-scripts`) application.

## Prerequisites
- Node.js 16+ (Node 18 LTS recommended)
- npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

## 1) Install Dependencies
From the project root:

```bash
npm install
```

## 2) Run Locally (Development)
Start the dev server:

```bash
npm start
```

- App runs at: `http://localhost:3000`
- Hot reload is enabled

## 3) Run Tests
```bash
npm test
```

## 4) Build for Production
```bash
npm run build
```

This creates an optimized production bundle in the `build/` folder.

## 5) Serve Production Build Locally (Optional Check)
Install a static server (one-time):

```bash
npm install -g serve
```

Serve the build output:

```bash
serve -s build
```

## 6) Deployment Options

### Option A: Netlify
- Build command: `npm run build`
- Publish directory: `build`

### Option B: Vercel
- Framework preset: `Create React App`
- Build command: `npm run build`
- Output directory: `build`

### Option C: GitHub Pages
1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add this to `package.json` (replace with your repo URL):

```json
"homepage": "https://<username>.github.io/<repo-name>"
```

3. Add scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:

```bash
npm run deploy
```

### Option D: Your own server (Nginx/Apache)
- Run `npm run build`
- Copy contents of `build/` to your web server root
- Configure server to serve `index.html` for unknown routes if you add client-side routing

## 7) Available npm Scripts
Defined in `package.json`:
- `npm start` -> `react-scripts start`
- `npm run build` -> `react-scripts build`
- `npm test` -> `react-scripts test`
- `npm run eject` -> `react-scripts eject` (irreversible)

## Notes
- Keep `npm run eject` as a last resort.
- For CI/CD, a standard pipeline is: install -> test -> build -> deploy `build/`.
