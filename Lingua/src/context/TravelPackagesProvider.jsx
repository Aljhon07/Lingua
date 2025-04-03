import { useContext, useState, createContext, useEffect } from "react"
import { fetchCountries, fetchPackages } from "@services/directus/rest"
import { useQueryState } from "@hooks/useQueryState"

const TravelPackagesContext = createContext()

export default function TravelPackagesProvider({ children }) {
  const [countries, setCountries] = useState([])
  const [packages, setPackages] = useState([])

  const { getQueryState, executeQuery } = useQueryState()
  const packagesState = getQueryState("packages")

  useEffect(() => {
    getCountries()
  }, [])

  const getCountries = async () => {
    try {
      const res = await fetchCountries()
      setCountries(res)
    } catch (error) {}
  }

  const getPackages = (filter = null) => {
    executeQuery("packages", fetchPackages, `${filter}`)
    setPackages(packagesState.data)
  }

  return (
    <TravelPackagesContext.Provider
      value={{
        packages,
        getPackages,
        packagesState,
        countries,
      }}
    >
      {children}
    </TravelPackagesContext.Provider>
  )
}

export const useTravelPackagesContext = () => useContext(TravelPackagesContext)
