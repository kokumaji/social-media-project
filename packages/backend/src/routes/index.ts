import { KokuServer } from "../KokuServer";

export const registerRoutes = (server: KokuServer) => { 
    const app = server.app;

    app.use("*", (req, res) => res.json({ msg: "gay" }));

}
