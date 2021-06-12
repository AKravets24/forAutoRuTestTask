import { bookApi } from '../api_connect/bookApi';
import { Dispatch } from "redux";

const BOOK_RECEIVED = 'BOOK_RECEIVED';

const actions = {
    setMyBook: (bookList) => ({ type: BOOK_RECEIVED, bookList}),
};

const getWantedBookAC = (bookName) => async (dispatch) =>  {
  try {
    let response = await bookApi.getBooksList(bookName)
    if (response.status === 200) dispatch(actions.setMyBook(bookName))
    console.log(response)
    }
  catch (err) { console.log(err) }
}

const dialogActions = {
    getWantedBookAC,
  };

export const bookFinderACs = (state = dialogActions) => { return state };


let initialBookFinderState = {
    bookList: [],
}

export const bookFinderReducer = (state = initialBookFinderState, action) => {

    switch (action.type) {
        case BOOK_RECEIVED : return {...state, bookList: action.bookList}

        default: return {...state};
    }
}