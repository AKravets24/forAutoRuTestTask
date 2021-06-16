import axios from 'axios'

const instance = axios.create({
  // withCredentials: false,
  baseURL: `http://openlibrary.org/`
})

export const bookApi = {
  // getBooksList(bookName) { return axios.get(`http://openlibrary.org/search.json?title=${bookName}`) },
  // &page=2
  getBooksListByWords (words, pageNum) { return instance.get (`search.json?q=${words}&page=${pageNum}`)       },
  getBooksListByTitle (title, pageNum) { return instance.get (`search.json?title=${title}&page=${pageNum}`)   },
  getBooksListByAuthor(author,pageNum) { return instance.get (`search.json?author=${author}&page=${pageNum}`) },
} 


// https://openlibrary.org/dev/docs/api/search  - поиск книг
// https://openlibrary.org/dev/docs/api/covers  - обложки