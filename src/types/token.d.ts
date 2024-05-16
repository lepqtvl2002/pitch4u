export interface IToken {
    token: string;
    expiresIn: Date;
}

export interface IRefreshReturn {
    accessToken?: IToken;
    refreshToken?: IToken;
    access?: IToken;
    refresh?: IToken;
}
