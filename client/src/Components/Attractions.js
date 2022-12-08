import {
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  Divider,
  Icon,
  Stack,
  ListItem,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  AppBar,
  Typography,
  Avatar,
} from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import actions from "../actions";
import attractionsData from "../services/getApiData";
// const data = [
//   {
//     location_id: "0",
//     name: "Bars & Clubs",
//     latitude: "40.72598",
//     longitude: "-73.93964",
//     num_reviews: "9842",
//     timezone: "America/New_York",
//     location_string: "Brooklyn, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/0e/5b/73/b6/street-art-in-greenpoint.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/0e/5b/73/b6/street-art-in-greenpoint.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1001",
//           url: "https://media-cdn.tripadvisor.com/media/photo-o/0e/5b/73/b6/street-art-in-greenpoint.jpg",
//           height: "1500",
//         },
//         large: {
//           width: "300",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/0e/5b/73/b6/street-art-in-greenpoint.jpg",
//           height: "450",
//         },
//         medium: {
//           width: "137",
//           url: "https://media-cdn.tripadvisor.com/media/photo-f/0e/5b/73/b6/street-art-in-greenpoint.jpg",
//           height: "205",
//         },
//       },
//       is_blessed: false,
//       uploaded_date: "2017-02-06T05:45:42-0500",
//       caption: "Street art in Greenpoint",
//       id: "240874422",
//       helpful_votes: "0",
//       published_date: "2017-02-06T05:45:42-0500",
//       user: {
//         user_id: null,
//         member_id: "0",
//         type: "user",
//       },
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.6348402889000156",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "Brooklyn",
//         abbrv: null,
//         location_id: "60827",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "20",
//         name: "Nightlife",
//       },
//     ],
//     parent_display_name: "Brooklyn",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "278 Nassau Ave",
//       street2: null,
//       city: "Brooklyn",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-3701",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "99",
//         name: "Bars & Clubs",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$5.35",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: false,
//     },
//     rollup_count: 383,
//   },
//   {
//     location_id: "0",
//     name: "Taxis & Shuttles",
//     latitude: "40.73787",
//     longitude: "-73.93394",
//     num_reviews: "532",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/23/5c/6b/cb/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/23/5c/6b/cb/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/23/5c/6b/cb/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/23/5c/6b/cb/caption.jpg",
//           height: "683",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/23/5c/6b/cb/caption.jpg",
//           height: "367",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2022-05-10T13:22:26-0400",
//       caption: "",
//       id: "593259467",
//       helpful_votes: "0",
//       published_date: "2022-05-10T13:22:26-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8153888318532356",
//     distance_string: null,
//     bearing: "north",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "59",
//         name: "Transportation",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "3272 Gale Ave",
//       street2: null,
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11101-2523",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "182",
//         name: "Taxis & Shuttles",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: false,
//     rollup_count: 50,
//   },
//   {
//     location_id: "0",
//     name: "Bike Tours",
//     latitude: "40.72463",
//     longitude: "-73.94214",
//     num_reviews: "10253",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/19/11/c0/49/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/19/11/c0/49/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/19/11/c0/49/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/19/11/c0/49/caption.jpg",
//           height: "682",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/19/11/c0/49/caption.jpg",
//           height: "366",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-08-31T18:41:35-0400",
//       caption: "",
//       id: "420593737",
//       helpful_votes: "1",
//       published_date: "2019-08-31T18:41:35-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8840477219436815",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "61",
//         name: "Outdoor Activities",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "159 Monitor St",
//       street2: "Apt 1",
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-7144",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "214",
//         name: "Bike Tours",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: false,
//     rollup_count: 20,
//   },
//   {
//     location_id: "0",
//     name: "Gear Rentals",
//     latitude: "40.72463",
//     longitude: "-73.94214",
//     num_reviews: "851",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/19/11/c0/49/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/19/11/c0/49/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/19/11/c0/49/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/19/11/c0/49/caption.jpg",
//           height: "682",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/19/11/c0/49/caption.jpg",
//           height: "366",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-08-31T18:41:35-0400",
//       caption: "",
//       id: "420593737",
//       helpful_votes: "1",
//       published_date: "2019-08-31T18:41:35-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8840477219436815",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "61",
//         name: "Outdoor Activities",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "159 Monitor St",
//       street2: "Apt 1",
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-7144",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "186",
//         name: "Gear Rentals",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: false,
//     rollup_count: 13,
//   },
//   {
//     location_id: "0",
//     name: "Private Tours",
//     latitude: "40.72463",
//     longitude: "-73.94214",
//     num_reviews: "10715",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/19/11/c0/49/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/19/11/c0/49/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/19/11/c0/49/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/19/11/c0/49/caption.jpg",
//           height: "682",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/19/11/c0/49/caption.jpg",
//           height: "366",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-08-31T18:41:35-0400",
//       caption: "",
//       id: "420593737",
//       helpful_votes: "1",
//       published_date: "2019-08-31T18:41:35-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8840477219436815",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "42",
//         name: "Tours",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "159 Monitor St",
//       street2: "Apt 1",
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-7144",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "235",
//         name: "Private Tours",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$90.00",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: true,
//     },
//     rollup_count: 87,
//   },
//   {
//     location_id: "0",
//     name: "Self-Guided Tours & Rentals",
//     latitude: "40.72463",
//     longitude: "-73.94214",
//     num_reviews: "803",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/19/11/c0/49/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/19/11/c0/49/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/19/11/c0/49/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/19/11/c0/49/caption.jpg",
//           height: "682",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/19/11/c0/49/caption.jpg",
//           height: "366",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-08-31T18:41:35-0400",
//       caption: "",
//       id: "420593737",
//       helpful_votes: "1",
//       published_date: "2019-08-31T18:41:35-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8840477219436815",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "42",
//         name: "Tours",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "159 Monitor St",
//       street2: "Apt 1",
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-7144",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "237",
//         name: "Self-Guided Tours & Rentals",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$175.00",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: false,
//     },
//     rollup_count: 18,
//   },
//   {
//     location_id: "0",
//     name: "Day Trips",
//     latitude: "40.72463",
//     longitude: "-73.94214",
//     num_reviews: "1480",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/19/11/c0/49/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/19/11/c0/49/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/19/11/c0/49/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/19/11/c0/49/caption.jpg",
//           height: "682",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/19/11/c0/49/caption.jpg",
//           height: "366",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-08-31T18:41:35-0400",
//       caption: "",
//       id: "420593737",
//       helpful_votes: "1",
//       published_date: "2019-08-31T18:41:35-0400",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.8840477219436815",
//     distance_string: null,
//     bearing: "southwest",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "42",
//         name: "Tours",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "159 Monitor St",
//       street2: "Apt 1",
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "11222-7144",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "287",
//         name: "Day Trips",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$90.00",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: true,
//     },
//     rollup_count: 58,
//   },
//   {
//     location_id: "0",
//     name: "Walking Tours",
//     latitude: "40.732494",
//     longitude: "-73.924805",
//     num_reviews: "21631",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/1a/67/d3/7a/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/1a/67/d3/7a/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/67/d3/7a/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/1a/67/d3/7a/caption.jpg",
//           height: "683",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/67/d3/7a/caption.jpg",
//           height: "367",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-12-27T03:16:20-0500",
//       caption: "",
//       id: "443011962",
//       helpful_votes: "0",
//       published_date: "2019-12-27T03:16:20-0500",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.9048637419194466",
//     distance_string: null,
//     bearing: "east",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "42",
//         name: "Tours",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "Kyiv",
//       street2: null,
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "04213",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "183",
//         name: "Walking Tours",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$81.00",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: true,
//     },
//     rollup_count: 64,
//   },
//   {
//     location_id: "0",
//     name: "Photography Tours",
//     latitude: "40.732494",
//     longitude: "-73.924805",
//     num_reviews: "1551",
//     timezone: "America/New_York",
//     location_string: "New York City, New York",
//     photo: {
//       images: {
//         small: {
//           width: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/1a/67/d3/7a/caption.jpg",
//           height: "150",
//         },
//         thumbnail: {
//           width: "50",
//           url: "https://media-cdn.tripadvisor.com/media/photo-t/1a/67/d3/7a/caption.jpg",
//           height: "50",
//         },
//         original: {
//           width: "1280",
//           url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/67/d3/7a/caption.jpg",
//           height: "853",
//         },
//         large: {
//           width: "1024",
//           url: "https://media-cdn.tripadvisor.com/media/photo-w/1a/67/d3/7a/caption.jpg",
//           height: "683",
//         },
//         medium: {
//           width: "550",
//           url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/67/d3/7a/caption.jpg",
//           height: "367",
//         },
//       },
//       is_blessed: true,
//       uploaded_date: "2019-12-27T03:16:20-0500",
//       caption: "",
//       id: "443011962",
//       helpful_votes: "0",
//       published_date: "2019-12-27T03:16:20-0500",
//       user: null,
//     },
//     awards: [],
//     doubleclick_zone: "na.us.ny.long_island_city",
//     distance: "0.9048637419194466",
//     distance_string: null,
//     bearing: "east",
//     is_closed: false,
//     is_long_closed: false,
//     description:
//       "Bars, also known as pubs or taverns, are establishments that serve beer and other alcohol, often with a light food menu. Nightclubs also serve alcohol, but they typically offer more cocktails and contain a dance floor with a stage for DJs or live music.",
//     web_url: "https://www.tripadvisor.com/Attractions",
//     write_review: "https://www.tripadvisor.com",
//     ancestors: [
//       {
//         subcategory: [
//           {
//             key: "city",
//             name: "City",
//           },
//         ],
//         name: "New York City",
//         abbrv: null,
//         location_id: "60763",
//       },
//       {
//         subcategory: [
//           {
//             key: "state",
//             name: "State",
//           },
//         ],
//         name: "New York",
//         abbrv: "NY",
//         location_id: "28953",
//       },
//       {
//         subcategory: [
//           {
//             key: "country",
//             name: "Country",
//           },
//         ],
//         name: "United States",
//         abbrv: null,
//         location_id: "191",
//       },
//     ],
//     category: {
//       key: "rollup",
//       name: "Rollup",
//     },
//     subcategory: [
//       {
//         key: "42",
//         name: "Tours",
//       },
//     ],
//     parent_display_name: "New York City",
//     is_jfy_enabled: false,
//     nearest_metro_station: [],
//     address_obj: {
//       street1: "Kyiv",
//       street2: null,
//       city: "New York City",
//       state: "NY",
//       country: "United States",
//       postalcode: "04213",
//     },
//     address: "",
//     is_candidate_for_contact_info_suppression: false,
//     subtype: [
//       {
//         key: "269",
//         name: "Photography Tours",
//       },
//     ],
//     rollup_category: {
//       key: "attraction",
//       name: "Attraction",
//     },
//     rollup_contains_bookable: true,
//     booking: {
//       provider: "Viator",
//       url: "https://www.tripadvisor.com",
//     },
//     offer_group: {
//       lowest_price: "$100.00",
//       has_see_all_url: true,
//       is_eligible_for_ap_list: false,
//     },
//     rollup_count: 15,
//   },
// ];

