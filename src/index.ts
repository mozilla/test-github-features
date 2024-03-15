import server from "./server";

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server version: ${server.get('version')} is running at http://localhost:${port}`);
});
