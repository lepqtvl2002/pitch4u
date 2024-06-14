enum PitchTypes {
  Soccer = "soccer",
  Basketball = "basketball",
  Tennis = "tennis",
  Volleyball = "volleyball",
  Badminton = "badminton",
  Other = "other",
}
export const pitchTypesArray = Object.values(PitchTypes);
export default PitchTypes;

export type PitchType =
  | PitchTypes.Soccer
  | PitchTypes.Badminton
  | PitchTypes.Basketball
  | PitchTypes.Tennis
  | PitchTypes.Volleyball
  | PitchTypes.Other;
