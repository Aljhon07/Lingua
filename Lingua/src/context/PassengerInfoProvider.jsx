import { createContext, useContext, useState } from "react";

const PassengerInfoContext = createContext();

import React from "react";

export default function PassengerInfoProvider({ children }) {
  const [contacts, setContacts] = useState({
    phoneNumber: "",
    emailAddress: "",
  });
  const [ticket, setTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [passengers, setPassengers] = useState([
    {
      name: "",
      documents: [],
    },
  ]);

  const handleChangeContacts = (key, value) => {
    setContacts((prev) => ({ ...prev, [key]: value }));
  };

  const updateInfo = (index, key, value) => {
    setPassengers((prev) => {
      const udpatePassenger = prev.map((passenger, i) =>
        i === index ? { ...passenger, [key]: value } : passenger
      );
      return udpatePassenger;
    });
  };

  const addPassenger = () => {
    setPassengers((prev) => [...prev, { name: "", documents: [] }]);
  };

  const getAllInfo = () => {
    return {
      ticket,
      contacts,
      paymentMethod,
      passengers,
    };
  };
  return (
    <PassengerInfoContext.Provider
      value={{
        handleChangeContacts,
        contacts,
        handleChangePaymentMethod: setPaymentMethod,
        paymentMethod,
        updateInfo,
        passengers,
        addPassenger,
        getAllInfo,
        setTicket,
        ticket,
      }}
    >
      {children}
    </PassengerInfoContext.Provider>
  );
}

export const usePassengerInfoContext = () => useContext(PassengerInfoContext);
