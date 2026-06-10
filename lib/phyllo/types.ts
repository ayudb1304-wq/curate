/**
 * Types mirroring the Phyllo v1 REST API (https://docs.getphyllo.com).
 * The mock client and the real client both return these shapes, so swapping
 * in the sandbox later is a config change, not a refactor.
 * Re-verify field names against the live API reference when sandbox access arrives.
 */

export type PhylloProduct =
  | "IDENTITY"
  | "IDENTITY.AUDIENCE"
  | "ENGAGEMENT"
  | "ENGAGEMENT.AUDIENCE"
  | "INCOME";

export type AccountStatus = "CONNECTED" | "NOT_CONNECTED" | "SESSION_EXPIRED";

export type SyncStatus = "SYNCED" | "IN_PROGRESS" | "NOT_SUPPORTED";

export interface WorkPlatform {
  id: string;
  name: string;
  logo_url: string;
}

export interface UserRef {
  id: string;
  name: string;
}

export interface AccountRef {
  id: string;
  platform_username: string;
  username?: string;
}

/** POST /v1/users */
export interface CreateUserRequest {
  name: string;
  external_id: string;
}

export interface PhylloUser {
  id: string;
  name: string;
  external_id: string;
  created_at: string;
  updated_at: string;
  status: "ACTIVE" | "INACTIVE";
}

/** POST /v1/sdk-tokens */
export interface CreateSdkTokenRequest {
  user_id: string;
  products: PhylloProduct[];
}

export interface SdkToken {
  sdk_token: string;
  expires_at: string;
}

/** GET /v1/accounts (item) */
export interface PhylloAccount {
  id: string;
  created_at: string;
  updated_at: string;
  user: UserRef;
  work_platform: WorkPlatform;
  platform_username: string;
  platform_profile_name: string;
  platform_profile_id: string;
  platform_profile_published_at: string | null;
  profile_pic_url: string;
  status: AccountStatus;
  data: {
    identity: { status: SyncStatus; last_sync_at: string | null };
    "identity.audience": { status: SyncStatus; last_sync_at: string | null };
    engagement: { status: SyncStatus; last_sync_at: string | null };
  };
}

/** GET /v1/profiles (item) */
export interface PhylloProfile {
  id: string;
  created_at: string;
  updated_at: string;
  user: UserRef;
  account: AccountRef;
  work_platform: WorkPlatform;
  platform_username: string;
  full_name: string;
  first_name: string | null;
  last_name: string | null;
  url: string;
  introduction: string | null;
  image_url: string | null;
  date_of_birth: string | null;
  external_id: string | null;
  platform_account_type: string | null;
  category: string | null;
  website: string | null;
  gender: string | null;
  country: string | null;
  platform_profile_name: string;
  platform_profile_id: string;
  platform_profile_published_at: string | null;
  is_verified: boolean;
  is_business: boolean;
  reputation: {
    follower_count: number | null;
    following_count: number | null;
    subscriber_count: number | null;
    paid_subscriber_count: number | null;
    content_count: number | null;
    content_group_count: number | null;
    watch_time_in_hours: number | null;
    average_open_rate: number | null;
    average_click_rate: number | null;
  };
  emails: Array<{ type: string; email_id: string }>;
}

/** GET /v1/audience */
export interface PhylloAudience {
  id: string;
  created_at: string;
  updated_at: string;
  user: UserRef;
  account: AccountRef;
  work_platform: WorkPlatform;
  countries: Array<{ code: string; value: number }>;
  cities: Array<{ name: string; value: number }>;
  gender_age_distribution: Array<{
    gender: "MALE" | "FEMALE" | "OTHERS";
    age_range: string;
    value: number;
  }>;
}

/** GET /v1/social/contents (item) */
export interface PhylloContent {
  id: string;
  created_at: string;
  updated_at: string;
  user: UserRef;
  account: AccountRef;
  work_platform: WorkPlatform;
  external_id: string;
  title: string | null;
  format: "VIDEO" | "IMAGE" | "AUDIO" | "TEXT" | "OTHER";
  type: "POST" | "STORY" | "REELS" | "FEED" | "VIDEO" | "TWEET" | "OTHER";
  url: string;
  media_url: string | null;
  duration: number | null;
  description: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  thumbnail_url: string | null;
  published_at: string;
  hashtags: string[];
  mentions: string[];
  engagement: {
    like_count: number | null;
    dislike_count: number | null;
    comment_count: number | null;
    view_count: number | null;
    impression_organic_count: number | null;
    reach_organic_count: number | null;
    save_count: number | null;
    share_count: number | null;
    watch_time_in_hours: number | null;
  };
}

export interface ListMetadata {
  offset: number;
  limit: number;
  from_date?: string | null;
  to_date?: string | null;
}

export interface ListResponse<T> {
  data: T[];
  metadata: ListMetadata;
}
