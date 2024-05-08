enum SoccerPitchTypes {
  Pitch5 = "pitch5",
  Pitch7 = "pitch7",
  Pitch9 = "pitch9",
  Pitch11 = "pitch11",
}
export const soccerPitchTypesArray = Object.values(SoccerPitchTypes);
export default SoccerPitchTypes;

export type PitchType =
  | SoccerPitchTypes.Pitch5
  | SoccerPitchTypes.Pitch7
  | SoccerPitchTypes.Pitch9
  | SoccerPitchTypes.Pitch11;
