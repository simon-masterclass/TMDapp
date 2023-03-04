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
    name: "Homebase",
    imgUrl: home,
    altxt: "homebase",
    link: "/",
  },
  {
    name: "Campaigns",
    imgUrl: dashboard,
    altxt: "Campaigns",
    link: "/campaigns",
  },
  {
    name: "Treasury",
    imgUrl: colorcoins,
    altxt: "treasury",
    link: "/treasury",
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
    name: "Profile",
    imgUrl: profile,
    altxt: "profile",
    link: "/profile",
  },
  {
    name: "Create Campaign",
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
