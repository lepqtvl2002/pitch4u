export default interface IRegistration {
  registration_id: number;
  user_id: number;
  pitch_name: string;
  pitch_address: string;
  fullname: string;
  card_id: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  approve_by: string | null;
  long: number;
  lat: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
