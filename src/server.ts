import express, { Express } from "express";

const app = express();

app.get("/:number", (req, res) => {
	const number = parseFloat(req.params.number);
	if (isNaN(number)) {
		return res.status(400).send({ error: "Please provide a valid number" });
	}

	const squareRoot = Math.sqrt(number);
	res.json({ square_root: squareRoot });
});

export function startServer(server: Express, port = 3000) {
	server.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`);
	});
}

export default app;
