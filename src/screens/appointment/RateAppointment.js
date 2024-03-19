import React, { useState } from "react";
import Modal from "../../components/Modal";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import StarRating from "../../components/StarRating";
import { RateNewAppointment } from "../../util/fetch";
import { useAlertMessage } from "../../util/AuthProvider";

function RateAppointment({
  modalIsOpen,
  setIsOpen,
  selectedDoctor,
  setSelectedDoctor,
}) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState("");
  const { setMessageObj } = useAlertMessage();
  const handlerateAppointment = () => {
    if (rating === null) {
      return setErrors("Select a rating");
    }
    RateNewAppointment(selectedDoctor, { rating, comment }).then(() => {
      setSelectedDoctor(null);
      setRating(null);
      setIsOpen(false);
      setMessageObj((prev) => ({
        ...prev,
        alertOpen: true,
        type: "success",
        content: "Appointment Rated Successfully",
      }));
    });
  };
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      title="Rate An Appointment"
      width="500px"
    >
      <Box sx={{ padding: "11px" }}>
        <TextField
          id="standard-multiline-static"
          label="Comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={3}
          variant="standard"
        />

        <br />
        <br />
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography>Ratings:</Typography>
          <StarRating
            rating={rating}
            setRating={setRating}
            setErrors={setErrors}
          />
        </Box>
        {errors && (
          <FormHelperText sx={{ color: "red" }}>{errors}</FormHelperText>
        )}
        <br />
        <br />
        <Button variant="contained" onClick={handlerateAppointment}>
          Rate Appointment
        </Button>
      </Box>
    </Modal>
  );
}

export default RateAppointment;
