/** @format */

import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../../../public/assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    altTxt: "dashboard",
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    altTxt: "create campaign",
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    altTxt: "payment",
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    altTxt: "withdraw",
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    altTxt: "profile",
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    altTxt: "logout",
    link: "/",
    disabled: true,
  },
];
