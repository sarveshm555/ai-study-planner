require("dotenv").config();
const express = require("express");
const { Client } = require("@notionhq/client");
const Groq = require("groq-sdk");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DATABASE_ID = process.env.DATABASE_ID;

app.post("/add-task", async (req, res) => {
    const { subject, days, hours, examDate } = req.body;

    try {
        // 🤖 Ask AI to generate study plan
        console.log("Asking AI to generate study plan...");
        const aiResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `Create a ${days}-day study plan for ${subject}.
          Return ONLY a JSON array like this, nothing else:
          [
            {"day": 1, "topic": "Topic Name", "description": "What to study today"},
            {"day": 2, "topic": "Topic Name", "description": "What to study today"}
          ]`
                }
            ]
        });

        // Parse AI response
        const planText = aiResponse.choices[0].message.content;
        const cleanJson = planText.replace(/```json|```/g, "").trim();
        const studyPlan = JSON.parse(cleanJson);

        // 📓 Add each day to Notion
        console.log("Adding to Notion...");
        for (const item of studyPlan) {
            const taskDate = new Date();
            taskDate.setDate(taskDate.getDate() + item.day - 1);

            await notion.pages.create({
                parent: { database_id: DATABASE_ID },
                properties: {
                    Task: {
                        title: [{ text: { content: `Day ${item.day}: ${item.topic}` } }]
                    },
                    Date: {
                        date: { start: taskDate.toISOString().split("T")[0] }
                    },
                    "Exam Date": {
                        date: { start: examDate || taskDate.toISOString().split("T")[0] }
                    },
                    Hours: {
                        number: parseInt(hours) || 2
                    },
                    Subject: {
                        rich_text: [{ text: { content: subject } }]
                    }
                },
                children: [
                    {
                        object: "block",
                        type: "paragraph",
                        paragraph: {
                            rich_text: [{ type: "text", text: { content: item.description } }]
                        }
                    }
                ]
            });
        }

        res.json({
            message: `✅ ${studyPlan.length} days added to Notion!`,
            plan: studyPlan
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error: " + error.message });
    }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));