export type ISubPitch = {
    subpitch_id: string | number,
    pitch_id: string | number,
    name: string,
    price: number,
    type: "PITCH5" | "PITCH7" | "PITCH11",
    active: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
}