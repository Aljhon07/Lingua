import { server } from "@constants/api";
import { axiosInstance } from "@utils/axiosInstance";
import * as SecureStorage from "expo-secure-store";
import { logError } from "@utils/errorLogger";
import { generateBookingDetails } from "@utils/ticketDetailsGenerator";
export const searchPackages = async (searchQuery) => {
  console.log("Searching...");
  try {
    const res = await axiosInstance.get(
      `/items/travel_package?search=${searchQuery}`
    );
    console.log("Search Successful");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("searchPackages", error));
  }
};

export const fetchProfile = async (filter = "") => {
  console.log("Fetching Profile...");
  console.log("Query String:", filter);
  try {
    const res = await axiosInstance.get(`/users/me?${filter}`);
    console.log("Profile Fetched");
    console.log(JSON.stringify(res.data.data, null, 2));
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getProfile", error));
  }
};

export const updateOnboardingStatus = async ({
  onboarding_completed = true,
}) => {
  try {
    console.log("Updating Onboarding Status...");
    const res = await axiosInstance.patch("/users/me", {
      onboarding_completed: onboarding_completed,
    });
    console.log("Onboarding Status Updated");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("updateOnboardingStatus", error));
  }
};
export const fetchCountries = async () => {
  try {
    console.log("Fetching Countries...");
    const res = await axiosInstance.get("/items/country?fields=name&sort=name");
    console.log("Countries Fetched");

    const countries = res.data.data.map((country) => ({
      label: country.name,
      value: country.name,
    }));

    return countries;
  } catch (error) {
    throw new Error(logError("getCountries", error));
  }
};

export const fetchRecommendedPackages = async () => {
  try {
    console.log("Fetching Recommended Packages...");
    const res = await axiosInstance.get(
      `/items/travel_package?fields=id,tags,name,country.name,cover,price&filter[featured][_eq]=true&sort=date_updated`
    );
    console.log("Recommended Packages Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getRecommendedPackages", error));
  }
};

export const fetchPackages = async (filter) => {
  try {
    console.log("Fetching Packages...");
    const res = await axiosInstance.get(
      `/items/travel_package?fields=id,tags,name,country.name,cover,price&${filter}&sort=-date_created`
    );
    console.log("Packages Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getPackages", error));
  }
};

export const fetchPackageDetails = async (id) => {
  try {
    console.log("Fetching Package Details...", id);
    const res = await axiosInstance.get(
      `/items/travel_package/${id}?fields=*,itinerary.*,features.*,tags.name,tags.id`
    );
    console.log(
      "Package Details Fetched ",
      JSON.stringify(res.data.data, null, 2)
    );
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getPackageDetails", error));
  }
};

export const fetchPackageItinerary = async (id) => {
  try {
    console.log("Fetching Package Itinerary...", id);
    const res = await axiosInstance.get(
      `/items/destination?filter[travel_package][id][_eq]=${id}&sort=dayNumber&fields=image,overview,activities.name,dayNumber`
    );
    console.log("Package Itinerary Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchPackageItinerary", error));
  }
};

