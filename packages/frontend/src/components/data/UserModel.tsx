export interface UserModel {
	id: string;
	createdAt: Date;
	user: {
		username: string;
		fullname: string;
		age: number;
		location: string;
		gender: string;
		profile: {
			imageUrl: string;
			description: string;
			bannerUrl: string;
			cardScheme: string;
		};
	};
}
