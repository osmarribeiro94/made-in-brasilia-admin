import React, { createContext, useContext, useState } from "react";
import iCity from "../dtos/iCity";
import { iPost } from "../dtos/iPost";

type DataControlContextProps = {
  refreshCityData: boolean;
  setRefreshCityData: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPostData: boolean;
  setRefreshPostData: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCity: iCity | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<iCity | null>>;
  selectedPost: iPost | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<iPost | null>>;
};

const DataControlContext = createContext<DataControlContextProps>({
  refreshCityData: false,
  setRefreshCityData: () => {},
  refreshPostData: false,
  setRefreshPostData: () => {},
  selectedCity: null,
  setSelectedCity: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
});

type ChildrenProps = {
  children: React.ReactNode;
};

export const DataControlProvider = ({ children }: ChildrenProps) => {
  const [refreshCityData, setRefreshCityData] = useState<boolean>(false);
  const [refreshPostData, setRefreshPostData] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<iCity | null>(null);
  const [selectedPost, setSelectedPost] = useState<iPost | null>(null);

  return (
    <DataControlContext.Provider
      value={{
        refreshCityData,
        setRefreshCityData,
        refreshPostData,
        setRefreshPostData,
        selectedCity,
        setSelectedCity,
        selectedPost,
        setSelectedPost,
      }}
    >
      {children}
    </DataControlContext.Provider>
  );
};

export const useDataControlContext = () => useContext(DataControlContext);
