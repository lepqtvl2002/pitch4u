import { NavItem, type DashboardConfig } from "@/types";
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
      href: "/admin",
      icon: "chart",
    },
    {
      title: "Phê duyệt yêu cầu",
      href: "/admin/registration",
      icon: "managerPitch",
    },
    {
      title: "Người dùng",
      href: "/admin/user",
      icon: "userSquare",
    },
    {
      title: "Tố cáo của người dùng",
      href: "/admin/report",
      icon: "scrollText",
    },
    {
      title: "Quảng cáo",
      href: "/admin/advertisement",
      icon: "megaPhone",
    },
  ],
  sidebarNav: [
    {
      title: "Điều khiển",
      href: "/admin",
      icon: "chart",
    },
    {
      title: "Phê duyệt yêu cầu",
      href: "/admin/registration",
      icon: "managerPitch",
    },
    {
      title: "Sân bóng",
      href: "/admin/pitch",
      icon: "layoutPanelLeft",
    },
    {
      title: "Người dùng",
      href: "/admin/user",
      icon: "userSquare",
    },
    {
      title: "Tố cáo của người dùng",
      href: "/admin/report",
      icon: "scrollText",
    },
    {
      title: "Quảng cáo",
      href: "/admin/advertisement",
      icon: "megaPhone",
    },
  ],
  notificationNav: [
    {
      title: "Tin nhắn",
      href: "/admin/message",
      icon: "message",
    },
    {
      title: "Thông báo",
      href: "/admin/notification",
      icon: "notification",
    },
  ],
};

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Quản lý sân",
      href: "/dashboard/pitch",
      icon: "layoutPanelLeft",
    },
    {
      title: "Quản lý đặt sân",
      href: "/dashboard/booking",
      icon: "scrollText",
    },
    {
      title: "Voucher",
      href: "/dashboard/voucher",
      icon: "ticket",
    },
    {
      title: "Quảng cáo",
      href: "/dashboard/advertisement",
      icon: "megaPhone",
    },
  ],
  sidebarNav: [
    {
      title: "Quản lý sân",
      href: "/dashboard/pitch",
      icon: "layoutPanelLeft",
    },
    {
      title: "Quản lý đặt sân",
      href: "/dashboard/booking",
      icon: "scrollText",
    },
    {
      title: "Voucher",
      href: "/dashboard/voucher",
      icon: "ticket",
    },
    {
      title: "Quảng cáo",
      href: "/dashboard/advertisement",
      icon: "megaPhone",
    },
  ],
  notificationNav: [
    {
      title: "Tin nhắn",
      href: "/dashboard/message",
      icon: "message",
    },
    {
      title: "Thông báo",
      href: "/dashboard/notification",
      icon: "notification",
    },
  ],
};

export const dashboardConfigOperator: DashboardConfig = {
  ...dashboardConfig,
  mainNav: [
    {
      title: "Điều khiển",
      href: "/dashboard",
      icon: "chart",
    },
    {
      title: "Nhân viên",
      href: "/dashboard/staff",
      icon: "userSquare",
    },
  ],
  sidebarNav: [
    {
      title: "Điều khiển",
      href: "/dashboard",
      icon: "chart",
    },
    {
      title: "Nhân viên",
      href: "/dashboard/staff",
      icon: "userSquare",
    },
    ...dashboardConfig.sidebarNav,
    {
      title: "Dịch vụ",
      href: "/dashboard/service",
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
      href: "/personal/profile",
      icon: "user",
    },
    {
      title: "Sân yêu thích",
      href: "/personal/favorite",
      icon: "favorite",
    },
    {
      title: "Lịch sử đặt sân",
      href: "/personal/history",
      icon: "history",
    },
  ],
  sidebarNav: [
    {
      title: "Thông tin cá nhân",
      href: "/personal/profile",
      icon: "user",
    },
    {
      title: "Sân yêu thích",
      href: "/personal/favorite",
      icon: "favorite",
    },
    {
      title: "Lịch sử đặt sân",
      href: "/personal/history",
      icon: "history",
    },
  ],
};

export const mainFooterConfig: NavItem[] = [
  {
    title: "Về chúng tôi",
    href: "/about-us",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Liên hệ",
    href: "/contact",
  },
  {
    title: "Điều khoản sử dụng",
    href: "/terms-of-use",
  },
  {
    title: "Chính sách bảo mật",
    href: "/privacy-policy",
  },
  {
    title: "Quyền riêng tư",
    href: "/privacy",
  },
];
