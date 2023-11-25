export interface IReport {
  attaches: any[];
  report_id: number;
  pitch_id?: number | null;
  user_id?: number | null;
  description: string;
  reason: string;
  type: "pitch" | "user";
  reporter_id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}
