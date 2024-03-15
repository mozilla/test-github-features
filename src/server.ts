import express, { Express } from "express";

const version = process.env.VERSION || "not defined on environment";

const app = express();

app.get('/', (req, res) => res.json({ version }));

app.get("/:number", (req, res) => {
	const number = parseFloat(req.params.number);
	if (isNaN(number)) {
		return res.status(400).send({ error: "Please provide a valid number" });
	}

	const squareRoot = Math.sqrt(number);
	res.json({ square_root: squareRoot, version });
});

export function startServer(server: Express, port = 3000) {
	server.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`);
	});
}

export default app;
