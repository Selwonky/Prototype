export function getAccessToken(): string | null {
  return null;
}

export function setAccessToken(token: string): void {
  void token;
  // future: persist to sessionStorage or memory
}

export function clearAccessToken(): void {
  // future: clear from sessionStorage or memory
}
