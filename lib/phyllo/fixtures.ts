import type {
  PhylloAccount,
  PhylloAudience,
  PhylloContent,
  PhylloProfile,
  PhylloUser,
  SdkToken,
  WorkPlatform,
} from "./types";

/**
 * Hardcoded dummy data shaped like real Phyllo API responses.
 * One fictional creator: a beauty/fashion micro-creator in India with a
 * connected Instagram account. Numbers are realistic for a ~48K account.
 */

// Verify these platform UUIDs against the sandbox; they are stable in Phyllo docs examples.
export const INSTAGRAM: WorkPlatform = {
  id: "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
  name: "Instagram",
  logo_url: "https://cdn.getphyllo.com/platforms_logo/logos/logo_instagram.png",
};

export const YOUTUBE: WorkPlatform = {
  id: "14d9ddf5-51c6-415e-bde6-f8ed36ad7054",
  name: "YouTube",
  logo_url: "https://cdn.getphyllo.com/platforms_logo/logos/logo_youtube.png",
};

const T0 = "2026-05-01T10:00:00.000Z";
const T1 = "2026-06-09T04:30:00.000Z";

export const mockUser: PhylloUser = {
  id: "5d784d3c-1d56-4f54-9b7a-2c3a8e6f1a01",
  name: "Aanya Sharma",
  external_id: "curate-creator-0001",
  created_at: T0,
  updated_at: T0,
  status: "ACTIVE",
};

export const mockSdkToken: SdkToken = {
  sdk_token: "mock.sdk.token.do-not-use-in-production",
  expires_at: "2026-06-17T04:30:00.000Z",
};

export const mockAccount: PhylloAccount = {
  id: "2b3316b8-f468-4f03-8411-40b547ec7eb3",
  created_at: T0,
  updated_at: T1,
  user: { id: mockUser.id, name: mockUser.name },
  work_platform: INSTAGRAM,
  platform_username: "aanya.beauty",
  platform_profile_name: "Aanya Sharma",
  platform_profile_id: "17841401234567890",
  platform_profile_published_at: "2019-03-12T00:00:00.000Z",
  profile_pic_url: "https://placehold.co/320x320/png?text=AS",
  status: "CONNECTED",
  data: {
    identity: { status: "SYNCED", last_sync_at: T1 },
    "identity.audience": { status: "SYNCED", last_sync_at: T1 },
    engagement: { status: "SYNCED", last_sync_at: T1 },
  },
};

export const mockProfile: PhylloProfile = {
  id: "0ccc5adf-0d7d-4eaa-bca5-6b58420f7da7",
  created_at: T0,
  updated_at: T1,
  user: { id: mockUser.id, name: mockUser.name },
  account: { id: mockAccount.id, platform_username: "aanya.beauty" },
  work_platform: INSTAGRAM,
  platform_username: "aanya.beauty",
  full_name: "Aanya Sharma",
  first_name: "Aanya",
  last_name: "Sharma",
  url: "https://www.instagram.com/aanya.beauty",
  introduction:
    "Skincare and everyday makeup for Indian skin tones. Mumbai. Collabs: hello@aanya.in",
  image_url: "https://placehold.co/320x320/png?text=AS",
  date_of_birth: null,
  external_id: null,
  platform_account_type: "CREATOR",
  category: "Beauty",
  website: "https://aanya.in",
  gender: "FEMALE",
  country: "IN",
  platform_profile_name: "Aanya Sharma",
  platform_profile_id: "17841401234567890",
  platform_profile_published_at: "2019-03-12T00:00:00.000Z",
  is_verified: false,
  is_business: false,
  reputation: {
    follower_count: 48520,
    following_count: 612,
    subscriber_count: null,
    paid_subscriber_count: null,
    content_count: 384,
    content_group_count: null,
    watch_time_in_hours: null,
    average_open_rate: null,
    average_click_rate: null,
  },
  emails: [{ type: "WORK", email_id: "hello@aanya.in" }],
};