export const postBooking = async ({ info: data }) => {
  const { ticket, price, paymentMethod, contacts, passengers } = data;
  const formattedInfo = {
    ticket: ticket,
    payment_method: paymentMethod,
    phone_number: contacts.phoneNumber,
    email_address: contacts.emailAddress,
    passengers: passengers.map((passenger) => ({
      ...passenger,
      documents: [],
    })),
  };

  console.log(JSON.stringify(formattedInfo, null, 2));
  try {
    console.log("Uploading Booking...");
    const accessToken = await SecureStorage.getItemAsync("accessToken");
    const res = await axiosInstance.post(
      `${server.baseURL}/directus-extensions/create-booking`,
      formattedInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const resData = {
      status: res.status,
      data: res.data.data,
    };
    return resData;
  } catch (error) {
    logError("postBooking", error);
    return error;
  }
};

export const postUserProgress = async ({ lesson, recent_score }) => {
  console.log(lesson, recent_score);
  try {
    console.log("Creating User Progress...");
    const res = await axiosInstance.post(`/items/user_lesson_progress`, {
      lesson: lesson,
      recent_score: recent_score,
    });
    return res.data.data;
  } catch (error) {
    throw new Error(logError("createUserProgress", error));
  }
};

export const patchUserProgress = async ({
  progressId,
  recent_score,
  language,
}) => {
  const data = { recent_score: recent_score };
  try {
    console.log("Updating User Progress...");
    const res = await axiosInstance.patch(
      `/items/user_lesson_progress/${progressId}`,
      data
    );
    return res.data.data;
  } catch (error) {
    throw new Error(logError("updateUserProgress", error));
  }
};

export const fetchUserProgress = async (id = "") => {
  console.log("Fetching User Progress...");
  let queryString = "";
  try {
    if (id) {
      queryString = `?filter[lesson][_eq]=${id}`;
    }
    const res = await axiosInstance.get(
      `/items/user_lesson_progress${queryString}`
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchUserProgress", error));
  }
};

export const fetchBookings = async (filter) => {
  try {
    console.log("Fetching Bookings...");
    const res = await axiosInstance.get(`/items/booking?${filter}`);
    console.log("Bookings Fetched");
    const resData = {
      status: res.status,
      data: res.data.data,
    };
    return resData;
  } catch (error) {
    const err = logError("postBooking", error);
    return err;
  }
};

export const fetchBookingDetails = async ({ id, filter }) => {
  try {
    console.log("Fetching Booking Details...");
    const res = await axiosInstance.get(`/items/booking/${id}?${filter}`);
    console.log("Booking Details Fetched");
    const resData = {
      status: res.status,
      data: res.data.data,
    };
    return resData;
  } catch (error) {
    logError("postBooking", error);
    return error;
  }
};

export const payBooking = async ({ id, paymentId }) => {
  try {
    console.log("Paying Booking...");
    const res = await axiosInstance.post(
      `${server.baseURL}/directus-extensions/pay-booking`,
      { id, paymentId }
    );
    console.log(JSON.stringify(res.data.data, null, 2));
    return res.data.data;
  } catch (error) {
    console.error("Error paying booking:", error);
    throw new Error(logError("payBooking", error));
  }
};

export const fetchUserNotifications = async (filter) => {
  try {
    console.log("Fetching User Notifications...");
    const res = await axiosInstance.get(
      `/items/user_notification?sort=-date_created&fields=title,message,id,seen,date_created,booking&${filter}&limit=20`
    );
    console.log("User Notifications Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchUserNotifications", error));
  }
};

export const patchNotificationSeen = async (id) => {
  try {
    console.log("Updating Notification Seen Status...");
    const res = await axiosInstance.patch(`/items/user_notification/${id}`, {
      seen: true,
    });
    console.log("Notification Seen Status Updated");
    return res.data.data;
  } catch (error) {
    console.error("Error updating notification seen status:", error);
    throw new Error(logError("updateNotificationSeen", error));
  }
};
export const patchNotificationId = async (notificationId) => {
  try {
    console.log("Updating Notification ID...");
    const res = await axiosInstance.patch("/users/me", {
      notification_id: notificationId,
    });
    console.log("Notification ID Updated");
    return res.data.data;
  } catch (error) {
    console.error("Error updating notification ID:", error);
    throw new Error(logError("updateNotificationId", error));
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    console.log("Marking all notifications as read...");
    // First fetch all unread notifications
    const unreadNotifications = await axiosInstance.get(
      `/items/user_notification?filter[seen][_eq]=false&fields=id`
    );

    if (unreadNotifications.data.data.length === 0) {
      console.log("No unread notifications found");
      return { data: [] };
    }

    // Batch update all unread notifications
    const updatePromises = unreadNotifications.data.data.map((notification) =>
      axiosInstance.patch(`/items/user_notification/${notification.id}`, {
        seen: true,
      })
    );

    await Promise.all(updatePromises);
    console.log("All notifications marked as read");
    return { data: unreadNotifications.data.data };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw new Error(logError("markAllNotificationsAsRead", error));
  }
};

export const fetchTickets = async (id, filter) => {
  try {
    console.log("Fetching tickets...");
    const filter = filter
      ? filter
      : "sort=departure_schedule&fields=*,travel_package.country.name,return_ticket.type,return_ticket.id,return_ticket.departure_schedule,return_ticket.departure_location,return_ticket.arrival_location,return_ticket.arrival_schedule";
    const res = await axiosInstance.get(
      `/items/ticket?filter[travel_package]=${id}&${filter}`
    );
    console.log("Tickets Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getTickets", error));
  }
};

