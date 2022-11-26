import { connection } from "../db/index.mjs";

export const findAll = async (req, res) => {
	const query = {
		name: "order",
		text: 'SELECT o.*, u.name as user_name FROM "order" o INNER JOIN users u on o.user_id = u.id',
	};

	const client = await connection();

	const resultOrders = await client.query(query);

	const queryDetails = {
		name: "orderDetails",
		text: "SELECT * FROM order_detail",
	};

	const resultOrderDetails = await client.query(queryDetails);

	const orderWithDetails = resultOrders.rows.map((order) => {
		return {
			...order,
			order_detail: resultOrderDetails.rows.filter(
				(detail) => order.id === detail.order_id
			),
		};
	});

	res.json({
		ok: true,
		data: orderWithDetails,
	});
};

export const add = async (req, res) => {
	const { user_id, created_at, order_detail } = req.body;

	if (order_detail === undefined || order_detail.length === 0) {
		res.status(500).json({
			ok: false,
			message: "Order detail empty",
		});
		return false;
	}

	const text =
		'INSERT INTO "order"(user_id, created_at) VALUES($1, $2) RETURNING *';
	const values = [user_id, created_at];

	const client = await connection();

	try {
		const result = await client.query(text, values);
		// Insert order_detail:
		if (result.rows.length > 0) {
			order_detail.map(async (order_detail) => {
				const t =
					"INSERT INTO order_detail(order_id, product_id, quantity, unit_price) VALUES($1, $2, $3, $4) RETURNING *";
				const v = [
					result.rows[0].id,
					order_detail.product_id,
					order_detail.quantity,
					order_detail.price,
				];
				const r = await client.query(t, v);
			});
		}

		res.json({
			ok: true,
			data: result.rows[0],
		});
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: err.message,
		});
	}
};
