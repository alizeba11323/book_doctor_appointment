import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useModal, useModalType, useRerender } from "../../util/AuthProvider";
import { useEffect, useState } from "react";
import { GetAllAppointment } from "../../util/fetch";

function Appointment({ setSelectedDoctor }) {
  const { setIsOpen } = useModal();
  const { setCheckModal } = useModalType();
  const [appointments, setAppointments] = useState([]);
  const { rerender } = useRerender();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("logged_in"));
    GetAllAppointment(user.id).then((data) => setAppointments(data));
  }, [rerender]);
  const handleRate = (doctor) => {
    setIsOpen(true);
    setSelectedDoctor(doctor);
    setCheckModal("rate appointment");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {appointments?.map((app) => (
        <Card key={app.id}>
          <CardContent sx={{ padding: "0px 20px" }}>
            <Typography variant="h6" gutterBottom>
              {app.name}
            </Typography>

            <Typography
              sx={{ mt: 1.5, fontweight: "bold" }}
              color="text.primary"
            >
              Date: {app.date}
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
              Symptoms: {app.symptoms}
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
              PriorMedicalHistory: {app.priorMedicalHistory}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "10px" }}
              onClick={() => handleRate({ doctor_id: app.doctor_id })}
            >
              Rate Appointment
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Appointment;
