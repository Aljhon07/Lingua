import { useState } from "react"

export const useQueryState = () => {
  const [queries, setQueries] = useState({})

  const executeQuery = async (name, querFn, ...args) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: {
        loading: true,
        error: false,
        data: null,
      },
    }))

    try {
      const res = await querFn(...args)
      setQueries((prevQueries) => ({
        ...prevQueries,
        [name]: {
          ...prevQueries[name],
          loading: false,
          error: false,
          data: res,
        },
      }))
    } catch (error) {
      setQueries((prevQueries) => ({
        ...prevQueries,
        [name]: {
          ...prevQueries[name],
          loading: false,
          error: true,
          data: error,
        },
      }))
    }
  }

  const getQueryState = (name) =>
    queries[name] || { loading: false, error: false, data: null }
  return { getQueryState, executeQuery }
}
