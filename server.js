const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "noticiasApi",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

//filtrar pq luego se me olvida
app.get("/noticias", (req, res) => {
    const zona =  req.query.zona ;
    console.log(zona)

    if (!zona) {
        return res.status(500).json({ error: "Debes proporcionar una zona." });
    }

    db.query('SELECT * FROM noticias WHERE zona = ?',
        [zona],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});