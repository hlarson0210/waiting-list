// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Guests at the restaurant 
// =============================================================
var waitlist = [
  {
    routeName: "darthmaul",
    name: "Waitlist",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
];

var seated = [
  {
    routeName: "yoda",
    name: "Seated",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


// Displays all guests in JSON
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.get("/api/seated", function(req, res) {
  return res.json(seated);
});

// Displays a single guest, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newGuest = req.body;

  // Using a RegEx Pattern to remove spaces from newGuest
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newGuest.routeName = newGuest.name.replace(/\s+/g, "").toLowerCase();

  console.log(newGuest);

  characters.push(newGuest);

  res.json(newGuest);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
