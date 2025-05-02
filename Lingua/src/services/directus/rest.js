import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"
import { generateBookingDetails } from "@utils/ticketDetailsGenerator"

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

export const postBooking = async (data) => {
  const { ticket, price, paymentMethod, contacts, passengers } = data
  const formattedInfo = {
    ticket: ticket,
    price: price,
    payment_method: paymentMethod,
    phone_number: contacts.phoneNumber,
    email_address: contacts.emailAddress,
    passengers,
  }

  try {
    console.log("Uploading Booking...")
    const res = await axiosInstance.post("/items/booking", formattedInfo)
    const resData = {
      status: res.status,
      data: res.data.data,
    }
    return resData
  } catch (error) {
    logError("postBooking", error)
    return error
  }
}

export const fetchBookings = async (filter) => {
  try {
    console.log("Fetching Bookings...")
    const res = await axiosInstance.get(`/items/booking?${filter}`)
    console.log("Bookings Fetched")
    const resData = {
      status: res.status,
      data: res.data.data,
    }
    return resData
  } catch (error) {
    const err = logError("postBooking", error)
    return err
  }
}

export const fetchBookingDetails = async ({ id, filter }) => {
  try {
    console.log("Fetching Booking Details...")
    const res = await axiosInstance.get(`/items/booking/${id}?${filter}`)
    console.log("Booking Details Fetched")
    const resData = {
      status: res.status,
      data: res.data.data,
    }
    return resData
  } catch (error) {
    logError("postBooking", error)
    return error
  }
}

export const patchBooking = async ({ id, paymentId }) => {
  try {
    console.log("Updating Booking...", paymentId, " : ", id)
    const { data } = await fetchBookingDetails({ id })
    console.log(data)
    const updateBooking = generateBookingDetails(data)
    console.log(JSON.stringify(updateBooking, null, 2))
    const res = await axiosInstance.patch(`/items/booking/${id}`, {
      status: "Paid",
      payment_id: paymentId,
      ...updateBooking,
    })
    console.log("Booking Updated")
    return res.data.data
  } catch (error) {
    throw new Error(logError("patchBooking", error))
  }
}

export const fetchTickets = async (id) => {
  try {
    console.log("Fetching tickets...")
    const res = await axiosInstance.get(
      `/items/ticket?filter[travel_package]=${id}&sort=departure_schedule&fields=*,travel_package.country.name,return_ticket.type,return_ticket.id,return_ticket.departure_schedule,return_ticket.departure_location,return_ticket.arrival_location,return_ticket.arrival_schedule`
    )
    console.log("Tickets Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getTickets", error))
  }
}

export const fetchTicketDetails = async ({
  id,
  filter = "?fields=*,return_ticket.*",
}) => {
  try {
    console.log("Fetching Ticket Details...")
    const res = await axiosInstance.get(`/items/ticket/${id}${filter}`)
    console.log("Ticket Details Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("getTicketDetails", error))
  }
}

export const fetchLanguages = async () => {
  try {
    console.log("Fetching Languages...")
    const res = await axiosInstance.get("/items/languages?fields=code,name,id")
    return res.data
  } catch (error) {
    throw new Error(logError("fetchLanguages", error))
  }
}

export const fetchLessons = async (filter) => {
  try {
    console.log("Fetching Lessons...")
    const res = await axiosInstance.get(`/items/lesson?${filter}`)
    console.log("Lessons Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchLessons", error))
  }
}

export const fetchVocabulary = async ({ id, lang }) => {
  try {
    console.log("Fetching Vocabulary...")
    const res = await axiosInstance.get(
      `/items/vocabulary?filter[lesson][_eq]=${id}&fields=*,translations.*,translations.language.code&deep[translations][_filter][language][code]=${lang}`
    )
    console.log("Vocabulary Fetched")

    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchVocabulary", error))
  }
}

export const fetchQuestions = async ({ id, lang }) => {
  try {
    console.log("Fetching Questions...")
    const res = await axiosInstance.get(
      `/items/question?filter[lesson][_eq]=${id}&fields=question,type,answer.word,answer.sentence,answer.audio,answer.image,answer.translations.*&deep[answer][translations][_filter][language][code][_eq]=${lang}`
    )
    console.log(JSON.stringify(res.data.data, null, 2))

    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchQuestions", error))
  }
}