export const fetchTicketDetails = async ({
  id,
  filter = "?fields=*,return_ticket.*",
}) => {
  try {
    console.log("Fetching Ticket Details...");
    const res = await axiosInstance.get(`/items/ticket/${id}${filter}`);
    console.log("Ticket Details Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("getTicketDetails", error));
  }
};

export const fetchLanguages = async () => {
  try {
    console.log("Fetching Languages...");
    const res = await axiosInstance.get("/items/languages?fields=code,name,id");
    console.log("Languages Fetched");
    return res.data;
  } catch (error) {
    throw new Error(logError("fetchLanguages", error));
  }
};

export const fetchLessons = async (filter) => {
  try {
    console.log("Fetching Lessons...");
    const res = await axiosInstance.get(
      `/items/lesson?${filter}&sort=order&filter[archived][_eq]=false`
    );
    console.log("Lessons Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchLessons", error));
  }
};

export const fetchVocabulary = async ({ id, lang }) => {
  try {
    console.log("Fetching Vocabulary...");
    const res = await axiosInstance.get(
      `/items/vocabulary?filter[lesson][_eq]=${id}&filter[translations][language][code][_eq]=${lang}&fields=id,word,sentence,definition,image,audio,translations.*,translations.language.*&deep[translations][_filter][language][code][_eq]=${lang}`
    );
    console.log(JSON.stringify(res.data.data, null, 2));

    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchVocabulary", error));
  }
};

export const fetchQuestions = async ({ id, lang }) => {
  try {
    console.log("Fetching Questions...");
    const res = await axiosInstance.get(
      `/items/question?filter[lesson][_eq]=${id}&fields=question,type,answer.word,answer.sentence,answer.audio,answer.image,answer.translations.*&deep[answer][translations][_filter][language][code][_eq]=${lang}`
    );
    console.log("Questions", JSON.stringify(res.data.data, null, 2));

    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchQuestions", error));
  }
};

export const fetchPhraseCategories = async () => {
  try {
    console.log("Fetching Phrase Categories...");
    const res = await axiosInstance.get(
      `/items/phrase_category?fields=id,name,importance&sort=importance`
    );
    console.log("Phrase Categories Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchPhraseCategories", error));
  }
};
export const fetchPhrases = async ({ lang }) => {
  try {
    console.log("Fetching Phrases...");
    const res = await axiosInstance.get(
      `/items/phrase?fields=id,phrase,translation.translation,translation.transliteration,category.name,category.importance,translation.audio,translation.language.*&deep[translation][_filter][language][code][_eq]=${lang}`
    );

    console.log(JSON.stringify(res.data.data, null, 2));
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchPhrases", error));
  }
};

export const fetchUserItinerary = async (filter) => {
  console.log("Filter: ", filter);
  try {
    console.log("Fetching User Itinerary...");
    const res = await axiosInstance.get(`/items/user_itinerary?${filter}`);
    console.log("User Itinerary Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchUserItinerary", error));
  }
};
export const createUserItinerary = async (bookingId) => {
  try {
    console.log("Creating User Itinerary...");
    const { data: bookingDetails } = await fetchBookingDetails({
      id: bookingId,
      filter:
        "fields=ticket.travel_package.itinerary.overview,ticket.travel_package.itinerary.activities.*,ticket.travel_package.itinerary.id,ticket.travel_package.itinerary.dayNumber",
    });

    const formattedData = bookingDetails.ticket.travel_package.itinerary.map(
      (item) => ({
        destination: item.id,
        title: `${item.overview}`,
        order: item.dayNumber,
        activity: item.activities.map((activity, index) => ({
          name: activity.name,
          order: index,
        })),
      })
    );

    const res = await axiosInstance.post("/items/user_itinerary", {
      booking: bookingId,
      itinerary: formattedData,
    });
    console.log("User Itinerary Created");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("createUserItinerary", error));
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const patchUserItinerary = async ({ id, data }) => {
  console.log(JSON.stringify(data, null, 2));
  try {
    console.log("Updating User Itinerary...");
    const res = await axiosInstance.patch(`/items/user_itinerary/${id}`, data);
    console.log("User Itinerary Updated");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("updateUserItinerary", error));
  }
};

export const fetchAllTags = async () => {
  try {
    console.log("Fetching All Tags...");
    const res = await axiosInstance.get("/items/tags?fields=id,name");
    console.log("All Tags Fetched");
    return res.data.data;
  } catch (error) {
    throw new Error(logError("fetchAllTags", error));
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    console.log("Cancelling Booking...", bookingId);
    const res = await axiosInstance.patch(`/items/booking/${bookingId}`, {
      status: "Cancelled",
    });
    console.log("Booking Cancelled Successfully");
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw new Error(logError("cancelBooking", error));
  }
};
