const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const config = require("config");
const helmet = require("helmet");
const path = require("path");

const app = express();

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'security.log' })
    ]
});

logger.info('Application started');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Apply Helmet middleware
app.use(helmet());

// DB Config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
const https = require('https');
const fs = require('fs');

// SSL options
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Create HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(8443, () => {
  console.log("HTTPS Server Listening on port 8443");
});

app.get('/', (req, res) => {
  res.send('HTTPS server is running securely!');
});


