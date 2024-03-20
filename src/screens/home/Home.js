import { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Modal from "../../components/Modal";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
import {
  useAlertMessage,
  useAuth,
  useModal,
  useModalType,
} from "../../util/AuthProvider";
import Login from "../login/Login";
import Register from "../register/Register";
import DoctorDetails from "../doctorList/DoctorDetails";
import BookAppointment from "../doctorList/BookAppointment";
import RateAppointment from "../appointment/RateAppointment";
import CustomMessage from "../../components/CustomMessage";

function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { checkModal, setCheckModal } = useModalType();
  const { modalIsOpen, setIsOpen } = useModal();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [value, setValue] = useState("doctors");
  const [open, setOpen] = useState(false);
  const [authValue, setAuthValue] = useState("login");
  const { messageObj, setMessageObj } = useAlertMessage();
  const { alertOpen, content, type } = messageObj;
  useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAuthChange = (event, newValue) => {
    setAuthValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setMessageObj((prev) => ({ ...prev, alertOpen: false }));
  };
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} />
      <CustomMessage
        openAlert={alertOpen}
        content={content}
        type={type}
        handleClose={handleCloseAlert}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.8) ", color: "white" }}
        >
          localhost:3000 says:
        </DialogTitle>
        <DialogContent
          sx={{
            width: "400px",
            backgroundColor: "rgba(0, 0, 0, 0.8) ",
            color: "white",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white" }}
          >
            {"Either the slot is already booked or not available"}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.8) ", color: "white" }}
        >
          <Button onClick={handleClose} autoFocus variant="contained">
            ok
          </Button>
        </DialogActions>
      </Dialog>
      {checkModal === "auth" ? (
        <Modal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setSelectedDoctor={setSelectedDoctor}
          title="Authentication"
          width="250px"
        >
          <TabContext value={authValue}>
            <Box sx={{ width: "90%", margin: "auto" }}>
              <TabList
                onChange={handleAuthChange}
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                textColor="inherit"
                variant="fullWidth"
              >
                <Tab value="login" label="Login" />
                <Tab value="register" label="Register" />
              </TabList>
            </Box>
            <TabPanel value="login">
              <Login />
            </TabPanel>
            <TabPanel value="register">
              <Register />
            </TabPanel>
          </TabContext>
        </Modal>
      ) : checkModal === "view details" ? (
        <DoctorDetails
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          selectedDoctor={selectedDoctor}
        />
      ) : checkModal === "book appointment" ? (
        <BookAppointment
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          selectedDoctor={selectedDoctor}
          setOpen={setOpen}
        />
      ) : (
        <RateAppointment
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab value="doctors" label="doctors" />
              <Tab value="appointment" label="appointment" />
            </TabList>
          </Box>
          <TabPanel value="doctors">
            <DoctorList
              setCheckModal={setCheckModal}
              setSelectedDoctor={setSelectedDoctor}
            />
          </TabPanel>
          <TabPanel value="appointment">
            {isLoggedIn ? (
              <Appointment setSelectedDoctor={setSelectedDoctor} />
            ) : (
              <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
                Login to See Appointments
              </Box>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Home;
