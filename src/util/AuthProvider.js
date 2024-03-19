import { createContext, useContext, useState } from "react";
const UserContext = createContext();
const ModalContext = createContext();
const MessageContext = createContext();
const ModalTypeContext = createContext();
const RerenderContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rerender, setReRender] = useState(false);
  const [messageObj, setMessageObj] = useState({
    alertOpen: false,
    content: "",
    type: "success",
  });
  const [checkModal, setCheckModal] = useState("auth");

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <ModalContext.Provider value={{ modalIsOpen, setIsOpen }}>
        <ModalTypeContext.Provider value={{ checkModal, setCheckModal }}>
          <RerenderContext.Provider value={{ rerender, setReRender }}>
            <MessageContext.Provider value={{ messageObj, setMessageObj }}>
              {children}
            </MessageContext.Provider>
          </RerenderContext.Provider>
        </ModalTypeContext.Provider>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export const useModal = () => useContext(ModalContext);
export const useModalType = () => useContext(ModalTypeContext);
export const useRerender = () => useContext(RerenderContext);
export const useAlertMessage = () => useContext(MessageContext);
export default AuthProvider;
