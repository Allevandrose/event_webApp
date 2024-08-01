const http = require("http");
const app = require("./app");

const port = process.env.port || 1000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server Connected Succesfully!!");
});
