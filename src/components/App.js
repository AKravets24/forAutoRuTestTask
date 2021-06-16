import { connect } from 'react-redux';
import StoreContext from './storeContext'
import { useDispatch, useSelector } from 'react-redux';
import {BookFinderContainer} from './BookFinder'

function App ({state, actions}) {
  return <>
    <StoreContext.Consumer>
      {() => {
       return <BookFinderContainer state={state} actions={actions}/>
      }}
    </StoreContext.Consumer>
  </>
  
}



const mapStateToProps = (state) => {
  return {
    bookListIsLoading: state.bookFinderReducer.bookListIsLoading,
    bookList: state.bookFinderReducer.bookList,
    totalСoincidence: state.bookFinderReducer.totalСoincidence,
    numFoundExact: state.bookFinderReducer.numFoundExact,
    bookFinderACs: state.bookFinderACs,
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const state = stateProps;
  const { dispatch } = dispatchProps;

  const getWantedBook = (bookName, searchType, pageNum) => dispatch(state.bookFinderACs.getWantedBookAC(bookName, searchType, pageNum));

  const actions = { getWantedBook }

  return { state, actions }

}

const appConnector = connect(mapStateToProps, null, mergeProps)(App)
export default appConnector
