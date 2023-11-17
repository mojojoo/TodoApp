/** @format */

import React from "react";
import { formatDistanceToNow } from "date-fns";

const TimeStamp = ({ timestamp }) => {
  /* const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    includeSeconds: true,
  }); */
  return <p className="text-[10px] text-end ">{timestamp}</p>;
};

export default TimeStamp;
