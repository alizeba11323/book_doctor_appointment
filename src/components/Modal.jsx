import ReactModal from "react-modal";
import "./Modal.css";
import { Box } from "@mui/material";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    margin: "0px",
    width: "200px",
    border: "1px solid lightgray",
  },
};

ReactModal.setAppElement("#root");
function Modal({ setIsOpen, modalIsOpen, title, children, width }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ content: { ...customStyles.content, width } }}
        contentLabel="Example Modal"
      >
        <p className="auth-heading">{title}</p>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </ReactModal>
    </div>
  );
}

export default Modal;
