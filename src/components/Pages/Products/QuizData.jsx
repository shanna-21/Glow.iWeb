import express, {json} from "express";
const app = express();
app.use(json());

app.post("/api/submit", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.status(200).json({message: "Data received", data});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
