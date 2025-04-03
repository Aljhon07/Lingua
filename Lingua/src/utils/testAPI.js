const axios = require("axios")
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.API_KEY}`
async function testSignIn() {
  try {
    const res = await axios.post("http://localhost:8055/auth/login", {
      email: "cipriano@gmail.com",
      password: "aljhon123",
    })
    return { error: false, data: res }
  } catch (err) {
    const error = logError("Sign In", err)
    return { error }
  }
}

;(async () => {
  const { error } = await testSignIn()
  if (error) {
    console.log(error)
  } else {
    console.log("Sign In Success")
  }
})()

function logError(identifier, error) {
  try {
    const errorDetails = {
      error: true,
      message: error.message,
      responseData: error.response?.data?.errors[0],
      status: error.response?.status,
      url: error.config?.url,
    }

    return errorDetails
  } catch (error) {
    console.error(`${identifier} logging error!`)
  }
}
