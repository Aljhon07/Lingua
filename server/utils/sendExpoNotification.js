const { default: axios } = require("axios");

const sendNotification = async (to, title, body, data = {}) => {
  const message = {
    to,
    sound: "default",
    title,
    body,
    data,
  };

  await axios.post("https://exp.host/--/api/v2/push/send", message, {
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  });
};

module.exports = { sendNotification };
