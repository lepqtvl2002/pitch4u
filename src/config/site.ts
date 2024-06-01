import { NavItem, type DashboardConfig } from "@/types";
import { REDIRECT_URLS } from "./redirect-urls";
export const siteConfig = {
  name: "Pitch4u",
  description: "Tìm sân, tìm đồng dội, tìm đối thủ, tìm niềm vui sân cỏ.",
  // url: "https://pitch4u.com",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL,
  ogImage: "https://pitch4u.com/og.jpg",
  links: {},
  authors: [
    {
      name: "Trần Đức Thắng",
      github: "github.com/lepqtvl2002",
    },
    {
      name: "? Team",
    },
  ],
};

const adminNavItems: Record<string, NavItem> = {
  overview: {
    title: "Điều khiển",
    href: REDIRECT_URLS.ADMIN.OVERVIEW,
    icon: "chart",
  },
  registration: {
    title: "Phê duyệt yêu cầu",
    href: REDIRECT_URLS.ADMIN.REGISTRATION,
    icon: "managerPitch",
  },
  user: {
    title: "Người dùng",
    href: REDIRECT_URLS.ADMIN.USER,
    icon: "userSquare",
  },
  report: {
    title: "Tố cáo của người dùng",
    href: REDIRECT_URLS.ADMIN.REPORT,
    icon: "scrollText",
  },
  pitch: {
    title: "Quản lý sân",
    href: REDIRECT_URLS.ADMIN.PITCH,
    icon: "layoutPanelLeft",
  },
  voucher: {
    title: "Voucher",
    href: REDIRECT_URLS.ADMIN.VOUCHER,
    icon: "ticket",
  },
  advertisement: {
    title: "Quảng cáo",
    href: REDIRECT_URLS.ADMIN.ADVERTISEMENT,
    icon: "megaPhone",
  },
  message: {
    title: "Tin nhắn",
    href: REDIRECT_URLS.ADMIN.MESSAGE,
    icon: "message",
  },
  notification: {
    title: "Thông báo",
    href: REDIRECT_URLS.ADMIN.NOTIFICATION,
    icon: "notification",
  },
};

export const adminConfig: DashboardConfig = {
  mainNav: [
    adminNavItems.overview,
    adminNavItems.registration,
    adminNavItems.user,
    adminNavItems.pitch,
    adminNavItems.voucher,
    adminNavItems.report,
    adminNavItems.advertisement,
  ],
  sidebarNav: [
    adminNavItems.overview,
    adminNavItems.registration,
    adminNavItems.user,
    adminNavItems.pitch,
    adminNavItems.voucher,
    adminNavItems.report,
    adminNavItems.advertisement,
  ],
  notificationNav: [adminNavItems.message, adminNavItems.notification],
};

const dashboardNavItems: Record<string, NavItem> = {
  pitch: {
    title: "Quản lý sân",
    href: REDIRECT_URLS.DASHBOARD.PITCH,
    icon: "layoutPanelLeft",
  },
  booking: {
    title: "Quản lý đặt sân",
    href: REDIRECT_URLS.DASHBOARD.BOOKING,
    icon: "scrollText",
  },
  voucher: {
    title: "Voucher",
    href: REDIRECT_URLS.DASHBOARD.VOUCHER,
    icon: "ticket",
  },
  advertisement: {
    title: "Quảng cáo",
    href: REDIRECT_URLS.DASHBOARD.ADVERTISEMENT,
    icon: "megaPhone",
  },
  message: {
    title: "Tin nhắn",
    href: REDIRECT_URLS.DASHBOARD.MESSAGE,
    icon: "message",
  },
  notification: {
    title: "Thông báo",
    href: REDIRECT_URLS.DASHBOARD.NOTIFICATION,
    icon: "notification",
  },
  overview: {
    title: "Điều khiển",
    href: REDIRECT_URLS.DASHBOARD.OVERVIEW,
    icon: "chart",
  },
  staff: {
    title: "Nhân viên",
    href: REDIRECT_URLS.DASHBOARD.STAFF,
    icon: "userSquare",
  },
  service: {
    title: "Dịch vụ",
    href: REDIRECT_URLS.DASHBOARD.SERVICE,
    icon: "coffee",
  },
};

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    dashboardNavItems.overview,
    dashboardNavItems.pitch,
    dashboardNavItems.booking,
    dashboardNavItems.voucher,
    dashboardNavItems.advertisement,
  ],
  sidebarNav: [
    dashboardNavItems.overview,
    dashboardNavItems.pitch,
    dashboardNavItems.booking,
    dashboardNavItems.voucher,
    dashboardNavItems.advertisement,
  ],
  notificationNav: [dashboardNavItems.message, dashboardNavItems.notification],
};

