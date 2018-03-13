export interface AuthorizationHeader {
  Authorization: string;
}

export interface DownloadURLObject {
  downloadUrl: string;
}

export type TokenObjects = any[][];

export interface TokenClaims {
  sub: string;
  obj: string | TokenObjects | null;
  aud: string | string[] | null;
  iss: string;
  iat: number;
  jti: string;
  exp: number;
}

// unknown type yet
export type Successor = any;
