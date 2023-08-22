import { useContext, createContext } from "react";

export const ProgramDataContext = createContext<any | undefined>(undefined);

// By creating useProgramData(), context will always have value anywhere in the child component unless it will through an error.
export const useProgramData = () => {
    const context = useContext(ProgramDataContext);
    if (!context) {
      throw new Error("The useProgramData() must be wrapped inside ProgramDataContext");
    }
  
    return context;
  };