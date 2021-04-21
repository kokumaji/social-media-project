import { DeliveryServer } from "../DeliveryServer";

export const registerRoutes = (server: DeliveryServer) => {
    const app = server.app;

    app.get('/hello', (req, res, next) => {
        return res.status(200).json({ msg: 'OK' });
    })
}