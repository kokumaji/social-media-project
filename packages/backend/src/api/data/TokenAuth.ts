import * as jwt from 'jsonwebtoken';
import { ClientUser } from '../../models/ClientUser'; 

// generate a new JWT token and populate with clientuser data
export const generate = (user: typeof ClientUser) => {
    //if(!user || !user.id) return null;
}