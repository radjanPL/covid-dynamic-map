import React, { useEffect, useState } from "react";
import { getStatuses } from "./api";
import { appSettings } from "./settings";
import keyBy from "lodash-es/keyBy";
import kebabCase from "lodash-es/kebabCase";

const StatusConfigContext = React.createContext();

export const StatusConfigProvider = ({ children }) => {
  const [statusColors, setStatusColors] = useState(
    appSettings.defaultStatusInfo
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const statuses = await getStatuses();
        
        const mapping = keyBy(
          statuses.map(s => ({
            ...s,
            key: kebabCase(s.status)
          })),
          "key"
        );

        setStatusColors(mapping);
      } catch (e) {}
    };

    getData();
  }, []);

  return (
    <StatusConfigContext.Provider value={statusColors}>
      {children}
    </StatusConfigContext.Provider>
  );
};

export function useStatusConfig() {
  const context = React.useContext(StatusConfigContext);
  if (context === undefined) {
    throw new Error(
      "useStatusConfig must be used within a StatusConfigProvider"
    );
  }
  return context;
}
