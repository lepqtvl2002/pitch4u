enum UserRoles {
  User = "user",
  Staff = "staff",
  Admin = "admin",
  SuperAdmin = "super_admin",
}
export default UserRoles;

export const UserRolesArray = Object.values(UserRoles);

export type UserRole =
  | UserRoles.User
  | UserRoles.Staff
  | UserRoles.Admin
  | UserRoles.SuperAdmin;
