import { ClientUser } from "../../models/ClientUser";
import { Post } from "../../models/Post";
import { RH } from "../types";

export const createPost: RH = (server) => async (req, res) => {
    const { content } = req.body;

    if (!content) {
        // send bad request
        return;
    }

    
};
