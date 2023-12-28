enum ReportTypes {
  Pitch = "pitch",
  User = "user",
}
export const reportTypesArray = Object.values(ReportTypes);
export default ReportTypes;

export type ReportType = ReportTypes.Pitch | ReportTypes.User;
