import React, { useState, useEffect } from "react";
import { makeStyles, Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getStateInfo } from "./api";

const useStyles = makeStyles(theme => ({
  root: {
    "& p": {},
    "& ul,& ol":{
      display: "inline-block",
      textAlign: "left",
      paddingInlineStart: 0,
      "padding-inline-start": 0
    }
  },
  loadingSectionTitle: {
    width: "80%",
    maxWidth: 600,
    marginBottom: theme.spacing(2)
  },
  loadingSectionParagraph: {
    width: "100%",
    maxWidth: 800
  }
}));

export default function StateInfo() {
  const classes = useStyles();
  const { state: selectedState } = useParams();
  const [loading, setLoading] = useState(false);
  const [stateInfo, setStateInfo] = useState();

  useEffect(() => {
    if (!selectedState) {
      return;
    }

    const fetchStateInfo = async () => {
      setLoading(true);
      const info = await getStateInfo(selectedState);
      setStateInfo(info);
      setLoading(false);
    };

    fetchStateInfo();
  }, [selectedState]);

  if (loading) {
    return (
      <Box
        className={classes.root}
        display="flex"
        justifyItems="center"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton animation="wave" className={classes.loadingSectionTitle} />
        <Skeleton
          animation="wave"
          className={classes.loadingSectionParagraph}
        />
        <Skeleton
          animation="wave"
          className={classes.loadingSectionParagraph}
        />
        <Skeleton
          animation="wave"
          className={classes.loadingSectionParagraph}
        />
        <Skeleton
          animation="wave"
          className={classes.loadingSectionParagraph}
        />
        <Skeleton
          animation="wave"
          className={classes.loadingSectionParagraph}
        />
      </Box>
    );
  }

  if (!stateInfo) {
    return (
      <Box className={classes.root}>
        <ReactMarkdown source="## Select A State" />
        <ReactMarkdown source="Select a state to see the latest updates." />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <ReactMarkdown source={stateInfo.title} />
      {stateInfo.paragraph1 && <ReactMarkdown source={stateInfo.paragraph1} />}
      {stateInfo.paragraph2 && <ReactMarkdown source={stateInfo.paragraph2} />}
      {stateInfo.paragraph3 && <ReactMarkdown source={stateInfo.paragraph3} />}
      {stateInfo.paragraph4 && <ReactMarkdown source={stateInfo.paragraph4} />}
      {stateInfo.paragraph5 && <ReactMarkdown source={stateInfo.paragraph5} />}
      {stateInfo.paragraph6 && <ReactMarkdown source={stateInfo.paragraph6} />}
      {stateInfo.paragraph7 && <ReactMarkdown source={stateInfo.paragraph7} />}
      {stateInfo.paragraph8 && <ReactMarkdown source={stateInfo.paragraph8} />}
      {stateInfo.paragraph9 && <ReactMarkdown source={stateInfo.paragraph9} />}
      {stateInfo.paragraph10 && (
        <ReactMarkdown source={stateInfo.paragraph10} />
      )}
    </Box>
  );
}
