import { Formik } from 'formik';
import stl from './App.module.css';
import {useState, createRef} from 'react'

export function BookFinderContainer({state, actions}) {
    

  return <BookFinder state={state} actions={actions}/>
  }

  let BookFinder = ({state, actions}) => {
    console.log(actions)
    console.log(state  )
    let refSelect = createRef()
    let refInput = createRef()

    let validator = (values) => {
      const errors = {};
      if (!values.text) errors.text = 'Required';
      return errors;
    }
    let submitter = (values, { setSubmitting }) => {
      console.log(refSelect.current.value)
      console.log(values)
      actions.getWantedBook(values.text, refSelect.current.value, 1)
      setSubmitting(false)
    }

    let [portionNumber, setPortionNumber] = useState(1);
    let Paginator = () => {
      let { totalСoincidence } = state;  //totalCount
      let pagesAmount = Math.ceil(totalСoincidence / 100) // 100 - pageSize
      let pageStep = 10;
      let leftPortionPageNumber = (portionNumber - 1) * pageStep + 1
      let rightPortionPageNumber = portionNumber * pageStep;
      let portionCount = Math.ceil(pagesAmount / pageStep)
      let pagesArr = [];
      for (let i = 1; i <= pagesAmount; i++) { pagesArr.push(i) }
      
      return !!pagesAmount ? <div className={stl.paginationBlockOutside} >
        <button className={`${stl.pagBTN}`} onClick={() => setPortionNumber(portionNumber - 1)}
          disabled={portionNumber === 1}> &#171; {pageStep} </button>
        {pagesArr
          .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map(p => {
            return <span key={p} 
              onClick={() => {
                if (!state.bookListIsLoading) {
                  actions.getWantedBook(refInput.current.value, refSelect.current.value, p)
                }
              }}
            >{p}
            </span>
          })}
        <button className={`${stl.pagBTN}`} onClick={() => setPortionNumber(portionNumber + 1)}
          disabled={portionNumber > portionCount - 1}
          > {pageStep} &#187;</button>
      </div> : null
    };




  //обложкой, названия книги, автора.
    return <div className={stl.container}>
  
          <Formik initialValues={{ text: ''}} validate= {validator} onSubmit={submitter} >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
              <form onSubmit={handleSubmit}>
                <input ref={refInput} type="text" name="text" onChange={handleChange} value={values.text} /* onBlur={handleBlur} */ />
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
          
          { state.bookListIsLoading ? <div>Loading...</div> : null }
          <Paginator/>
          <div>
          {state.totalСoincidence !== null && 
          <p>{state.totalСoincidence ===0 ? 'Nothing was found!' : `Look what we have found! ${state.totalСoincidence} matches!` } </p>}
            {state.bookList
              .map((el, i) => {
                // console.log(el.author_name); 
                return (
                <div key={i}>
                  <p>{i}</p>
                  <p>{el.title}</p>
                  <img src={`https://covers.openlibrary.org/b/olid/${el.cover_edition_key}-S.jpg`} alt= 'err'/>
                  {/* <p>{el.author_name.map((el)=> el) }</p> */}

                </div>)
              })
            
            }
          </div>
      
        </div>
  }