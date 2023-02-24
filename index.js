// Importeer express uit de node_modules map
import express, { json, response } from "express";

const url = "https://whois.fdnd.nl/api/v1/squad/";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", function (req, res) {
  let slug = req.query.squad || "squad-b-2022";
  let orderBy = req.query.orderBy || "name";
  let squadUrl = url + slug + "?orderBy=" + orderBy + "&direction=ASC";

  fetchJson(squadUrl).then((data) => {
    data.squad.members.forEach(function (member) {
      if (!member.githubRepositories) {
        member.githubRepositories = Math.floor(Math.random() * 20);
      }
    });

    // res.send('Hello World!')
    res.render("index", data);
  });
});


// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

let Object = {
  name: "name",
  birthday: "may",
  secondObject: {
    first: "1",
    second: "2" 
  }
}

const kaas = JSON.stringify(Object);
const convertedJson = JSON.parse(kaas)
console.log(kaas);