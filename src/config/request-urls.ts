export const REQUEST_URLS = {
  V1: {
    REFRESH_TOKEN: "/v1/auth/refresh-tokens",
    USER_PROFILE: "/v1/users/profile",
    USERS: "/v1/users",
    STAFFS: "/v1/users/staffs",
    BOOKING_HISTORY: "/v1/booking/my-bookings",
  },
};

export const REQUEST_URLS_CURRENT = REQUEST_URLS.V1;

export const API_VERSIONS = Object.keys(REQUEST_URLS);