const Attractions = () => {
  const [savedButton, setSavedButton] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await attractionsData.getAttractionsData("austin", 1, 5.0);
        if (data.length === 0) {
          return;
        }

        setAttractions(data);

        setLoading(false);
      } catch (e) {
        return e;
      }
    }
    fetchData();
  }, []);
  const buttonForSaved = () => {
    setSavedButton(!savedButton);
  };
  if (loading) return <div>Loading...</div>;
  else {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Paper elevation={3}>
            <Box sx={{ pt: "3rem", pb: "1rem" }}>
              <Typography
                variant="h5"
                component="div"
                fontWeight="fontWeightBold"
              >
                Top Attractions In Your Area
              </Typography>
            </Box>

            <Card style={{ padding: "1.5rem" }}>
              {attractions.map((attraction, index) => (
                <Box sx={{ p: 1 }}>
                  <Divider
                    style={{
                      backgroundColor: "blue",
                      paddingTop: 0.5,
                      paddingBottom: 0.5,
                      marginTop: "1rem",

                      marginBottom: "1rem",
                    }}
                  />

                  <div>
                    <Grid container>
                      <Grid item xs={12} sm={9} md={8} lg={7}>
                        <Avatar sx={{ backgroundColor: "primary.main", mr: 2 }}>
                          {index + 1}
                        </Avatar>

                        <Typography
                          variant="h6"
                          component="div"
                          fontWeight="fontWeightBold"
                        >
                          {attraction.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          style={{ paddingTop: "1rem" }}
                        >
                          {attraction.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3} md={4} lg={5}>
                        {savedButton ? (
                          <Button
                            id={attraction.location_id}
                            onClick={buttonForSaved}
                          >
                            <TurnedInIcon />
                            <Typography variant="body2">
                              Remove From Bin
                            </Typography>
                          </Button>
                        ) : (
                          <Button onClick={buttonForSaved}>
                            <TurnedInNotIcon />
                            <Typography variant="body2">Add To Bin</Typography>
                          </Button>
                        )}

                        {attraction.photo?.images?.original?.url ? (
                          <CardMedia
                            component="img"
                            height="180"
                            image={attraction.photo.images.original.url}
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="180"
                            image="https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg"
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="body2" fontWeight="fontWeightLight">
                      {" "}
                      Situated at the tip of Apollo’s Blunder in South Mumbai,
                      the Gateway of India is a great place to start your
                      sightseeing in Mumbai. The gateway was built in 1924, in
                      memorial to King George V of England, who landed in India
                      at the same place in 1911. The last British troops also
                      departed through this gateway after Indian Independence in
                      1948.
                    </Typography>
                  </div>
                </Box>
              ))}
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="div">
                Map
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Attractions;
