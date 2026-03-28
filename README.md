# 📚 AI Study Planner — Notion MCP Challenge

> AI-powered study planner that generates personalized day-by-day study schedules and automatically syncs them to Notion using Notion MCP.

![AI Study Planner](https://img.shields.io/badge/Notion-MCP-black?style=for-the-badge&logo=notion)
![Groq AI](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=nodedotjs)

---

## 🎯 What it does

Students enter their exam name, number of study days, hours per day, and exam date. The AI (Groq LLaMA 3.3) generates a smart, topic-by-topic study plan and automatically pushes it to a Notion database using Notion MCP — creating structured pages with dates, subjects, and descriptions.

---

## ✨ Features

- 🤖 AI generates intelligent study topics using Groq LLaMA 3.3
- 📓 Auto-syncs to Notion via Notion MCP
- 📅 Day-by-day schedule with dates
- ⏰ Hours per day tracking
- 🎯 Exam date planning
- 🌙 Beautiful dark UI

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Groq AI (LLaMA 3.3) | Generate study plan topics |
| Notion MCP | Write tasks to Notion database |
| Node.js + Express | Backend server |
| HTML/CSS/JS | Frontend UI |

---

## 🚀 How to Run

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/ai-study-planner.git
cd ai-study-planner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Fill in your API keys in `.env`:
- `NOTION_API_KEY` — from developers.notion.com
- `DATABASE_ID` — your Notion database ID
- `GROQ_API_KEY` — from console.groq.com

### 4. Run the server
```bash
node server.js
```

### 5. Open the app
Open `index.html` in your browser and generate your study plan!

---

## 📸 How Notion MCP is Used

This project uses **Notion MCP** (Notion's API platform) to:
1. Connect to a Notion workspace database
2. Automatically create structured pages for each study day
3. Fill in Task, Date, Exam Date, Hours, and Subject columns
4. Each page contains AI-generated study descriptions

---

## 🏆 Built for Notion MCP Challenge

- **Challenge:** Notion MCP Challenge by Dev Community x MLH
- **Category:** AI + Productivity
- **Prize Pool:** $1,500

---

## 👨‍💻 Author

**Sarvesh M** — Built with ❤️ from India 🇮🇳
