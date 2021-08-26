import { Document, model, Schema } from "mongoose";
import { PermissionLevel } from "./PermissionLevel";

const roleCache: RoleDocument[] = [];

export interface RoleDocument extends Document {
	roleName: string;
	obtainable: boolean;
	permissionLevel: number;
	publicBadge: boolean;
}

export interface RoleSerializable {
	roleName: string;
	obtainable: boolean;
	permissionLevel: number;
	publicBadge: boolean;
}

export const RoleSchema = new Schema<RoleDocument>({
	roleName: String,
	obtainable: Boolean,
	permissionLevel: Number,
	publicBadge: Boolean,
});

export const Role = model<RoleDocument>("Role", RoleSchema, "roles");

export const registerRole = async (
	roleName: string,
	permissionLevel: PermissionLevel,
	publicBadge: boolean,
	obtainable: boolean
) => {
	const role = await Role.findOne({ roleName: roleName });

	// already registered
	if (role) {
		roleCache.push(role);
		return;
	}

	const newRole = new Role({
		roleName,
		permissionLevel,
		publicBadge,
		obtainable,
	});
	roleCache.push(newRole);
	await newRole.save();
};

export const getRole = (name: string) => {
	return roleCache.find(role => role.roleName === name);
};
