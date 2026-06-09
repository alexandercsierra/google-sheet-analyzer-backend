require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const path = require("path");

const server = express();
const SECRET = process.env.SESSION_SECRET;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const credentials = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../creds.json"), "utf-8")
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

async function getValues(spreadsheetId: string, range: string) {
  const service = google.sheets({ version: "v4", auth });
  const result = await service.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const numRows = result.data.values ? result.data.values.length : 0;
  console.log(`Number of rows: ${numRows}`);
  return result;
}

server.post("/sheetData", async (req: any, res: any) => {
  const { sheet, range } = req.body;
  const sheetStr = `${sheet}!${range}`;

  try {
    const result = await getValues(SHEET_ID!, sheetStr);
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ error: "Failed to fetch sheet data" });
  }
});

server.get("/", async (req: any, res: any) => {
  res.status(200).json({ message: "Welcome to the API" });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
