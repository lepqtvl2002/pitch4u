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
  },
};

export const REQUEST_URLS_CURRENT = REQUEST_URLS.V1;

export const API_VERSIONS = Object.keys(REQUEST_URLS);
