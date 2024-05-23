export const REQUEST_URLS = {
  V1: {
    REFRESH_TOKEN: "/v1/auth/refresh-tokens",
    USER_PROFILE: "/v1/users/profile",
    USERS: "/v1/users",
    STAFFS: "/v1/users/staffs",
    BOOKING_HISTORY: "/v1/booking/my-bookings",
    VOUCHERS: "/v1/vouchers",
    VOUCHERS_USER: "/v1/vouchers/user",
    RESET_PASSWORD: "/v1/auth/reset-password",
    SUSPEND_USER: "/v1/users/suspend",
    UNSUSPEND_USER: "/v1/users/unsuspend",
    CHAT: "/v1/chats",
    REVIEW: "/v1/reviews",
    NOTIFICATIONS: "/v1/notifications",
    NOTIFICATIONS_UNREAD: "/v1/notifications/unread",
    STATISTIC_OWNER: "/v1/statistic/owner",
    STATISTIC_SYSTEM: "/v1/statistic/system",
    STATISTIC_REVENUE: "/v1/statistic/revenue",
    STATISTIC_BOOKING: "/v1/booking",
    PITCHES: "/v1/pitches",
    MY_PITCHES: "/v1/pitches/my-pitches",
    PITCH_SLUG: "/v1/pitches/slug",
    PITCH_DETAIL: "/v1/pitches/detail",
    PITCH_BOOKING_STATUS: "/v1/pitches/booking-status",
    PITCHES_FAVORITE: "/v1/pitches/favorite",
    PITCH_TYPES: "/v1/pitches/pitch-type",
    SUB_PITCH_TYPES: "/v1/pitches/subpitch-type",
    SUB_PITCH_PRICES_CONFIG: "/v1/pitches/subpitches/config-price",
  },
};

export const REQUEST_URLS_CURRENT = REQUEST_URLS.V1;

export const API_VERSIONS = Object.keys(REQUEST_URLS);
