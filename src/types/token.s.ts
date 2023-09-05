export interface IToken {
    token: string;
    expiresIn: string;
}

export interface IRefreshReturn {
    accessToken: IToken;
    refreshToken: IToken;
}
