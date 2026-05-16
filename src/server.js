require("dotenv").config();

const app = require("./app");

const { HOST, PORT } = process.env;

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
