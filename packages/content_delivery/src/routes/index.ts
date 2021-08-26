import { DeliveryServer } from "../DeliveryServer";
import path from "path";
import fs from "fs";

export const registerRoutes = (server: DeliveryServer) => {
	const app = server.app;

	app.get("/profile_pictures/:id", (req, res, next) => {
		const filePath = path.join(
			__dirname,
			"../data/profile_pictures",
			`${req.params.id}.png`
		);

		if (fs.existsSync(filePath)) {
			return res.status(200).sendFile(filePath);
		} else return res.redirect("http://localhost:3000/404");
	});

	app.get("/profile_pictures", (req, res, next) => {
		return res.redirect("http://localhost:3000/404");
	});
};
