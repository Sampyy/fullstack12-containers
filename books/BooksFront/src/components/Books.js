import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

const Books = (props) => {
    const [genre, setGenre] = useState(null)
    const result = useQuery(ALL_BOOKS, { variables: { genre: genre } })
    const { refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: genre },
    })
    const [genres, setGenres] = useState([])
    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded
            console.log(data)
            props.setError(
                'Book ' +
                    data.data.bookAdded.title +
                    ' by ' +
                    data.data.bookAdded.author.name +
                    ' added.'
            )
            props.client.cache.updateQuery(
                { query: ALL_BOOKS, variables: { genre: genre } },
                (data) => {
                    console.log('updateQuery data: ' + data.allBooks)
                    console.log('added book: ' + addedBook)
                    return {
                        allBooks: data.allBooks.concat(addedBook),
                    }
                }
            )
        },
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading</div>
    }

    const books = result.data.allBooks

    books.map((book) => {
        if (book.genres) {
            book.genres.map((genre) => {
                if (!genres.includes(genre)) {
                    setGenres(genres.concat(genre))
                }
            })
        }
    })

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {genres.map((genre) => (
                <td key={genre}>
                    <button
                        onClick={() => {
                            refetch()
                            setGenre(genre)
                        }}
                    >
                        {genre}
                    </button>
                </td>
            ))}
            <td>
                <button
                    onClick={() => {
                        refetch()
                        setGenre(null)
                    }}
                >
                    any genre
                </button>
            </td>
        </div>
    )
}

export default Books
