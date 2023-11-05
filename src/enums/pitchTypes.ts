enum PitchTypes {
  Pitch5 = "PITCH5",
  Pitch7 = "PITCH7",
  Pitch9 = "PITCH9",
  Pitch11 = "PITCH11",
}
export const pitchTypesArray = Object.values(PitchTypes);
export default PitchTypes;

export type PitchType =
  | PitchTypes.Pitch5
  | PitchTypes.Pitch7
  | PitchTypes.Pitch9
  | PitchTypes.Pitch11;