export const mockAudience: PhylloAudience = {
  id: "7f2a9c44-8e1b-4d6a-9f3c-5a0b1c2d3e4f",
  created_at: T0,
  updated_at: T1,
  user: { id: mockUser.id, name: mockUser.name },
  account: { id: mockAccount.id, platform_username: "aanya.beauty" },
  work_platform: INSTAGRAM,
  countries: [
    { code: "IN", value: 78.4 },
    { code: "AE", value: 5.2 },
    { code: "US", value: 4.1 },
    { code: "GB", value: 2.3 },
    { code: "NP", value: 1.8 },
  ],
  cities: [
    { name: "Mumbai", value: 18.6 },
    { name: "Delhi", value: 14.2 },
    { name: "Bengaluru", value: 9.8 },
    { name: "Pune", value: 6.1 },
    { name: "Hyderabad", value: 5.4 },
  ],
  gender_age_distribution: [
    { gender: "FEMALE", age_range: "18-24", value: 31.5 },
    { gender: "FEMALE", age_range: "25-34", value: 27.9 },
    { gender: "FEMALE", age_range: "35-44", value: 8.2 },
    { gender: "MALE", age_range: "18-24", value: 12.4 },
    { gender: "MALE", age_range: "25-34", value: 11.7 },
    { gender: "MALE", age_range: "35-44", value: 4.6 },
    { gender: "OTHERS", age_range: "18-24", value: 2.1 },
  ],
};

function content(
  partial: Pick<PhylloContent, "id" | "external_id" | "type" | "format" | "description" | "published_at"> &
    Partial<PhylloContent>,
): PhylloContent {
  return {
    created_at: partial.published_at,
    updated_at: T1,
    user: { id: mockUser.id, name: mockUser.name },
    account: { id: mockAccount.id, platform_username: "aanya.beauty" },
    work_platform: INSTAGRAM,
    title: null,
    url: `https://www.instagram.com/p/${partial.external_id}`,
    media_url: null,
    duration: null,
    visibility: "PUBLIC",
    thumbnail_url: `https://placehold.co/640x800/png?text=${partial.type}`,
    hashtags: ["#skincare", "#indianbeauty"],
    mentions: [],
    engagement: {
      like_count: 0,
      dislike_count: null,
      comment_count: 0,
      view_count: null,
      impression_organic_count: null,
      reach_organic_count: null,
      save_count: null,
      share_count: null,
      watch_time_in_hours: null,
    },
    ...partial,
  };
}

export const mockContents: PhylloContent[] = [
  content({
    id: "c1a2b3c4-0001-4000-8000-000000000001",
    external_id: "DKx1aBcDeF1",
    type: "REELS",
    format: "VIDEO",
    description: "5-minute morning skincare routine for oily skin",
    published_at: "2026-06-05T13:30:00.000Z",
    duration: 42,
    thumbnail_url:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    engagement: {
      like_count: 6230,
      dislike_count: null,
      comment_count: 218,
      view_count: 89400,
      impression_organic_count: 96200,
      reach_organic_count: 71300,
      save_count: 1840,
      share_count: 920,
      watch_time_in_hours: null,
    },
  }),
  content({
    id: "c1a2b3c4-0002-4000-8000-000000000002",
    external_id: "DKw9xYzAbC2",
    type: "POST",
    format: "IMAGE",
    description: "Festive makeup look, full product list in caption",
    published_at: "2026-05-28T15:00:00.000Z",
    thumbnail_url:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    engagement: {
      like_count: 3120,
      dislike_count: null,
      comment_count: 96,
      view_count: null,
      impression_organic_count: 41800,
      reach_organic_count: 33500,
      save_count: 740,
      share_count: 210,
      watch_time_in_hours: null,
    },
  }),
  content({
    id: "c1a2b3c4-0003-4000-8000-000000000003",
    external_id: "DKv5mNoPqR3",
    type: "REELS",
    format: "VIDEO",
    description: "Drugstore sunscreen comparison under 500 rupees",
    published_at: "2026-05-21T12:15:00.000Z",
    duration: 58,
    thumbnail_url:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    engagement: {
      like_count: 8910,
      dislike_count: null,
      comment_count: 402,
      view_count: 132700,
      impression_organic_count: 141900,
      reach_organic_count: 104600,
      save_count: 3260,
      share_count: 1480,
      watch_time_in_hours: null,
    },
  }),
];
