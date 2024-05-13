const express = require("express");
const cors = require("cors");
const connnection = require("./connection/db");
// const router = require("./router/Routerv2");

const router2 = require("./router/Routerv2");
const router = require("./router/ckDualRouter");
const { HistoryRouter } = require("./router/historyRouter");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Temporary middleware for testing
app.use((req, res, next) => {
  // Mock user data
  req.user = {
    _id: "mockUserId12345",
    username: "testUser",
    email: "test@example.com",
  };
  next();
});

app.use("/api/v1/docs", router);
app.use("/api/v2/docs", router2);
app.use("/api/v1/docs/history", HistoryRouter);
const startServer = async () => {
  try {
    await connnection.connection();
    app.listen(port, () => {
      console.log(`Server is Running on port ${port}`);
    });
  } catch (errr) {
    console.log(errr.message);
    process.exit(1);
  }
};
startServer();
