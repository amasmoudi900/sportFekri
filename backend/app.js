// import express module
const express = require("express");
// import bcrypt module
const bcrypt = require("bcrypt");
// import jsonwebtoken module
const jwt = require("jsonwebtoken");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import body-parser module
const bodyParser = require("body-parser");
// import axios module
const axios = require("axios");
// import mongoose module
const mongoose = require("mongoose");
// sportFekriDB => DB name
mongoose.connect("mongodb://127.0.0.1:27017/sportFekriDB");
// Creates an Express application
const app = express();

const authenticate = require("./middelware/authenticate");
// Configure Body-parser
// Send JSON responses
app.use(bodyParser.json());
// Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// avatars=> shortcut
// backend/images => original path
app.use("/avatars", express.static(path.join("backend/images")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },

  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});
// ************** Models Importation ************//
// import match Model
const Match = require("./models/match");
// import player Model
const Player = require("./models/player");
// import User Model
const User = require("./models/user");
// import Team Model
const Team = require("./models/team");

// Simulate DB
let matchesTab = [
  { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: "CA", teamTwo: "EST" },
  { id: 2, scoreOne: 1, scoreTwo: 1, teamOne: "JUV", teamTwo: "ROM" },
  { id: 3, scoreOne: 0, scoreTwo: 7, teamOne: "MUN", teamTwo: "LIv" },
];

// Business Logic : Add Match
app.post("/matches", (req, res) => {
  console.log("Here BL : Add Match");
  // create match var (Type Match) =>
  // var will be saved into matches
  let match = new Match({
    teamOne: req.body.teamOne,
    scoreOne: req.body.scoreOne,
    scoreTwo: req.body.scoreTwo,
    teamTwo: req.body.teamTwo,
  });
  console.log("Here match", match);
  match.save();
  res.json({ message: "Added with success", isAdded: true });
});

// Business Logic : Get All Matches
app.get("/matches", authenticate, (req, res) => {
  console.log("Here BL : Get All Matches");
  Match.find().then((data) => {
    res.json({ matches: data, message: "OK!" });
  });
});

// Business Logic : Edit Match
app.put("/matches", (req, res) => {
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then((editResponse) => {
    if (editResponse.nModified == 1) {
      res.json({ message: "Match edited with success" });
    }
  });
});

// Business Logic : Get Match By ID
app.get("/matches/:id", (req, res) => {
  console.log("Here into BL: Get Match By ID");
  let id = req.params.id;
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ findedMatch: doc });
  });
});

// Business Logic : Delete Match By ID
app.delete("/matches/:id", (req, res) => {
  console.log("Here into BL: Delete Match By ID");
  let id = req.params.id;
  for (let i = 0; i < matchesTab.length; i++) {
    if (matchesTab[i].id == id) {
      matchesTab.splice(i, 1);
      break;
    }
  }
  res.json({ message: `Match N° ${id} is deleted` });
});

//Business lOgic: Search Matches
app.post("/matches/search", (req, res) => {
  console.log("Here into search", req.body);
  let findedMatches = [];
  for (let i = 0; i < matchesTab.length; i++) {
    if (
      matchesTab[i].scoreOne == req.body.scoreOne &&
      matchesTab[i].scoreTwo == req.body.scoreTwo
    ) {
      findedMatches.push(matchesTab[i]);
    }
  }
  res.json({ matches: findedMatches });
});

// Business Logic: Get All Players
app.get("/players", (req, res) => {
  Player.find().then((docs) => {
    res.json({ players: docs });
  });
});

// Business Logic: Add Player
app.post("/players", (req, res) => {
  console.log("Here player", req.body);
  let player = new Player({
    name: req.body.name,
    nbr: req.body.nbr,
    position: req.body.position,
    age: req.body.age,
  });

  player.save();
  res.json({ message: "Player added with success" });
});

// Business Logic : Get Player By Id
app.get("/players/:x", (req, res) => {
  console.log("Here into get player by id", req.params.x);
  Player.findOne({ _id: req.params.x }).then((doc) => {
    res.json({ player: doc });
  });
});

// Business Logic : Signup
app.post(
  "/allUsers/subscription",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    console.log("Here into signup", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: cryptedPwd,
        role: req.body.role,
        avatar: `http://localhost:3000/avatars/${req.file.filename}`,
      });
      user.save((error, doc) => {
        console.log("Here error", error);
        console.log("Here doc", doc);
        if (doc) {
          res.json({ message: "User added with success" });
        } else {
          res.json({ message: "Error" });
        }
      });
    });
  }
);

// Business Logic : Login
// O => Check Email
// 1 => Check PWD
// 2 => Welcome
app.post("/allUsers/signin", (req, res) => {
  let user = req.body;
  let findedUser;
  User.findOne({ email: user.email })
    .then((doc) => {
      findedUser = doc;
      if (!doc) {
        res.json({ message: "0" });
      }
      return bcrypt.compare(user.pwd, doc.pwd);
    })
    .then((pwdResult) => {
      if (!pwdResult) {
        res.json({ message: "1" });
      } else {
        const token = jwt.sign(
          {
            email: findedUser.email,
            userId: findedUser._id,
            userRole: findedUser.role,
          },
          "Testing",
          { expiresIn: "1min" }
        );
        let userToSend = {
          id: findedUser._id,
          firstName: findedUser.firstName,
          lastName: findedUser.lastName,
          role: findedUser.role,
          jwt: token,
          expiresIn: 60,
        };
        res.json({ message: "2", user: userToSend });
      }
    });
});

// Business Logic : Add Team
app.post("/teams", (req, res) => {
  console.log("Here into BL: Add Team", req.body);
  let teamObject = new Team({
    teamName: req.body.name,
    teamOwner: req.body.owner,
    teamStadium: req.body.stadium,
    teamFoundation: req.body.foundation,
  });

  teamObject.save((err, doc) => {
    err ? res.json({ message: "NOK" }) : res.json({ message: "OK" });
  });
});

// Business Logic : Get All Teams
app.get("/teams", (req, res) => {
  console.log("Here into BL: Get ALL teams");
  Team.find().then((objs) => {
    res.json({ teams: objs });
  });
});

// Business Logic: Delete Team By ID
app.delete("/teams/:id", (req, res) => {
  let teamId = req.params.id;
  console.log("Here into Delete By ID", teamId);
  Team.deleteOne({ _id: teamId }).then((deleteResponse) => {
    console.log("deleteResponse", deleteResponse);
    if (deleteResponse.deletedCount == 1) {
      res.json({ message: "Team deleted with success" });
    }
  });
});

// Business Logic: Get Team Info
app.get("/teams/:myId", (req, res) => {
  console.log("Here id", req.params.myId);
  Team.findOne({ _id: req.params.myId }).then((doc) => {
    res.json({ team: doc });
  });
});

// Business Logic: Search Weather
app.post("/weather", (req, res) => {
  console.log("Here into BL weather: ", req.body);
  let city = req.body.city;
  let key = "62ee756a34835483299877a61961cafb";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  axios.get(apiURL).then((apiResponse) => {
    console.log("Here apiResponse", apiResponse.data);
    let result = {
      temperature: apiResponse.data.main.temp,
      pressure: apiResponse.data.main.pressure,
      humidity: apiResponse.data.main.humidity,
      sunrise: apiResponse.data.sys.sunrise,
      sunset: apiResponse.data.sys.sunset,
      icone: `http://openweathermap.org/img/w/${apiResponse.data.weather[0].icon}.png`,
    };
    res.json({ apiResult: result });
  });
});
// make app importable from another files
module.exports = app;
