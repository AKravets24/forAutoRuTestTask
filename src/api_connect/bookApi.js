import {axios} from 'axios'


export const bookApi = {
  getBooksList(bookName) { return axios.get(`https://openlibrary.org/dev/docs/api/search/${bookName}`) },
} 


// https://openlibrary.org/dev/docs/api/search  - поиск книг
// https://openlibrary.org/dev/docs/api/covers  - обложки