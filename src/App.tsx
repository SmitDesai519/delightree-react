import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { UserDetails } from "./components/UserDetails";

function App() {
  return (
    <div className="app">
      <ChakraProvider>
        <UserDetails />
      </ChakraProvider>
    </div>
  );
}

export default App;
