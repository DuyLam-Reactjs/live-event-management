import ConfigImage from "../config/ConfigImage";
import {CImg} from "@coreui/react";
import React from "react";


const _nav = [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Live Event Management',
    route: '/Live',
    icon: <CImg style={{marginRight: '11px'}} src={ConfigImage.instreamAds} alt=""/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Content Live List',
        to: '/live/content-live-list',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Content List',
      //   to: '/instream-ads/content-list',
      // },
    ]
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Outstream Ads',
  //   icon: <CImg style={{marginRight: '11px'}} src={ConfigImage.outstreamAds} alt=""/>,
  // },
]



export default _nav
