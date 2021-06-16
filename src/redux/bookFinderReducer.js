import { bookApi } from '../api_connect/bookApi';
// import { Dispatch } from "redux";

const BOOK_RECEIVED = 'BOOK_RECEIVED';
const BOOK_LIST_IS_LOADING = 'BOOK_LIST_IS_LOADING';

const actions = {
  setBookList: (bookList) => ({ type: BOOK_RECEIVED, bookList}),
  setBookListIsLoading: (isLoading)=> ({type: BOOK_LIST_IS_LOADING, isLoading}),
};

const getWantedBookAC = (text,searchType, pageNum) => async (dispatch) =>  {
  dispatch(actions.setBookListIsLoading(true));
  let response = undefined;
  try {
    if        (searchType === 'Search by words') { response = await bookApi.getBooksListByWords (text, pageNum) } 
    else if   (searchType === 'Search by title') { response = await bookApi.getBooksListByTitle (text, pageNum) } 
    else if   (searchType === 'Search by author'){ response = await bookApi.getBooksListByAuthor(text, pageNum) }  
    if (response.status === 200) dispatch(actions.setBookList(response.data))
    }
  catch (err) { console.log(err) }
  dispatch(actions.setBookListIsLoading(false));
}

const bookFinderACsObj = {
    getWantedBookAC,
  };

export const bookFinderACs = (state = bookFinderACsObj) => { return state };


let initialBookFinderState = {
  bookListIsLoading: false,
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
        case BOOK_LIST_IS_LOADING : return {...state, bookListIsLoading: action.isLoading}

        default: return {...state};
    }
}