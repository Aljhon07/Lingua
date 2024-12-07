import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"

export const searchPackages = async (searchQuery) => {
  console.log("Searching...")
  try {
    const res = await axiosInstance.get(
      `/items/travel_package?search=${searchQuery}`
    )
    console.log("Search Successful")
    return res.data.data
  } catch (error) {
    throw new Error(logError("searchPackages", error))
  }
}

export const fetchProfile = async () => {
  console.log("Fetching Profile...")
  try {
    const res = await axiosInstance.get("/users/me")
    console.log("Profile Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getProfile", error))
  }
}

export const fetchCountries = async () => {
  try {
    console.log("Fetching Countries...")
    const res = await axiosInstance.get("/items/country")
    console.log("Countries Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getCountries", error))
  }
}

export const fetchPackages = async () => {
  try {
    console.log("Fetching Packages...")
    const res = await axiosInstance.get(`/items/travel_package`)
    console.log("Packages Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}

export const fetchPackageByCountry = async (filter) => {
  try {
    console.log("Fetching Packages By Country...")
    const res = await axiosInstance.get(
      `/items/travel_package?filter[country][name][_eq]=${filter}`
    )
    console.log("Packages by Country Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}
export const fetchPackageDetails = async (id) => {
  try {
    console.log("Fetching Package Details...")
    const res = await axiosInstance.get(`/items/travel_package/${id}`)
    console.log("Package Details Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackageDetails", error))
  }
}
