import { defaultDark } from "../../../theme/colorScheme/profileCards";
import { CardScheme } from "../../../types/Theme";
import Status from "./ClientStatus";
import Gender from "./GenderModel";
import { UserRole } from "./UserRoles";

interface IUserData {
	// id, fullname, username, created at, role
	id: number;
	name: string;
	user_name: string;
	created_at: Date;
	role: UserRole | null;
}

const DEFAULT_USER_DATA: Partial<IUserData> = {
	created_at: new Date(),
	role: null,
};

interface IUserMeta {
	// location, description, gender, status
	// profile picture url
	birthday: Date | null;
	location: string | null;
	description: string;
	gender: Gender;
	status: Status;
}
const DEFAULT_USER_META: IUserMeta = {
	location: null,
	birthday: null,
	description: "",
	gender: Gender.HIDDEN,
	status: Status.OFFLINE,
};

interface IUserMedia {
	profile_picture_url: string | null;
	profile_banner_url: string | null;
}

const DEFAULT_USER_MEDIA: IUserMedia = {
	profile_picture_url: null,
	profile_banner_url: null,
};

interface IUserTheme {
	colorScheme: CardScheme | null;
}

const DEFAULT_USER_THEME: IUserTheme = {
	colorScheme: defaultDark,
};

export class User {
	data: IUserData;
	meta: IUserMeta;
	media: IUserMedia;
	theme: IUserTheme;

	static get defaultUser() {
		return new User({
			id: 0,
			name: "DEFAULT",
			user_name: "DEFAULT",
			created_at: new Date(0),
			role: null,
		});
	}

	constructor(
		userData: IUserData,
		userMeta?: Partial<IUserMeta>,
		userMedia?: Partial<IUserMedia>,
		userTheme?: Partial<IUserTheme>
	) {
		this.data = { ...DEFAULT_USER_DATA, ...userData };
		this.meta = { ...DEFAULT_USER_META, ...userMeta };
		this.media = { ...DEFAULT_USER_MEDIA, ...userMedia };
		this.theme = { ...DEFAULT_USER_THEME, ...userTheme };
	}
}
