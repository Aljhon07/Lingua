const { createContext, useState, useContext } = require("react")

const QueryContext = createContext()

export default function QueryProvider({ children }) {
  const [queries, setQueries] = useState({
    test: {
      loading: false,
      error: true,
      data: "error message",
    },
  })

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

  const executeQuery = async ({ name, queryFn }, ...args) => {
    initQueries({ name, loading: true, error: null, data: null })
    try {
      const res = await queryFn(...args)
      initQueries({ name, loading: false, error: null, data: res })
      console.log(name, "; ", res)
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

  return (
    <QueryContext.Provider
      value={{
        getQueryState,
        executeQuery,
        queries,
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export const useQueryContext = () => useContext(QueryContext)
