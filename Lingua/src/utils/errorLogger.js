export function logError(identifier, error) {
  try {
    const errorDetails = {
      error: true,
      message: error.message,
      responseData: error.response?.data?.errors,
      status: error.response?.status,
      url: error.config?.url,
    };
    console.error(`${identifier}: ${JSON.stringify(errorDetails, null, 2)}`);
    return errorDetails;
  } catch (error) {
    console.error(`${identifier} logging error!`);
  }
}
