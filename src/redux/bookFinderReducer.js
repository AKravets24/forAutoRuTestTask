import { bookApi } from '../api_connect/bookApi';
// import { Dispatch } from "redux";

const BOOK_RECEIVED = 'BOOK_RECEIVED';

const actions = {
    setMyBook: (bookList) => ({ type: BOOK_RECEIVED, bookList}),
};

const getWantedBookAC = (text,searchType) => async (dispatch) =>  {
  console.log(searchType)
  let response = undefined;
  try {
    if        (searchType === 'Search by words') {response = await bookApi.getBooksListByWords (text)} 
    else if   (searchType === 'Search by title') {response = await bookApi.getBooksListByTitle (text)} 
    else if   (searchType === 'Search by author'){response = await bookApi.getBooksListByAuthor(text)}  
    if (response.status === 200) dispatch(actions.setMyBook(response.data))
    }
  catch (err) { console.log(err) }
}

const bookFinderACsObj = {
    getWantedBookAC,
  };

export const bookFinderACs = (state = bookFinderACsObj) => { return state };


let initialBookFinderState = {
  totalСoincidence: null,
  numFoundExact: null,
  bookList: [],
}

export const bookFinderReducer = (state = initialBookFinderState, action) => {

    switch (action.type) {
        case BOOK_RECEIVED : console.log(action); 
        return {...state, 
          totalСoincidence: action.bookList.numFound, 
          numFoundExact: action.bookList.numFoundExact, 
          bookList: action.bookList.docs,
        }

        default: return {...state};
    }
}