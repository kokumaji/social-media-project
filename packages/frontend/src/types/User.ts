import { CardScheme } from "./Theme";

export interface User {
    username: string;
    fullname: string;
    location: string;
    description: string;
    gender: string;
    joined: Date;
    profileImg: string;
    bannerImg: string;
    cardScheme: string;
}

export type UserWithCardScheme = User & { cardColor: CardScheme; }
