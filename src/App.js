import React  from 'react';
import './App.css';
import TapestryContextProvider from "./components/TapestryContextProvider";
import Tapestry from "./Tapestry";

function App() {
  return (
    <TapestryContextProvider>
      <Tapestry />
    </TapestryContextProvider>
  );
}

export default App;
