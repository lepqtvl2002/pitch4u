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

export const adminConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Điều khiển",
      href: REDIRECT_URLS.ADMIN.OVERVIEW,
      icon: "chart",
    },
    {
      title: "Phê duyệt yêu cầu",
      href: REDIRECT_URLS.ADMIN.REGISTRATION,
      icon: "managerPitch",
    },
    {
      title: "Người dùng",
      href: REDIRECT_URLS.ADMIN.USER,
      icon: "userSquare",
    },
    {
      title: "Tố cáo của người dùng",
      href: REDIRECT_URLS.ADMIN.REPORT,
      icon: "scrollText",
    },
    {
      title: "Quảng cáo",
      href: REDIRECT_URLS.ADMIN.ADVERTISEMENT,
      icon: "megaPhone",
    },
  ],
  sidebarNav: [
    {
      title: "Điều khiển",
      href: REDIRECT_URLS.ADMIN.OVERVIEW,
      icon: "chart",
    },
    {
      title: "Phê duyệt yêu cầu",
      href: REDIRECT_URLS.ADMIN.REGISTRATION,
      icon: "managerPitch",
    },
    {
      title: "Sân",
      href: REDIRECT_URLS.ADMIN.PITCH,
      icon: "layoutPanelLeft",
    },
    {
      title: "Người dùng",
      href: REDIRECT_URLS.ADMIN.USER,
      icon: "userSquare",
    },
    {
      title: "Tố cáo của người dùng",
      href: REDIRECT_URLS.ADMIN.REPORT,
      icon: "scrollText",
    },
    {
      title: "Quảng cáo",
      href: REDIRECT_URLS.ADMIN.ADVERTISEMENT,
      icon: "megaPhone",
    },
  ],
  notificationNav: [
    {
      title: "Tin nhắn",
      href: REDIRECT_URLS.ADMIN.MESSAGE,
      icon: "message",
    },
    {
      title: "Thông báo",
      href: REDIRECT_URLS.ADMIN.NOTIFICATION,
      icon: "notification",
    },
  ],
};

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Quản lý sân",
      href: REDIRECT_URLS.DASHBOARD.PITCH,
      icon: "layoutPanelLeft",
    },
    {
      title: "Quản lý đặt sân",
      href: REDIRECT_URLS.DASHBOARD.BOOKING,
      icon: "scrollText",
    },
    {
      title: "Voucher",
      href: REDIRECT_URLS.DASHBOARD.VOUCHER,
      icon: "ticket",
    },
    {
      title: "Quảng cáo",
      href: REDIRECT_URLS.DASHBOARD.ADVERTISEMENT,
      icon: "megaPhone",
    },
  ],
  sidebarNav: [
    {
      title: "Quản lý sân",
      href: REDIRECT_URLS.DASHBOARD.PITCH,
      icon: "layoutPanelLeft",
    },
    {
      title: "Quản lý đặt sân",
      href: REDIRECT_URLS.DASHBOARD.BOOKING,
      icon: "scrollText",
    },
    {
      title: "Voucher",
      href: REDIRECT_URLS.DASHBOARD.VOUCHER,
      icon: "ticket",
    },
    {
      title: "Quảng cáo",
      href: REDIRECT_URLS.DASHBOARD.ADVERTISEMENT,
      icon: "megaPhone",
    },
  ],
  notificationNav: [
    {
      title: "Tin nhắn",
      href: REDIRECT_URLS.DASHBOARD.MESSAGE,
      icon: "message",
    },
    {
      title: "Thông báo",
      href: REDIRECT_URLS.DASHBOARD.NOTIFICATION,
      icon: "notification",
    },
  ],
};

export const dashboardConfigOperator: DashboardConfig = {
  ...dashboardConfig,
  mainNav: [
    {
      title: "Điều khiển",
      href: REDIRECT_URLS.DASHBOARD.OVERVIEW,
      icon: "chart",
    },
    {
      title: "Nhân viên",
      href: REDIRECT_URLS.DASHBOARD.STAFF,
      icon: "userSquare",
    },
  ],
  sidebarNav: [
    {
      title: "Điều khiển",
      href: REDIRECT_URLS.DASHBOARD.OVERVIEW,
      icon: "chart",
    },
    {
      title: "Nhân viên",
      href: REDIRECT_URLS.DASHBOARD.STAFF,
      icon: "userSquare",
    },
    ...dashboardConfig.sidebarNav,
    {
      title: "Dịch vụ",
      href: REDIRECT_URLS.DASHBOARD.SERVICE,
      icon: "coffee",
    },
    // {
    //     title: "Quản trị viên",
    //     href: "/dashboard/admin",
    //     icon: "shield",
    // },
  ],
};

export const publicNavbarConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Tìm sân",
      href: "/#find-pitch",
    },
    {
      title: "Dành cho chủ sân",
      href: "/pitch",
    },
    {
      title: "Cộng đồng",
      href: "/community",
    },
    {
      title: "Liên hệ",
      href: "/contact",
    },
  ],
  sidebarNav: [
    {
      title: "Tìm sân",
      href: "/#find-pitch",
    },
    {
      title: "Dành cho chủ sân",
      href: "/pitch",
    },
    {
      title: "Cộng đồng",
      href: "/community",
    },
    {
      title: "Liên hệ",
      href: "/contact",
    },
  ],
};

export const accountNavConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Trang điều khiển",
      href: "/dashboard",
    },
    {
      title: "Thông tin cá nhân",
      href: "/account",
      icon: "userSquare",
    },
    {
      title: "Đổi mật khẩu",
      href: "/account/change-password",
      icon: "lock",
    },
  ],
  sidebarNav: [
    {
      title: "Trang điều khiển",
      href: "/dashboard/overview",
    },
    {
      title: "Thông tin cá nhân",
      href: "/account",
      icon: "userSquare",
    },
    {
      title: "Đổi mật khẩu",
      href: "/account/change-password",
      icon: "lock",
    },
  ],
};

export const personalNavConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Thông tin cá nhân",
      href: REDIRECT_URLS.PERSONAL.PROFILE,
      icon: "user",
    },
    {
      title: "Sân yêu thích",
      href: REDIRECT_URLS.PERSONAL.FAVORITE,
      icon: "favorite",
    },
    {
      title: "Lịch sử đặt sân",
      href: REDIRECT_URLS.PERSONAL.HISTORY,
      icon: "history",
    },
  ],
  sidebarNav: [
    {
      title: "Thông tin cá nhân",
      href: REDIRECT_URLS.PERSONAL.PROFILE,
      icon: "user",
    },
    {
      title: "Sân yêu thích",
      href: REDIRECT_URLS.PERSONAL.FAVORITE,
      icon: "favorite",
    },
    {
      title: "Lịch sử đặt sân",
      href: REDIRECT_URLS.PERSONAL.HISTORY,
      icon: "history",
    },
  ],
};

export const mainFooterConfig: NavItem[] = [
  {
    title: "Về chúng tôi",
    href: REDIRECT_URLS.ABOUT_US,
  },
  {
    title: "FAQ",
    href: REDIRECT_URLS.FAQ,
  },
  {
    title: "Liên hệ",
    href: REDIRECT_URLS.CONTACT,
  },
  {
    title: "Điều khoản sử dụng",
    href: REDIRECT_URLS.TERMS_OF_USE,
  },
  {
    title: "Chính sách bảo mật",
    href: REDIRECT_URLS.PRIVACY_POLICY,
  },
  {
    title: "Quyền riêng tư",
    href: REDIRECT_URLS.PRIVACY,
  },
];
