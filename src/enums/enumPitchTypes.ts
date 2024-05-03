enum EnumPitchTypes {
  Soccer = "soccer",
  Basketball = "basketball",
  Tennis = "tennis",
  Volleyball = "volleyball",
  Badminton = "badminton",
}
export const enumPitchTypesArray = Object.values(EnumPitchTypes);
export default EnumPitchTypes;

export type PitchType =
  | EnumPitchTypes.Soccer
  | EnumPitchTypes.Basketball
  | EnumPitchTypes.Tennis
  | EnumPitchTypes.Volleyball
  | EnumPitchTypes.Badminton;
