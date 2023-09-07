import { NavItem, type DashboardConfig } from "@/types";
export const siteConfig = {
    name: "Pitch4u",
    description:
        "Tìm sân, tìm đồng dội, tìm đối thủ, tìm niềm vui sân cỏ.",
    // url: "https://pitch4u.com",
    url:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_APP_URL,
    ogImage: "https://necter.com/og.jpg",
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

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Điều khiển",
            href: "/dashboard",
            icon: "layoutPanelLeft",
        },
        {
            title: "Người dùng",
            href: "/dashboard/user",
            icon: "userSquare",
        },
        {
            title: "Giao dịch",
            href: "/dashboard/transaction",
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
            title: "Điều khiển",
            href: "/dashboard",
            icon: "layoutPanelLeft",
        },
        {
            title: "Người dùng",
            href: "/dashboard/user",
            icon: "userSquare",
        },
        {
            title: "Giao dịch",
            href: "/dashboard/transaction",
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
};

export const dashboardConfigOperator: DashboardConfig = {
    ...dashboardConfig,
    sidebarNav: [
        ...dashboardConfig.sidebarNav,
        {
            title: "Dịch vụ",
            href: "/dashboard/service",
            icon: "coffee",
        },
        {
            title: "Quản trị viên",
            href: "/dashboard/admin",
            icon: "shield",
        },
    ],
};

export const publicNavbarConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Trang chủ",
            href: "/",
        },
        {
            title: "Tìm sân",
            href: "/#find-pitch",
        },
        {
            title: "Đăng ký làm chủ sân",
            href: "/register-fieldmaster",
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
    sidebarNav: [],
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
