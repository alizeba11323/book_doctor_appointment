import { Alert, Snackbar } from "@mui/material";

function CustomMessage({ openAlert, handleClose, content, type = "success" }) {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
}

export default CustomMessage;
