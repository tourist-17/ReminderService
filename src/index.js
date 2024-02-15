const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");
const jobs = require('./utils/job') 
const TicketController = require('./controller/ticket-controller')

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);
  // console.log(23442);
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    jobs();
    // sendBasicEmail(
    //   "support@admin.com", // from
    //   "for.coding.24@gmail.com", // to
    //   "This is a testing email", // subject
    //   "Hey, How are you, I hope you like the support" // body
    // );
  });
};

setupAndStartServer();
