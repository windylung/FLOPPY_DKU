import React, { useContext, useEffect } from "react";

export const DBContext = React.createContext();

export const useDB = () => {
  return useContext(DBContext);
};
