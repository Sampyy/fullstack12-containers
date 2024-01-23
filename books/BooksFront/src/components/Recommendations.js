import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const loggedUser = useQuery(ME)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  useEffect(() => {
    if (props.page !== "recommendations") {
      return
    }
    setFavoriteGenre(loggedUser.data.me.favoriteGenre)
  }, [props.page])
  if (!props.show) {
    return null
  }

  if (result.loading || loggedUser.loading) {
    return <div>loading</div>
  }
  return (
    <div>
      <h4>Recommendations</h4>
      <p>Books in your favorite genre {favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
