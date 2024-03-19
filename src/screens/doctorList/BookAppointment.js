import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "../../components/Modal";
import { BookNewAppointment, CheckAvailableSlot } from "../../util/fetch";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAlertMessage } from "../../util/AuthProvider";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
function BookAppointment({ modalIsOpen, setIsOpen, setOpen, selectedDoctor }) {
  const [data, setData] = useState({
    date: dayjs(new Date()),
    time_slot: "none",
    priorMedicalHistory: "",
    symptoms: "",
  });
  const [errors, setErrors] = useState({});
  const { setMessageObj } = useAlertMessage();

  const handleChange = (event) => {
    if (event.target.name === "date")
      setErrors((prev) => ({ ...prev, date: "" }));
    if (event.target.name === "time_slot")
      setErrors((prev) => ({ ...prev, time_slot: "" }));
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleClick = () => {
    if (data.date === "") {
      return setErrors((prev) => ({
        ...prev,
        date: "Select Appointment Date",
      }));
    } else if (data.time_slot === "none") {
      return setErrors((prev) => ({
        ...prev,
        time_slot: "Select a time slot",
      }));
    }
    const user = JSON.parse(localStorage.getItem("logged_in"));
    if (!user) {
      return setMessageObj((prev) => ({
        ...prev,
        alertOpen: true,
        type: "error",
        content: "Please Login First",
      }));
    }

    CheckAvailableSlot({ date: data.date, time_slot: data.time_slot }).then(
      (result) => {
        if (result.length > 0) {
          setOpen(true);
        } else {
          BookNewAppointment({
            ...data,
            name: selectedDoctor.name,
            user_id: user.id,
            doctor_id: selectedDoctor.id,
          }).then(() => {
            setIsOpen(false);
            setMessageObj((prev) => ({
              ...prev,
              alertOpen: true,
              type: "success",
              content: "Appointment Booked Successfully",
            }));
            setData({
              date: "",
              time_slot: "none",
              priorMedicalHistory: "",
              symptoms: "",
            });
          });
        }
      }
    );
  };
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      title="Book An Appointment"
      width="800px"
    >
      {selectedDoctor && (
        <Box sx={{ padding: "11px" }}>
          <TextField
            sx={{ width: "150px", marginBottom: "10px" }}
            id="standard-required"
            label="DoctorName"
            defaultValue={selectedDoctor?.name}
            variant="standard"
            disabled
            required
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ height: "50px" }}
                slotProps={{ textField: { variant: "standard" } }}
                minDate={dayjs(new Date().toISOString().split("T")[0])}
                value={data.date}
                onChange={(newVal) =>
                  setData((prev) => ({ ...prev, date: newVal }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <FormControl
            variant="standard"
            sx={{ minWidth: "150px", marginBottom: "10px" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Time Slot
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="time_slot"
              value={data.time_slot}
              onChange={handleChange}
              label="Time Slot"
              variant="standard"
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"04PM-05PM"}>04PM-05PM</MenuItem>
              <MenuItem value={"05PM-06PM"}>05PM-06PM</MenuItem>
              <MenuItem value={"06PM-07PM"}>06PM-07PM</MenuItem>
              <MenuItem value={"07PM-08PM"}>07PM-08PM</MenuItem>
              <MenuItem value={"08PM-09PM"}>08PM-09PM</MenuItem>
            </Select>
          </FormControl>
          {errors?.time_slot !== "" && (
            <FormHelperText sx={{ color: "red" }}>
              {errors?.time_slot}
            </FormHelperText>
          )}
          <br />

          <TextField
            id="standard-multiline-static"
            label="Medical History"
            name="priorMedicalHistory"
            value={data.priorMedicalHistory}
            onChange={handleChange}
            multiline
            rows={3}
            variant="standard"
          />
          <br />
          <br />
          <TextField
            id="standard-multiline-static"
            label="Symptoms"
            name="symptoms"
            value={data.symptoms}
            onChange={handleChange}
            multiline
            rows={3}
            variant="standard"
            placeholder={"ex Cold,Swelling Etc"}
          />
          <br />
          <br />
          <Button variant="contained" onClick={handleClick}>
            Book Appointment
          </Button>
        </Box>
      )}
    </Modal>
  );
}

export default BookAppointment;
