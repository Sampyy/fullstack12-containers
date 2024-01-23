import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()
    useEffect(() => {
        const oldToken = localStorage.getItem('bookapp-user-token')
        if (oldToken) {
            setToken(oldToken)
        }
    }, [])
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setPage('authors')
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    /*useSubscription(BOOK_ADDED, {
      onData: ({ data }) => {
          const addedBook = data.data.bookAdded
          console.log(data)
          notify(
              'Book ' +
                  data.data.bookAdded.title +
                  ' by ' +
                  data.data.bookAdded.author.name +
                  ' added.'
          )
          client.cache.updateQuery(
              { query: ALL_BOOKS, variables: { genre: null } },
              (data) => {
                  console.log('updateQuery data: ' + data.allBooks)
                  console.log('added book: ' + addedBook.title)
                  return {
                      allBooks: data.allBooks.concat(addedBook),
                  }
              }
          )
      },
  })*/
    return (
        <div>
            <tr>
                <td>
                    <button onClick={() => setPage('authors')}>authors</button>
                </td>
                <td>
                    <button onClick={() => setPage('books')}>books</button>
                </td>

                <td>
                    <button
                        hidden={token === null}
                        onClick={() => setPage('add')}
                    >
                        add book
                    </button>
                </td>
                {token ? (
                    <td>
                        <button onClick={() => setPage('recommendations')}>
                            recommendations
                        </button>
                    </td>
                ) : null}

                {token ? (
                    <td>
                        <button onClick={() => logout()}>logout</button>
                    </td>
                ) : (
                    <td>
                        <button onClick={() => setPage('loginForm')}>
                            login
                        </button>
                    </td>
                )}
            </tr>
            <Notify errorMessage={errorMessage} />
            <Authors show={page === 'authors'} setError={notify} />

            <Books show={page === 'books'} setError={notify} client={client} />

            <NewBook show={page === 'add'} setError={notify} />
            {token ? (
                <Recommendations
                    show={page === 'recommendations'}
                    page={page}
                    setError={notify}
                    token={token}
                />
            ) : null}

            <LoginForm
                show={page === 'loginForm'}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    )
}

export default App
