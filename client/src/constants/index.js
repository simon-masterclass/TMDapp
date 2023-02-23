/** @format */

import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
  zero,
  colorcoins,
  home,
} from "../assets";

export const navlinks = [
  {
    name: "homebase",
    imgUrl: home,
    altxt: "homebase",
    link: "/",
  },
  {
    name: "dashboard",
    imgUrl: dashboard,
    altxt: "dashboard",
    link: "/",
  },
  {
    name: "treasury",
    imgUrl: colorcoins,
    altxt: "treasury",
    link: "/",
  },
  // {
  //   name: "payment",
  //   imgUrl: payment,
  //   link: "/",
  //   disabled: true,
  // },
  // {
  //   name: "withdraw",
  //   imgUrl: withdraw,
  //   altxt: "withdraw",
  //   link: "/",
  //   disabled: true,
  // },
  {
    name: "profile",
    imgUrl: profile,
    altxt: "profile",
    link: "/profile",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    altxt: "campaign",
    link: "/create-campaign",
  },
  // {
  //   name: "logout",
  //   imgUrl: logout,
  //   altxt: "logout",
  //   link: "/",
  //   disabled: true,
  // },
];
