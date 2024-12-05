import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"

export async function getProfile() {
  console.log("Fetching Profile...")
  try {
    const res = await axiosInstance.get("/users/me")
    console.log("Profile Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getProfile", error))
  }
}

export const getCountries = async () => {
  try {
    console.log("Fetching Countries...")
    const res = await axiosInstance.get("/items/country")
    console.log("Countries Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getCountries", error))
  }
}

export const getPackages = async () => {
  try {
    console.log("Fetching Packages...")
    const res = await axiosInstance.get("/items/travel_package")
    console.log("Packages Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}

export const getPackageDetails = async (id) => {
  try {
    console.log("Fetching Package Details...")
    const res = await axiosInstance.get(`/items/travel_package/${id}`)
    console.log("Package Details Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackageDetails", error))
  }
}
