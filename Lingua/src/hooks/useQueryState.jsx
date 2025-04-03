import { useState } from "react"

export const useQueryState = () => {
  const [queries, setQueries] = useState({})

  const initQueries = ({ name, loading, error, data }) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: {
        loading: loading,
        error: error,
        data: data,
      },
    }))
  }

  const executeQuery = async (name, querFn, ...args) => {
    initQueries({ name, loading: true, error: null, data: null })
    try {
      const res = await querFn(...args)
      initQueries({ name, loading: false, error: null, data: res })
      return res
    } catch (err) {
      initQueries({
        name,
        loading: false,
        error: true,
        data: "Query State Error: " + err,
      })
    }
  }

  const getQueryState = (name) =>
    queries[name] || { loading: true, error: false, data: null }
  return { getQueryState, executeQuery, queries }
}
