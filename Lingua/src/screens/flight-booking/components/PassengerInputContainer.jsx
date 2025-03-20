import { useState } from "react"
import PassengerInput from "./PassengerInput"

export default function PassengerInputContainer() {
  const [passengers, setPassengers] = useState([
    {
      name: "",
      documents: [],
    },
  ])

  const handleChange = (index, key, value) => {
    setPassengers((prev) => {
      const udpatePassenger = prev.map((passenger, i) =>
        i === index ? { ...passenger, [key]: value } : passenger
      )
      return udpatePassenger
    })
  }

  const addPassenger = () => {
    setPassengers((prev) => [...prev, { name: "", documents: [] }])
  }

  return (
    <>
      {passengers.map((passenger, index) => {
        console.log(passenger)
        return (
          <PassengerInput
            key={index}
            passenger={passenger}
            index={index}
            handleChange={handleChange}
          />
        )
      })}
    </>
  )
}
