import React, { useEffect, useState } from "react";
import { getGeoData } from "./api";

const USTopoStateContext = React.createContext(undefined);

export const USTopoProvider = ({ children }) => {
  const [geoData, setGeoData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getGeoData();
      setGeoData(data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <USTopoStateContext.Provider value={{ geoData, loading }}>
      {children}
    </USTopoStateContext.Provider>
  );
};

export function useUSTopo() {
  const context = React.useContext(USTopoStateContext);
  if (context === undefined) {
    throw new Error("useUSTopo must be used within a USTopoProvider");
  }
  return context;
}
