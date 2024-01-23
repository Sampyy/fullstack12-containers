import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      console.log("Logged in as " + username)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("bookapp-user-token", token)
      setPage("authors")
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    console.log("Logging in as " + username)
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <p>Username: </p>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <p>Password: </p>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
