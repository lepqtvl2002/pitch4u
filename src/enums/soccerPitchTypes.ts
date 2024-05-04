enum SoccerPitchTypes {
  Pitch5 = "PITCH5",
  Pitch7 = "PITCH7",
  Pitch9 = "PITCH9",
  Pitch11 = "PITCH11",
}
export const soccerPitchTypesArray = Object.values(SoccerPitchTypes);
export default SoccerPitchTypes;

export type PitchType =
  | SoccerPitchTypes.Pitch5
  | SoccerPitchTypes.Pitch7
  | SoccerPitchTypes.Pitch9
  | SoccerPitchTypes.Pitch11;
