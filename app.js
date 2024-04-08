const express = require("express");
const twig = require("twig");
const initDb = require("./initDb");

const app = express();

app.set("view engine", "twig");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));

initDb().then(() => {
    console.log("La base de données a été initialisée avec succès.");

    app.use(express.static('public'));

    const indexRouter = require("./routes/index");
    app.use("/", indexRouter);

    const weatherRouter = require("./routes/weather");
    app.use("/weather", weatherRouter);
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}).catch(err => {
    console.error(err);
});