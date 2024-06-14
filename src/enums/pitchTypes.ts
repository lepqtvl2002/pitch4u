enum PitchTypes {
  Soccer = "soccer",
  Badminton = "badminton",
  Basketball = "basketball",
  Tennis = "tennis",
  Volleyball = "volleyball",
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
