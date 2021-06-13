
import stl from './App.module.css';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import StoreContext from './storeContext'
import { useDispatch, useSelector } from 'react-redux';


function App({state, actions}) {
  
  console.log(state)
  console.log(actions)

  let validator = (values) => {
    console.log(values.text)
    const errors = {};
    if (!values.text) {
      errors.text = 'Required';
    } 
    return errors;
  }

  let submitter = (values, { setSubmitting }) => {
    console.log(values)
    actions.getWantedBook(values.text)
    setSubmitting(false)

  }


  return <>
    <StoreContext.Consumer>
      {() => {
        return <div className={stl.container}>

        <Formik initialValues={{ text: ''}} validate= {validator} onSubmit={submitter} >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
            <form onSubmit={handleSubmit}>
              <input type="text" name="text" onChange={handleChange} value={values.text} /* onBlur={handleBlur} */ />
              {errors.text || touched.text && errors.text}
              <button type="submit" disabled={!values.text && isSubmitting}>Find! </button>
            </form>
          )}
        </Formik>
    
      </div>


      }}
    </StoreContext.Consumer>
  </>

}

const mapStateToProps = (state) => {
  return {
    bookList: state.bookFinderReducer.bookList
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const state = stateProps;
  const { dispatch } = dispatchProps;

  const getWantedBook = (bookName) => dispatch(state.bookFinderACs.getWantedBookAC(bookName));

  const actions = { getWantedBook }

  return { state, actions }

}

const appConnector = connect(mapStateToProps, null, mergeProps)(App)
export default appConnector
