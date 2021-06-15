import { Formik } from 'formik';
import stl from './App.module.css';
import {createRef} from 'react'

export function BookFinderContainer({state, actions}) {
    

  return <BookFinder state={state} actions={actions}/>
  }



  let BookFinder = ({state, actions}) => {
    console.log(actions)
    console.log(state  )
    let refSelect = createRef()

    let validator = (values) => {
      const errors = {};
      if (!values.text) errors.text = 'Required';
      return errors;
    }
    let submitter = (values, { setSubmitting }) => {
      console.log(refSelect.current.value)
      console.log(values)
      actions.getWantedBook(values.text, refSelect.current.value)
      setSubmitting(false)
    }

  



  //обложкой, названия книги, автора.
    return <div className={stl.container}>
  
          <Formik initialValues={{ text: ''}} validate= {validator} onSubmit={submitter} >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
              <form onSubmit={handleSubmit}>
                <input type="text" name="text" onChange={handleChange} value={values.text} /* onBlur={handleBlur} */ />
                {errors.text || touched.text && errors.text}
                <select /* onChange = {refSelector} */ ref = {refSelect}>
                  <option >Search by words </option>
                  <option >Search by title </option>
                  <option >Search by author</option>
                </select>
                <button type="submit" disabled={!values.text && isSubmitting}>Find! </button>
              </form>
            )}
          </Formik>

          <div>
          {state.totalСoincidence !== null && 
          <p>{state.totalСoincidence ===0 ? 'Nothing was found!' : `Look what we have found! ${state.totalСoincidence} matches!` } </p>}
            {state.bookList
              .map((el, i) => {
                // console.log(el.author_name); 
                return (
                <div>
                  <p>{el.title}</p>
                  {/* <p>{el.author_name.map((el)=> el) }</p> */}

                </div>)
              })
            
            }
          </div>
      
        </div>
  }