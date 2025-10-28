import { useContext, useState, createContext, useEffect } from "react";
import {
  fetchCountries,
  fetchPackages,
  fetchAllTags,
} from "@services/directus/rest";
import { useQueryState } from "@hooks/useQueryState";

const TravelPackagesContext = createContext();

export default function TravelPackagesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [tags, setTags] = useState([]);

  const { getQueryState, executeQuery } = useQueryState();
  const packagesState = getQueryState("packages");

  useEffect(() => {
    getCountries();
    getTags();
  }, []);

  const getCountries = async () => {
    try {
      const res = await fetchCountries();
      setCountries(res);
    } catch (error) {}
  };

  const getTags = async () => {
    try {
      const res = await fetchAllTags();
      setTags(res);
    } catch (error) {}
  };

  const getPackages = (filter = null) => {
    executeQuery("packages", fetchPackages, `${filter}`);
  };

  // Update packages when packagesState.data changes
  useEffect(() => {
    if (packagesState.data) {
      setPackages(packagesState.data);
    }
  }, [packagesState.data]);

  return (
    <TravelPackagesContext.Provider
      value={{
        packages,
        getPackages,
        packagesState,
        countries,
        tags,
      }}
    >
      {children}
    </TravelPackagesContext.Provider>
  );
}

export const useTravelPackagesContext = () => useContext(TravelPackagesContext);
