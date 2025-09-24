import { useState, useCallback } from "react"

export const useQueryState = () => {
  const [queries, setQueries] = useState({})

  const initQueries = useCallback(({ name, loading, error, data }) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: {
        loading,
        error,
        data,
      },
    }))
  }, [])

  const executeQuery = useCallback(
    async (name, queryFn, ...args) => {
      initQueries({ name, loading: true, error: null, data: null })
      try {
        const res = await queryFn(...args)
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
    },
    [initQueries]
  )

  const getQueryState = useCallback(
    (name) => queries[name] || { loading: false, error: false, data: null },
    [queries]
  )

  return { getQueryState, executeQuery, queries }
}
