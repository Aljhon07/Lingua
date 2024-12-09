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

export const fetchProfile = async (filter = "") => {
  console.log("Fetching Profile...")
  try {
    const res = await axiosInstance.get(`/users/me${filter}`)
    console.log("Profile Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getProfile", error))
  }
}

export const fetchCountries = async () => {
  try {
    console.log("Fetching Countries...")
    const res = await axiosInstance.get("/items/country?fields=name")
    console.log("Countries Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getCountries", error))
  }
}

export const fetchPackages = async (
  filter = "?fields=id,name,country.name,cover,price"
) => {
  try {
    console.log("Fetching Packages...")
    const res = await axiosInstance.get(`/items/travel_package${filter}`)
    console.log("Packages Fetched: " + res.data)
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}

export const fetchPackageByCountry = async (filter) => {
  try {
    console.log("Fetching Packages By Country...")
    const res = await axiosInstance.get(
      `/items/travel_package?fields=id,name,country.name,price,cover&filter[country][name][_eq]=${filter}`
    )
    console.log("Packages by Country Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}
export const fetchPackageDetails = async (id) => {
  try {
    console.log("Fetching Package Details...", id)
    const res = await axiosInstance.get(
      `/items/travel_package/${id}?fields=*,itinerary.*,features.*`
    )
    console.log("Package Details Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackageDetails", error))
  }
}

export const fetchPackageItinerary = async (id) => {
  try {
    console.log("Fetching Package Itinerary...", id)
    const res = await axiosInstance.get(
      `/items/destination?filter[travel_package][id][_eq]=${id}&sort=dayNumber&fields=image,overview,activities.name,dayNumber`
    )
    console.log("Package Itinerary Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchPackageItinerary", error))
  }
}

export const uploadImages = async (imageUris) => {
  console.log(imageUris)
  try {
    const formData = new FormData()
    for (const imageUri of imageUris) {
      formData.append("file", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: "image/*",
      })
      console.log("Uploading Image...")
    }
    const res = await axiosInstance.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("Image Uploaded: ")
    return res.data.data
  } catch (error) {
    console.error("Failed to upload image:", error)
  }
}

export const uploadTransactions = async (first_name, last_name, price, id) => {
  console.log(first_name, last_name)
  try {
    const res = await axiosInstance.post("/items/payments", {
      first_name,
      last_name,
      travel_package: id,
      price,
    })
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    throw new Error(logError("uploadProcess", error))
  }
}

export const fetchTransactions = async (filter) => {
  try {
    console.log("Fetching Transactions...")
    const res = await axiosInstance.get(`/items/payments?${filter}`)
    console.log("Transactions Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getTransactions", error))
  }
}
