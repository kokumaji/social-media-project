import { Document, model, Schema } from "mongoose";
import { RoleDocument, RoleSerializable } from "../models/roles/Role";
import { PermissionLevel } from "./roles/PermissionLevel";

interface Credentials {
	email: string;
	username: string;
	password: string;
}

interface ClientUserDocument extends Document {
	id: string;
	username: string;
	createdAt: number;

	credentials: Credentials;
	role: RoleDocument;
}

const ClientUserSchema = new Schema<ClientUserDocument>({
	id: String,
	username: String,
	createdAt: { type: Number, default: Date.now },

	credentials: {
		email: String,
		password: String,
	},

	role: {
		roleName: String,
		obtainable: Boolean,
		permissionLevel: Number,
		publicBadge: Boolean,
	},
});

export const ClientUser = model<ClientUserDocument>("ClientUser", ClientUserSchema);

export const hasPermission = (user: ClientUserDocument, perm: PermissionLevel) => {
	return user?.role.permissionLevel == perm;
};
