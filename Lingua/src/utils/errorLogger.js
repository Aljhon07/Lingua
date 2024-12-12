export function logError(identifier, error) {
  try {
    const errorDetails = {
      message: error.message,
      responseData: error.response?.data?.errors,
      status: error.response?.status,
      url: error.config?.url,
    }
    console.error(`${identifier}: ${JSON.stringify(errorDetails)}`)
    return errorDetails.message
  } catch (error) {
    console.error(`${identifier} logging error!`)
  }
}
