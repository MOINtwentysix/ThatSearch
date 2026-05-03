# ThatSearch 🔍

> **The Smart Search Engine for Students**  
> Built with HTML, CSS, JavaScript and powered by [Zyte](https://www.zyte.com/) for web crawling.

---

## Features

| Feature | Description |
|---|---|
| 🔍 **Smart Search** | Full-text search with instant results |
| ✨ **Text Highlighting** | Every search term is highlighted in results |
| 🧮 **Built-in Calculator** | Type a math expression to get an instant answer |
| 📖 **Info Cards** | Quick fact cards for people, events, and concepts |
| 🌙 **Dark Mode** | Automatic + manual dark mode toggle |
| 💡 **Autocomplete** | Suggestions as you type |

---

## Project Structure

```
ThatSearch/
├── index.html          # Homepage
├── search.html         # Search results page
│
├── css/
│   └── style.css       # All styles (CSS variables, responsive, dark mode)
│
├── js/
│   ├── data.js         # Knowledge base + mock results
│   ├── main.js         # Homepage logic (autocomplete, dark mode)
│   └── search.js       # Results logic (highlighting, calculator, info cards)
│
└── backend/            # Node.js backend (optional – connects to Zyte)
    ├── server.js       # Express API server
    ├── zyte.js         # Zyte API helper
    ├── package.json    # Backend dependencies
    └── .env.example    # Environment variable template
```

---

## Quick Start (Frontend only)

No build step required – just open the HTML files in a browser:

```bash
# Clone the repo
git clone https://github.com/ThatDev13/ThatSearch.git
cd ThatSearch

# Open directly in browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or use a simple local server (recommended for development):

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# Then visit http://localhost:8080
```

---

## Backend & Zyte Integration

The backend (`backend/`) is a Node.js/Express server that connects to the **Zyte Data Extraction API** to crawl web pages and build a search index.

### 1. Get a Zyte API Key

1. Sign up at **https://app.zyte.com**
2. Go to **Settings → API Key**
3. Copy your API key

### 2. Configure the Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
ZYTE_API_KEY=your_api_key_here
PORT=3001
```

### 3. Install Dependencies & Start

```bash
cd backend
npm install
npm start
```

The server runs on `http://localhost:3001`.

### 4. API Endpoints

#### Search

```
GET /api/search?q=photosynthesis&page=1
```

Response:
```json
{
  "query": "photosynthesis",
  "total": 3,
  "page": 1,
  "results": [
    {
      "url": "https://...",
      "title": "Photosynthesis Explained",
      "snippet": "...",
      "date": "2024-01-15"
    }
  ]
}
```

#### Crawl a URL

```
POST /api/crawl
Content-Type: application/json

{ "url": "https://example.com/photosynthesis-article" }
```

Response:
```json
{
  "message": "Page indexed successfully.",
  "url": "https://example.com/photosynthesis-article",
  "title": "Photosynthesis – The Complete Guide",
  "snippet": "Photosynthesis is the process..."
}
```

#### View Index

```
GET /api/index
```

### 5. Connect Frontend to Real Backend

In `js/data.js`, update `lookupResults` to call your backend:

```javascript
async function lookupResults(query) {
  // Replace with your backend URL
  const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results.length ? data.results : generateFallbackResults(query);
}
```

> **Note:** In production, deploy the backend to a server (e.g. Heroku, Railway, Render) and update the URL accordingly.

### How Zyte Works in This App

```
Browser                   Backend (Node.js)               Zyte API
  │                             │                             │
  │  GET /api/search?q=...      │                             │
  │─────────────────────────────▶                             │
  │                             │                             │
  │                        search index                       │
  │◀─────────────────────────────                             │
  │                             │                             │
  │  POST /api/crawl {url}      │                             │
  │─────────────────────────────▶                             │
  │                             │  POST /v1/extract {url}     │
  │                             │────────────────────────────▶│
  │                             │  ← HTML content             │
  │                             │◀────────────────────────────│
  │                             │  parse + index              │
  │  ← { title, snippet }       │                             │
  │◀─────────────────────────────                             │
```

---

## Calculator

Type any math expression directly in the search bar:

| Input | Result |
|---|---|
| `2 + 3 * 4` | `14` |
| `sqrt(144)` | `12` |
| `(10 + 5) / 3` | `5` |
| `2^10` | `1024` |
| `15 % 4` | `3` |

The calculator widget also supports direct keyboard input when it is visible.

---

## Info Cards

Searching for any of these shows an info card:

- **People:** Albert Einstein, Isaac Newton, Marie Curie, Charles Darwin, Nikola Tesla, William Shakespeare
- **Concepts:** Photosynthesis, Pythagorean Theorem, DNA, Solar System, Climate Change
- **Events:** French Revolution, World War 2
- **Places:** Germany, France

---

## License

MIT © 2024 ThatSearch