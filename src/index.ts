import server from "./server";

const port = process.env.PORT || 3000;
const version = process.env.VERSION || "not defined on environment";

server.set("version", version);

server.listen(port, () => {
  console.log(`Server version: ${server.get('version')} is running at http://localhost:${port}`);
});
