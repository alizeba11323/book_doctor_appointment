import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Star from "../../components/Star";

import Modal from "../../components/Modal";
import { GetDoctorDetails } from "../../util/fetch";

function DoctorDetails({ modalIsOpen, setIsOpen, selectedDoctor }) {
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    GetDoctorDetails(selectedDoctor.id).then((data) => setDoctor(data));
  }, [selectedDoctor.id]);
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      title="Doctor Details"
    >
      {doctor && (
        <Box sx={{ padding: "11px" }}>
          <Typography sx={{ fontSize: "20px", marginBottom: "10px" }}>
            {doctor.name}
          </Typography>
          <Typography>
            Total Experience: {doctor.total_experiance} years
          </Typography>
          <Typography>Speciality: {doctor.speciality.toUpperCase()}</Typography>
          <Typography>Date of Birth: {doctor.date_of_birth}</Typography>
          <Typography>city: {doctor.city}</Typography>
          <Typography>Email: {doctor.email}</Typography>
          <Typography>mobile: {doctor.mobile}</Typography>
          <Typography sx={{ display: "flex", gap: "10px" }}>
            Rating: <Star stars={doctor.rating} />
          </Typography>
        </Box>
      )}
    </Modal>
  );
}

export default DoctorDetails;
