import axios from 'axios'

const instance = axios.create({
  // withCredentials: false,
  baseURL: `http://openlibrary.org/`
})

export const bookApi = {
  // getBooksList(bookName) { return axios.get(`http://openlibrary.org/search.json?title=${bookName}`) },
  getBooksListByWords (words) { return instance.get (`search.json?q=${words}`)       },
  getBooksListByTitle (title) { return instance.get (`search.json?title=${title}`)   },
  getBooksListByAuthor(author){ return instance.get (`search.json?author=${author}`) },
} 


// https://openlibrary.org/dev/docs/api/search  - поиск книг
// https://openlibrary.org/dev/docs/api/covers  - обложки