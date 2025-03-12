import { useState } from "react"

export const useQueryState = () => {
  const [queries, setQueries] = useState({})

  const executeQuery = async (name, querFn, ...args) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: {
        loading: true,
        error: null,
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
          error: null,
          data: res,
        },
      }))
    } catch (test) {
      setQueries((prevQueries) => ({
        ...prevQueries,
        [name]: {
          ...prevQueries[name],
          loading: false,
          error: true,
          data: "QueryState Message: An error occurred",
        },
      }))
    }
  }

  const getQueryState = (name) =>
    queries[name] || { loading: true, error: false, data: null }
  return { getQueryState, executeQuery }
}
