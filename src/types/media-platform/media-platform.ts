export interface AuthorizationHeader {
  Authorization: string;
}

export interface DownloadURLObject {
  downloadUrl: string;
}

export type TokenObjects = any[][];

export interface TokenClaims {
  sub: string | null;
  obj: string | TokenObjects | null;
  aud: string | string[] | null;
  iss: string | null;
  iat: number | null;
  jti: string | null;
  exp: number | null;
}

// unknown type yet
export type Successor = any;
