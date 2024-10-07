/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";
import { updateWeather, error404 } from "./app.js";
const defautLocation = "#/weather?lat=51.5073219&lon=0.1276474"; // London

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;

      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    },
    (err) => {
      window.location.hash = defautLocation;
    }
  );
};

/**
 *
 * @param {string} query Searched query
 */
export const searchedLocation = (query) => {
  console.log(...query.split("&"));
  updateWeather(...query.split("&"));
};
// updateWeather("lat=51.5073219", "lon=0.1276474")

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requetURL = window.location.hash.slice(1);

  const [route, query] = requetURL.includes("?")
    ? requetURL.split("?")
    : [requetURL];

  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    this.window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