export const dashboardConfigOperator: DashboardConfig = {
  ...dashboardConfig,
  mainNav: [dashboardNavItems.staff, ...dashboardConfig.mainNav],
  sidebarNav: [
    dashboardNavItems.staff,
    ...dashboardConfig.sidebarNav,
    dashboardNavItems.service,
  ],
};

const publicNavItems: Record<string, NavItem> = {
  findPitch: {
    title: "Tìm sân",
    href: REDIRECT_URLS.FIND_PITCH,
    icon: "search",
  },
  pitch: {
    title: "Dành cho chủ sân",
    href: REDIRECT_URLS.PITCH,
    icon: "layoutPanelLeft",
  },
  community: {
    title: "Cộng đồng",
    href: REDIRECT_URLS.COMMUNITY,
    icon: "group",
  },
  contact: {
    title: "Liên hệ",
    href: REDIRECT_URLS.CONTACT,
    icon: "phone",
  },
};

export const publicNavbarConfig: DashboardConfig = {
  mainNav: [
    publicNavItems.findPitch,
    publicNavItems.pitch,
    publicNavItems.community,
    publicNavItems.contact,
  ],
  sidebarNav: [
    publicNavItems.findPitch,
    publicNavItems.pitch,
    publicNavItems.community,
    publicNavItems.contact,
  ],
};

const personalNavItems: Record<string, NavItem> = {
  profile: {
    title: "Thông tin cá nhân",
    href: REDIRECT_URLS.PERSONAL.PROFILE,
    icon: "user",
  },
  favorite: {
    title: "Sân yêu thích",
    href: REDIRECT_URLS.PERSONAL.FAVORITE,
    icon: "favorite",
  },
  history: {
    title: "Lịch sử đặt sân",
    href: REDIRECT_URLS.PERSONAL.HISTORY,
    icon: "history",
  },
};

export const personalNavConfig: DashboardConfig = {
  mainNav: [
    personalNavItems.profile,
    personalNavItems.favorite,
    personalNavItems.history,
  ],
  sidebarNav: [
    personalNavItems.profile,
    personalNavItems.favorite,
    personalNavItems.history,
  ],
};

const footerNavItems: Record<string, NavItem> = {
  aboutUs: {
    title: "Về chúng tôi",
    href: REDIRECT_URLS.ABOUT_US,
  },
  faq: {
    title: "FAQ",
    href: REDIRECT_URLS.FAQ,
  },
  contact: {
    title: "Liên hệ",
    href: REDIRECT_URLS.CONTACT,
  },
  termsOfUse: {
    title: "Điều khoản sử dụng",
    href: REDIRECT_URLS.TERMS_OF_USE,
  },
  privacyPolicy: {
    title: "Chính sách bảo mật",
    href: REDIRECT_URLS.PRIVACY_POLICY,
  },
  privacy: {
    title: "Quyền riêng tư",
    href: REDIRECT_URLS.PRIVACY,
  },
};

export const mainFooterConfig: NavItem[] = [
  footerNavItems.aboutUs,
  footerNavItems.faq,
  footerNavItems.contact,
  footerNavItems.termsOfUse,
  footerNavItems.privacyPolicy,
  footerNavItems.privacy,
];
