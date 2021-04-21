import { defaultDark } from "../../../theme/colorScheme/profileCards";
import { CardScheme } from "../../../types/Theme";
import Status from "./ClientStatus";
import Gender from "./GenderModel";
import { UserRole } from "./UserRoles";

interface IUserData {
    // id, fullname, username, created at, role
    id?: number, 
    name?: string,
    user_name?: string, 
    created_at?: Date,
    role?: UserRole | null
}

interface IUserMeta {
    // location, description, gender, status
    // profile picture url 
    birthday?: Date
    location?: string | null,
    description?: string | null,
    gender?: Gender
    status?: Status
}

interface IUserMedia {
    profile_picture_url?: string | null,
    profile_banner_url?: string | null
}

interface IUserTheme {
    colorScheme?: CardScheme | null
}

const defaultData: IUserData = {
    id: 0,
    name: "null",
    user_name: "null",
    created_at: new Date(0),
    role: null
}

const defaultMeta: IUserMeta = {
    birthday: new Date(0),
    gender: Gender.HIDDEN,
    status: Status.OFFLINE
}

const defaultMedia: IUserMedia = {
    profile_picture_url: null,
    profile_banner_url: null
}

const defaultTheme: IUserTheme = {
    colorScheme: defaultDark
}

export default class UserObject {

    data: IUserData;
    meta: IUserMeta;
    media: IUserMedia;
    theme: IUserTheme;

    constructor(userData: IUserData, userMeta?: IUserMeta, userMedia?: IUserMedia, userTheme?: IUserTheme) {
        this.data = {...defaultData, ...userData};
        this.meta = {...defaultMeta, ...userMeta};
        this.media = {...defaultMedia, ...userMedia};
        this.media = {...defaultMedia, ...userMedia};
        this.theme = {...defaultTheme, ...userTheme};
    }

}