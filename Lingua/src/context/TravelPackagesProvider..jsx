import { useContext, useState, createContext, useEffect } from "react"
import {
  fetchCountries,
  fetchPackages,
  searchPackages,
} from "@services/directus/rest"
import { useQueryState } from "@hooks/useQueryState"

const TravelPackagesContext = createContext()

export default function TravelPackagesProvider({ children }) {
  const [countries, setCountries] = useState([{ name: "All" }])
  const [filter, setFilter] = useState("All")

  const [packages, setPackages] = useState([])

  const { getQueryState, executeQuery } = useQueryState()
  const packagesState = getQueryState("packages")

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesRes = await fetchCountries()
        setCountries([{ name: "All" }, ...countriesRes])
      } catch (error) {}
    }
    getCountries()
  }, [])

  const getPackages = (filter = null) => {
    if (!filter || filter === "All") {
      executeQuery("packages", fetchPackages)
      setPackages(packagesState.data)
    } else {
      executeQuery(
        "packages",
        fetchPackages,
        `filter[country][name][_eq]=${filter}`
      )
    }
  }

  const searchPackage = (searchQuery) => {
    executeQuery("packages", searchPackages, searchQuery)
    setFilter("All")
  }

  return (
    <TravelPackagesContext.Provider
      value={{
        packages,
        setPackages,
        getPackages,
        searchPackage,
        packagesState,
        countries,
        setCountries,
        filter,
        setFilter,
      }}
    >
      {children}
    </TravelPackagesContext.Provider>
  )
}

export const useTravelPackagesContext = () => useContext(TravelPackagesContext)
