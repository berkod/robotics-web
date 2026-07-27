export const SPONSOR_TIERS = ["Platinum", "Gold", "Silver", "Bronze"] as const;

export type SponsorTier = (typeof SPONSOR_TIERS)[number];
