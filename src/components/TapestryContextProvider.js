import React from "react";
import TapestryContext from "./TapestryContext";
import {useMachine} from "@xstate/react";
import {tapestryGameStateMachine} from "../state_machines/TapestryGameStateMachine";

const TapestryContextProvider = props => {
  const [currentState, sendEvent, gameStateService] = useMachine(tapestryGameStateMachine);
  return (
    <TapestryContext.Provider
      value={{ currentState: currentState, gameStateService: gameStateService }}
    >
      {props.children}
    </TapestryContext.Provider>
  );
};

export default TapestryContextProvider;
