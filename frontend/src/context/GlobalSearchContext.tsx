import React, { FC, createContext, useContext, useMemo, useState } from "react";
import { IGlobalSearch } from "../types";

interface GlobalSearchContextType {
  globalSearch: IGlobalSearch;
  setGlobalSearch: React.Dispatch<React.SetStateAction<IGlobalSearch>>;
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(
  undefined
);

export const GlobalSearchProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [globalSearch, setGlobalSearch] = useState<IGlobalSearch>({
    location: "",
    checkin: "",
    checkout: "",
    page: 1,
    guests: { adults: 0, children: 0, infants: 0, pets: 0 },
  });

  const context = useMemo(
    () => ({ globalSearch, setGlobalSearch }),
    [globalSearch, setGlobalSearch]
  );

  return (
    <GlobalSearchContext.Provider value={context}>
      {children}
    </GlobalSearchContext.Provider>
  );
};

export const useGlobalSearchContext = () => {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearchContext must be used within a GlobalSearchContext"
    );
  }
  return context;
};
