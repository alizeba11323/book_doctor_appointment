import React from "react";
import { Star as FullStar, StarHalf, StarOutline } from "@mui/icons-material";
import { Box } from "@mui/material";

function Star({ stars }) {
  return (
    <Box sx={{ display: "flex", gap: "1px" }}>
      {Array.from({ length: 5 }, (number, index) => {
        if (stars >= index + 1) {
          return <FullStar sx={{ color: "#ffc107" }} fontSize="small" />;
        } else if (stars >= index + 0.5) {
          return <StarHalf sx={{ color: "#ffc107" }} fontSize="small" />;
        } else {
          return <StarOutline sx={{ color: "#ffc107" }} fontSize="small" />;
        }
      })}
    </Box>
  );
}

export default Star;
