import { Button } from "@mui/material";
import logo from "../../assets/logo.jpeg";
import "./Header.css";
import {
  useAlertMessage,
  useAuth,
  useModalType,
} from "../../util/AuthProvider";

function Header({ isLoggedIn, setIsOpen }) {
  const { setIsLoggedIn } = useAuth();
  const { setCheckModal } = useModalType();
  const { setMessageObj } = useAlertMessage();
  function openModal() {
    setIsOpen(true);
    setCheckModal("auth");
  }

  function handleLogout() {
    localStorage.removeItem("logged_in");
    setIsLoggedIn(false);
    setMessageObj((prev) => ({
      ...prev,
      alertOpen: true,
      type: "success",
      content: "Logged Out Successfully",
    }));
  }
  return (
    <div className="navbar-header">
      <div className="app-logo">
        <span className="logo">
          <img src={logo} alt="logo" />
        </span>
        <h2>Doctor Finder</h2>
      </div>
      <div>
        {isLoggedIn ? (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={openModal}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
