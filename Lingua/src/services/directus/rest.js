import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"
export const fetchQuizzes = async ({ id, filter }) => {
  try {
    console.log("Fetching Quizzes...")
    const res = await axiosInstance.get(
      `/items/quizzes?[lesson][_eq]=${id}&${filter}`
    )
    console.log("Quizzes Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchQuizzes", error))
  }
}

export const fetchLessons = async (filter) => {
  try {
    console.log("Fetching Lessons...")
    const res = await axiosInstance.get(`/items/lessons?${filter}`)
    console.log("Lessons Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchLessons", error))
  }
}

export const fetchVocabulary = async ({ id, filter }) => {
  try {
    console.log("Fetching Vocabulary...")
    const res = await axiosInstance.get(
      `/items/vocabulary?[lesson][_eq]=${id}&${filter}`
    )
    console.log("Vocabulary Fetched")

    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchVocabulary", error))
  }
}

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
    const res = await axiosInstance.get(`/users/me?${filter}`)
    console.log("Profile Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getProfile", error))
  }
}

export const fetchCountries = async () => {
  try {
    console.log("Fetching Countries...")
    const res = await axiosInstance.get("/items/country?fields=name&sort=name")
    console.log("Countries Fetched")

    const countries = res.data.data.map((country) => ({
      label: country.name,
      value: country.name,
    }))

    return countries
    // return res.data.data
  } catch (error) {
    throw new Error(logError("getCountries", error))
  }
}

export const fetchPackages = async (filter) => {
  try {
    console.log("Fetching Packages...")
    const res = await axiosInstance.get(
      `/items/travel_package?fields=id,name,country.name,cover,price&${filter}`
    )
    console.log("Packages Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getPackages", error))
  }
}

// export const fetchPackageByCountry = async (filter) => {
//   try {
//     console.log("Fetching Packages By Country...")
//     const res = await axiosInstance.get(
//       `/items/travel_package?fields=id,name,country.name,price,cover&filter[country][name][_eq]=${filter}`
//     )
//     console.log("Packages by Country Fetched")
//     return res.data.data
//   } catch (error) {
//     throw new Error(logError("getPackages", error))
//   }
// }

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

export const uploadTransactions = async (first_name, last_name, id) => {
  console.log(first_name, last_name)
  try {
    const res = await axiosInstance.post("/items/payments", {
      first_name,
      last_name,
      travel_package: id,
    })
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
