const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EVENTOS_FILE = "eventos.json";

const users = {
  contares: "Contares",
  pavotroton: "ElPavoTroton",
  jacaranda: "Jacaranda"
};

// Obtener eventos
app.get("/eventos", (req, res) => {
  const data = fs.existsSync(EVENTOS_FILE) ? fs.readFileSync(EVENTOS_FILE) : "[]";
  res.json(JSON.parse(data));
});

// Agregar evento
app.post("/eventos", (req, res) => {
  const { username, title, date } = req.body;
  if (!users[username]) return res.status(401).send("Usuario no autorizado");

  const eventos = fs.existsSync(EVENTOS_FILE) ? JSON.parse(fs.readFileSync(EVENTOS_FILE)) : [];
  eventos.push({ title, start: date, association: users[username] });
  fs.writeFileSync(EVENTOS_FILE, JSON.stringify(eventos, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
