import React  from "react";
import RoutingPage from "./RoutingPage";
import ModalProvider from "./Modals/ModalProvider";

function App() {

  return (
    <ModalProvider>
      <RoutingPage/>
    </ModalProvider>
  );
}

export default App;
