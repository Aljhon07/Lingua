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
    status: "Approved",
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

export const fetchUserItineraries = async (filter) => {
  try {
    console.log("Fetching User Itineraries...")
    const res = await axiosInstance.get(`/items/itinerary?${filter}`)
    console.log("User Itineraries Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchUserItineraries", error))
  }
}

export const payBooking = async ({ id, paymentId }) => {
  try {
    const { data } = await fetchBookingDetails({ id })
    console.log("Updating Booking...", paymentId, " : ", id)
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
    console.error("Error paying booking:", error)
    throw new Error(logError("payBooking", error))
  }
}

export const fetchTickets = async (id, filter) => {
  try {
    console.log("Fetching tickets...")
    const filter = filter
      ? filter
      : "sort=departure_schedule&fields=*,travel_package.country.name,return_ticket.type,return_ticket.id,return_ticket.departure_schedule,return_ticket.departure_location,return_ticket.arrival_location,return_ticket.arrival_schedule"
    const res = await axiosInstance.get(
      `/items/ticket?filter[travel_package]=${id}&${filter}`
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
    console.log("Languages Fetched")
    return res.data
  } catch (error) {
    throw new Error(logError("fetchLanguages", error))
  }
}

export const fetchLessons = async (filter) => {
  try {
    console.log("Fetching Lessons...")
    const res = await axiosInstance.get(`/items/lesson?${filter}&sort=order`)
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
      `/items/vocabulary?filter[lesson][_eq]=${id}&filter[translations][language][code][_eq]=${lang}&fields=id,word,sentence,definition,image,audio,translations.*,translations.language.*&deep[translations][_filter][language][code][_eq]=${lang}`
    )
    console.log(JSON.stringify(res.data.data, null, 2))

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
    console.log("Questions", JSON.stringify(res.data.data, null, 2))

    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchQuestions", error))
  }
}

export const fetchPhrases = async ({ lang }) => {
  try {
    console.log("Fetching Phrases...")
    const res = await axiosInstance.get(
      `/items/phrase?fields=id,phrase,translation.translation,translation.transliteration,translation.audio,translation.language.*&deep[translation][_filter][language][code][_eq]=${lang}`
    )

    console.log(JSON.stringify(res.data.data, null, 2))
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchPhrases", error))
  }
}

export const fetchUserItinerary = async (filter) => {
  console.log("Filter: ", filter)
  try {
    console.log("Fetching User Itinerary...")
    const res = await axiosInstance.get(`/items/user_itinerary?${filter}`)
    console.log("User Itinerary Fetched")
    return res.data.data
  } catch (error) {
    throw new Error(logError("fetchUserItinerary", error))
  }
}
export const createUserItinerary = async (bookingId) => {
  try {
    console.log("Creating User Itinerary...")
    const { data: bookingDetails } = await fetchBookingDetails({
      id: bookingId,
      filter:
        "fields=ticket.travel_package.itinerary.overview,ticket.travel_package.itinerary.activities.*,ticket.travel_package.itinerary.id,ticket.travel_package.itinerary.dayNumber",
    })

    console.log("Booking Details: ", JSON.stringify(bookingDetails, null, 2))
    const formattedData = bookingDetails.ticket.travel_package.itinerary.map(
      (item) => ({
        destination: item.id,
        title: `Day ${item.dayNumber} - ${item.overview}`,
        order: item.dayNumber,
        activity: item.activities.map((activity, index) => ({
          name: activity.name,
          order: index,
        })),
      })
    )

    console.log("Formatted Data: ", JSON.stringify(formattedData, null, 2))
    const res = await axiosInstance.post("/items/user_itinerary", {
      booking: bookingId,
      itinerary: formattedData,
    })
    console.log("User Itinerary Created")
    return res.data.data
  } catch (error) {
    throw new Error(logError("createUserItinerary", error))
  }
}
