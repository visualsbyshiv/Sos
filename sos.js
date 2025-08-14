const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let sosData = [];


app.get('/', (req, res) => {
    res.send("Server running on localhost");
});


app.post('/sos', (req, res) => {
    const { name, number, gmail,location } = req.body;

    if (!name || !number || !gmail) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newSOS = { name, number, gmail ,location:location||null, timeStamp: new Date() };
    sosData.push(newSOS);

    console.log("SOS ALERT RECEIVED:");
    console.log("Name:", name);
    console.log("Number:", number);
    console.log("Gmail:", gmail);
     console.log("Location:", location);

    res.json({ message: "SOS Information Received Successfully", data: newSOS });
});

app.get('/sos', (req, res) => {
    res.json(sosData);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://192.168.1.17:3000");
});
