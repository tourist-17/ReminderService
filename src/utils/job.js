const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-Config");

/**
 * 10:00 am
 * Every 5 minutes
 * we will check their any pending emails which was expected to be sent
 * by now  and is pending
 */

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();

    response.forEach((email) => {
      sender.sendMail(
        {
          // from: "RemiderService@airline.com",
          to: "yadsak00@gmail.com",
          subject: email.subject,
          content: email.content,
        },
        async (err, data) => {
          if (err) console.log(err);
          else {
            // console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    // console.log(response);
  });
};
module.exports = setupJobs;
