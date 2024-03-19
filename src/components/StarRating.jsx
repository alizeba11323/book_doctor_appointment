import { Star } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useState } from "react";

function StarRating({ rating, setRating, setErrors }) {
  const [hover, setHover] = useState(null);
  return (
    <Box sx={{ display: "flex", gap: "1px" }}>
      {Array.from({ length: 5 }, (number, index) => {
        return (
          <label>
            <input
              type="radio"
              id="rating"
              name="rating"
              value={index + 1}
              onChange={(e) => {
                setErrors("");
                setRating(e.target.value);
              }}
            />
            <Star
              key={index}
              sx={{
                cursor: "pointer",
                color: index + 1 <= (hover || rating) ? "#ffc107" : "lightgray",
              }}
              fontSize="small"
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </Box>
  );
}

export default StarRating;
