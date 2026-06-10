import {
  mockAccount,
  mockAudience,
  mockContents,
  mockProfile,
  mockSdkToken,
  mockUser,
} from "./fixtures";
import type {
  CreateSdkTokenRequest,
  CreateUserRequest,
  ListResponse,
  PhylloAccount,
  PhylloAudience,
  PhylloContent,
  PhylloProfile,
  PhylloUser,
  SdkToken,
} from "./types";

/**
 * Single interface for creator data. The app only ever talks to this.
 * PHYLLO_MODE=mock (default) serves hardcoded fixtures.
 * PHYLLO_MODE=sandbox|production calls the real API once credentials exist.
 */
export interface PhylloClient {
  createUser(req: CreateUserRequest): Promise<PhylloUser>;
  createSdkToken(req: CreateSdkTokenRequest): Promise<SdkToken>;
  getAccounts(userId: string): Promise<ListResponse<PhylloAccount>>;
  getProfile(accountId: string): Promise<PhylloProfile>;
  getAudience(accountId: string): Promise<PhylloAudience>;
  getContents(accountId: string, limit?: number): Promise<ListResponse<PhylloContent>>;
}

class MockPhylloClient implements PhylloClient {
  async createUser(req: CreateUserRequest): Promise<PhylloUser> {
    return { ...mockUser, name: req.name, external_id: req.external_id };
  }

  async createSdkToken(_req: CreateSdkTokenRequest): Promise<SdkToken> {
    return mockSdkToken;
  }

  async getAccounts(_userId: string): Promise<ListResponse<PhylloAccount>> {
    return { data: [mockAccount], metadata: { offset: 0, limit: 10 } };
  }

  async getProfile(_accountId: string): Promise<PhylloProfile> {
    return mockProfile;
  }

  async getAudience(_accountId: string): Promise<PhylloAudience> {
    return mockAudience;
  }

  async getContents(_accountId: string, limit = 10): Promise<ListResponse<PhylloContent>> {
    return { data: mockContents.slice(0, limit), metadata: { offset: 0, limit } };
  }
}

/** Phyllo authenticates with HTTP Basic: client id as username, secret as password. */
class HttpPhylloClient implements PhylloClient {
  constructor(
    private baseUrl: string,
    private clientId: string,
    private secret: string,
  ) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const auth = Buffer.from(`${this.clientId}:${this.secret}`).toString("base64");
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Phyllo ${init?.method ?? "GET"} ${path} failed: ${res.status} ${await res.text()}`);
    }
    return res.json() as Promise<T>;
  }

  createUser(req: CreateUserRequest) {
    return this.request<PhylloUser>("/v1/users", { method: "POST", body: JSON.stringify(req) });
  }

  createSdkToken(req: CreateSdkTokenRequest) {
    return this.request<SdkToken>("/v1/sdk-tokens", { method: "POST", body: JSON.stringify(req) });
  }

  getAccounts(userId: string) {
    return this.request<ListResponse<PhylloAccount>>(`/v1/accounts?user_id=${userId}`);
  }

  async getProfile(accountId: string) {
    const res = await this.request<ListResponse<PhylloProfile>>(`/v1/profiles?account_id=${accountId}`);
    return res.data[0];
  }

  getAudience(accountId: string) {
    return this.request<PhylloAudience>(`/v1/audience?account_id=${accountId}`);
  }

  getContents(accountId: string, limit = 10) {
    return this.request<ListResponse<PhylloContent>>(
      `/v1/social/contents?account_id=${accountId}&limit=${limit}`,
    );
  }
}

const BASE_URLS: Record<string, string> = {
  sandbox: "https://api.sandbox.getphyllo.com",
  production: "https://api.getphyllo.com",
};

export function getPhylloClient(): PhylloClient {
  const mode = process.env.PHYLLO_MODE ?? "mock";
  if (mode === "mock") return new MockPhylloClient();

  const baseUrl = BASE_URLS[mode];
  const clientId = process.env.PHYLLO_CLIENT_ID;
  const secret = process.env.PHYLLO_SECRET;
  if (!baseUrl || !clientId || !secret) {
    throw new Error(
      `PHYLLO_MODE=${mode} requires PHYLLO_CLIENT_ID and PHYLLO_SECRET. Use PHYLLO_MODE=mock until sandbox access is granted.`,
    );
  }
  return new HttpPhylloClient(baseUrl, clientId, secret);
}
