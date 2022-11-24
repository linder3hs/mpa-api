import { connection } from "../db/index.mjs";
import { hashString, compareString } from "../utils/strings.mjs";

export const findAll = async (req, res) => {
	const query = {
		name: "products",
		text: "SELECT * FROM product",
	};

	const client = await connection();

	const result = await client.query(query);

	res.json({
		ok: true,
		data: result.rows,
	});
};

export const add = async (req, res) => {
	const { name, image_url, price, user_id } = req.body;

	const text =
		"INSERT INTO product(name, image_url, price, user_id) VALUES($1, $2, $3, $4) RETURNING *";
	const values = [name, image_url, price, user_id];

	const client = await connection();

	try {
		const result = await client.query(text, values);

		res.json({
			ok: true,
			data: result.rows[0],
		});
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: err,
		});
	}
};
