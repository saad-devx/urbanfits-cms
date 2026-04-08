import { AccountIcon } from "@/public/sidebaricons/AccountIcon";
import { CartIcon } from "@/public/sidebaricons/CartIcon";
import { CategoriesIcon } from "@/public/sidebaricons/CategoriesIcon";
import { CouponIcon } from "@/public/sidebaricons/CouponIcon";
import { Dashboardicon } from "@/public/sidebaricons/Dashboardicon";
import { ProductIcon } from "@/public/sidebaricons/ProductIcon";
import { BannerIcon } from "@/public/sidebaricons/BannerIcon";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboardicon />,
    navlink: "/"
  },
  {
    label: "Carousels",
    icon: <BannerIcon />,
    subrows: [
      {
        label: "Home Carousel",
        navlink: "/carousels/home",
      },
      {
        label: "Catalogue Carousel",
        navlink: "/carousels/catalogue"
      }
    ]
  },
  {
    label: "Products",
    icon: <ProductIcon />,
    subrows: [
      {
        label: "All Products",
        navlink: "/products/",
      },
      {
        label: "Add New Product",
        navlink: "/products/addproduct",
      },
      {
        label: "Add Bundle",
        navlink: "/products/addbundle",
      }
    ],
  },
  {
    label: "Categories",
    icon: <CategoriesIcon />,
    subrows: [
      {
        label: "All Categories",
        navlink: "/productcategories"
      },
      {
        label: "Add New Category",
        navlink: "/productcategories",
      },
    ],
  },
  {
    label: "Orders",
    icon: <CartIcon />,
    navlink: "/orders",
  },
  {
    label: "Users",
    icon: <ProductIcon />,
    subrows: [
      {
        label: "All users",
        navlink: "/user/userlist",
      },
      {
        label: "User tasks",
        navlink: "/user/tasks",
      },
      {
        label: "Add New User",
        navlink: "/user/add-user",
      },
    ],
  },
  {
    label: "Settings",
    icon: <AccountIcon />,
    subrows: [
      {
        label: "General Settings",
        navlink: "/settings/general/",
      },
      {
        label: "Account Settings",
        navlink: "/settings/accounts",
      },
      {
        label: "Inventory Managment",
        navlink: "/settings/inventory",
      },
    ],
  },
  {
    label: "Coupon",
    icon: <CouponIcon />,
    subrows: [
      {
        label: "All Coupons",
        navlink: "/coupons",
      },
      {
        label: "Add New Coupon ",
        navlink: "/coupons/create-coupon",
      },
    ],
  },
];

export const SearchQueryData = [
  {
    label: "Dashboard",
    navlink: "/dashboard",
  },
  {
    label: "Profile",
    navlink: "/profile",
  },
  {
    label: "All Products",
    navlink: "/products/",
  },
  {
    label: "Add New Product",
    navlink: "/products/addproduct",
  },
  {
    label: "Add Bundle",
    navlink: "/products/addbundle",
  },
  {
    label: "All Categories",
    navlink: "/productcategories"
  },
  {
    label: "Add Category",
    navlink: "/productcategories",
  },
  {
    label: "All Orders",
    navlink: "/orders/neworder",
  },
  {
    label: "orderhistory",
    navlink: "/orders/orderhistory",
  },
  {
    label: "All Transactions",
    navlink: "/transactions/transaction",
  },
  {
    label: "All users",
    navlink: "/user/userlist",
  },
  {
    label: "Add New User",
    navlink: "/user/add-user",
  },
  {
    label: "General Settings",
    navlink: "/settings/general/",
  },
  {
    label: "Account Settings",
    navlink: "/settings/accounts",
  },
  {
    label: "Inventory Managment",
    navlink: "/settings/inventory",
  },
  {
    label: "All Coupon",
    navlink: "/coupon/allcoupon",
  },
  {
    label: "Add New Coupon ",
    navlink: "/coupons/create-coupon",
  },
  {
    label: "All Shipping Zone",
    navlink: "/shippingsettings/shipping",
  },
  {
    label: "Add Shipping Zone",
    navlink: "/shippingsettings/addzone",
  }
];