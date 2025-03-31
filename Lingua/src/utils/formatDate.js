export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export const formatTimeStamp = (timestamp) => {
  return {
    date: formatDate(timestamp),
    time: formatTime(timestamp),
  }
}

export const getTimeDifference = (date1, date2) => {
  const x = new Date(date1)
  const y = new Date(date2)

  const millDuration = y - x

  const hours = Math.floor(millDuration / (1000 * 60 * 60))
  const minutes = Math.floor((millDuration % (1000 * 60 * 60)) / (1000 * 60))

  let timeDiff = ""

  if (hours > 0) {
    timeDiff += `${hours} hour(s)`
  }

  if (minutes > 0) {
    if (timeDiff.length > 0) {
      timeDiff += `, `
    }
    timeDiff += `${minutes} minutes`
  }

  return timeDiff
}
