import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Star from "../../components/Star";
import { useModal } from "../../util/AuthProvider";
import { GetAllDoctors } from "../../util/fetch";

function DoctorList({ setCheckModal, setSelectedDoctor }) {
  const [speciality, setSpeciality] = useState("");
  const [doctors, setDoctors] = useState([]);
  const { setIsOpen } = useModal();

  useEffect(() => {
    GetAllDoctors().then((data) => setDoctors(data));
  }, []);
  const handleChange = (e) => {
    setSpeciality(e.target.value);
  };
  const dr_speciality = [
    "General Physician",
    "Orthopedics",
    "Pediatrics",
    "Gyneacology",
  ];

  const getAllDoctor =
    speciality !== ""
      ? doctors.filter((dr) => dr.speciality === speciality)
      : doctors;
  const handleViewDetails = (checkModalType, doctor) => {
    setIsOpen(true);
    setCheckModal(checkModalType);
    setSelectedDoctor(doctor);
  };

  return (
    <Box
      sx={{
        padding: "0px 10px",
        maxWidth: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          marginBottom: "0px",
          padding: "0",
          fontWeight: "500",
          display: "flex",
          flexDirection: "column",
          width: "130px",
        }}
      >
        <p
          style={{
            alignItems: "flex-start",
            margin: "0",
            padding: "0",
            marginLeft: "5px",
            marginBottom: "5px",
          }}
        >
          Select Speciality:
        </p>
        <FormControl variant="filled" sx={{ minWidth: "200px" }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={speciality}
            onChange={handleChange}
            label="speciality"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {dr_speciality.map((sp) => (
              <MenuItem value={sp}>{sp.toUpperCase()}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {getAllDoctor.map((doctor) => (
        <Card sx={{ width: "500px" }} key={doctor.id}>
          <CardContent sx={{ padding: "0px 20px" }}>
            <Typography variant="h6" gutterBottom>
              Doctor Name: {doctor.name}
            </Typography>

            <Typography
              sx={{ mt: 1.5, fontweight: "bold" }}
              color="text.primary"
            >
              Speciality: {doctor.speciality}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontweight: "bold",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
              color="text.primary"
            >
              Rating: <Star stars={doctor.rating} />
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleViewDetails("book appointment", doctor)}
              >
                Book Appointment
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleViewDetails("view details", doctor)}
              >
                View Details
              </Button>
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default DoctorList;
