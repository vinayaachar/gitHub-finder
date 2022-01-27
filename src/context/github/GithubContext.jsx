import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    isLoading: false
  }

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get inital users (Only for testing purposes)
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,
    isLoading: state.isLoading,
    fetchUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext