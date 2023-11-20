export type IUser = {
  avatar: string;
  user_id: number;
  fullname: string;
  phone: string;
  email: string;
  provider: string;
  password: string; // Note: You might want to use a more secure type here
  is_verified: boolean;
  gender: "male" | "female" | "other"; // Adjust as needed
  birthday: string; // You might want to use a Date type here
  role_id: number;
  is_suspended: boolean;
  createdAt: string; // You might want to use a Date type here
  updatedAt: string; // You might want to use a Date type here
  deletedAt: string | null; // You might want to use a Date type here
  role: {
    name: "admin" | "user" | "staff" | "super_admin"; // Adjust as needed
  };
};
