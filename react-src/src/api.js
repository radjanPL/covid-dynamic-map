import axios from "axios";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { appSettings } from "./settings";
import keyBy from "lodash-es/keyBy";
import kebabCase from "lodash-es/kebabCase";
const shortid = require("shortid");

const baseUrl = appSettings.apiUrl;

let stateStatuses = [];
export async function getStateStatus() {
  if (stateStatuses.length) {
    return Promise.resolve(stateStatuses);
  }

  const { data } = await axios.get(`${baseUrl}/state-status`);

  stateStatuses = [...data];

  return stateStatuses;
}

let statuses = [];
export async function getStatuses() {
  if (statuses.length) {
    return Promise.resolve(statuses);
  }

  const { data } = await axios.get(`${baseUrl}/statuses`);

  statuses = [...data];

  return statuses;
}

export async function getStateInfo(state) {
  const { data } = await axios.get(`${baseUrl}/state-info/${state}`);

  return (
    data || {
      title: `## There is currently no information available for ${state}`
    }
  );
}

export async function getGeoData() {
  const [us, stateStatuses] = await Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"),
    getStateStatus()
  ]);

  const states = topojson.feature(us, us.objects.states);
  const mesh = topojson.mesh(us, us.objects.states);
  const stateInfo = normalizeStateStatus(stateStatuses);

  states.features.forEach((d, i) => {
    d.properties.status =
      (stateInfo[d.properties.name] &&
        stateInfo[d.properties.name].normalizedStatus) ||
      "normal";

    d.uuid = shortid.generate();
  });

  return { states, mesh };
}

function normalizeStateStatus(stateStatuses) {
  return keyBy(
    stateStatuses.map(s => ({
      ...s,
      normalizedStatus: kebabCase(s.status)
    })),
    "state"
  );
}
