import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { useUSTopo } from "./USTopoProvider";
import USOutline from "./USOutline";
import { useParams, useHistory } from "react-router-dom";
import { useStatusConfig } from "./StatusConfigProvider";
import { makeStyles, decomposeColor, recomposeColor } from "@material-ui/core";
import mapValues from "lodash-es/mapValues";
import mapKeys from "lodash-es/mapKeys";
import map from "lodash-es/map";

const shortid = require("shortid");
const blurId = shortid.generate();

const useStyles = makeStyles(theme => ({
  stateFill: ({ statusConfig }) => {
    const config = mapKeys(
      mapValues(statusConfig, v => ({ fill: v.color })),
      (v, key) => `&.map-state-status-${key}`
    );

    return {
      ...config,
      fillOpacity: 0.35,
      stroke: "none",
      "&:hover": { fillOpacity: 0.65 }
    };
  },
  stateOutline: ({ statusConfig }) => {
    const config = mapKeys(
      mapValues(statusConfig, v => ({ stroke: v.color })),
      (v, key) => `&.map-state-status-${key}`
    );

    return {
      ...config,
      fill: "none",
      opacity: 0.8,
      strokeWidth: 3
    };
  },
  selected: {
    "& path$stateFill": {
      fillOpacity: 1
    },
    "& path$stateOutline": {
      strokeWidth: 5,
      opacity: 1,
      stroke: "#fff"
    }
  },
  legend: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-evenly"
  },
  legendBox: ({ statusConfig }) => {
    const config = mapKeys(
      mapValues(statusConfig, v => ({
        backgroundColor: toRgba(v.color, 0.35),
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: toRgba(v.color, 0.8)
      })),
      (v, key) => `&.map-state-status-${key}`
    );

    return {
      width: theme.spacing(3),
      height: theme.spacing(3),
      ...config
    };
  },
  legendLabel: {
    textAlign: "center",
    maxWidth: 150
  },
  legendItem: {
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 0px",
    ...theme.typography.caption
  }
}));

const Map = ({ blurDeviation = 5 }) => {
  const d3Container = useRef(null);
  const statusConfig = useStatusConfig();
  const classes = useStyles({ statusConfig });

  const { state: currentState } = useParams();
  const { geoData: { states, mesh } = {}, loading } = useUSTopo();
  const { path } = useGeoPath(states);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }

    const svg = d3.select(d3Container.current);

    const defs = svg.append("defs");

    defs
      .append("filter")
      .attr("id", blurId)
      .append("feGaussianBlur")
      .attr("color-interpolation-filters", "sRGB") // for better results in Safari
      .attr("stdDeviation", blurDeviation);
  }, [loading, blurDeviation]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const svg = d3.select(d3Container.current);

    const defs = svg.select("defs");

    defs
      .selectAll("clipPath")
      .data(states.features)
      .enter()
      .append("clipPath")
      .attr("id", d => d.uuid)
      .append("path")
      .attr("d", path);

    const stateGroups = svg
      .attr("id", "state-map")
      .selectAll("g")
      .data(states.features);

    stateGroups.classed(
      classes.selected,
      d => d.properties.name === currentState
    );

    const statesElements = stateGroups.enter().append("g");

    statesElements
      .classed(classes.selected, d => d.properties.name === currentState)
      .on("click", d => history.replace(`/${d.properties.name}`));

    statesElements
      .append("path")
      .attr("d", path)
      .attr(
        "class",
        d => `${classes.stateFill} map-state-status-${d.properties.status}`
      );

    statesElements
      .append("path")
      .attr("d", path)
      .attr("clip-path", d => `url(#${d.uuid})`)
      .attr("filter", `url(#${blurId})`)
      .attr(
        "class",
        d => `${classes.stateOutline} map-state-status-${d.properties.status}`
      );
  }, [
    states,
    mesh,
    loading,
    blurDeviation,
    path,
    history,
    currentState,
    classes
  ]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const svg = d3.select(d3Container.current);

    svg
      .append("path")
      .datum(mesh)
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "#444")
      .style("stroke-width", 1);
  }, [mesh, path, loading]);

  return loading ? (
    <USOutline />
  ) : (
    <div>
      <div>
        <svg viewBox="0 0 975 610" ref={d3Container} />
      </div>
      <div className={classes.legend}>
        {map(statusConfig, (v, key) => (
          <div key={key} className={classes.legendItem}>
            <div
              className={`${classes.legendBox} map-state-status-${key}`}
            ></div>
            <div className={classes.legendLabel}>{v.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function toRgba(color, alpha) {
  const decomposed = decomposeColor(color);

  if (["rgb", "rgba"].indexOf(decomposed.type) === -1) {
    return recomposeColor(decomposed);
  }

  const [r, g, b] = decomposed.values;

  return recomposeColor({ type: "rgba", values: [r, g, b, alpha] });
}

function useGeoPath(featureCollection) {
  const [geoPath, setGeoPath] = useState({ path: null });

  useEffect(() => {
    if (!featureCollection) {
      return;
    }

    const path = d3.geoPath();

    setGeoPath({ path });
  }, [featureCollection]);

  return geoPath;
}

export default Map;
