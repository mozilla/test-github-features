import express from "express";

const app = express();

app.get('/', (_, res) => res.json({ version: app.get('version') }));

app.get("/:number", (req, res) => {
	const number = parseFloat(req.params.number);
	if (isNaN(number)) {
		return res.status(400).send({ error: "Please provide a valid number" });
	}

	const squareRoot = Math.sqrt(number);
	res.json({ square_root: squareRoot });
});

export default app;
