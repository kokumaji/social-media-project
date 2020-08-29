import { KokuServer } from "../KokuServer";
import { authorize } from "./auth/authorize";
import { getUser, getUsers, validateToken } from "./public/user";
import { register } from "./auth/register";

export const registerRoutes = (server: KokuServer) => { 
    const app = server.app;

    app.post("/authorize", authorize(server));
    app.post("/register", register(server));

    // app.get('/api/users', function(req, res) {
    //     // res.header('Access-Control-Allow-Origin', '*');
    //     const user = mongoose.connection.model('User', User, 'userProfiles');
    //     user.find({}).then(collection => {
    //         res.json(collection);
    //     });
    // });

    app.get('/api/user', getUser(server));
    app.get('/api/users', getUsers(server));
}
