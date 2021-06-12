
import stl from './App.module.css';
import { Formik } from 'formik';


export function App({store}) {
  console.log(store);


  let validator = (values) => {
    console.log(values)
    const errors = {};
    if (!values.text) {
      errors.text = 'Required';
    } 
    return errors;
  }

  let submitter = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return <div className={stl.container}>

<Formik initialValues={{ text: ''}} validate= {validator} onSubmit={submitter} >
       {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
         <form onSubmit={handleSubmit}>
           <input type="text" name="text" onChange={handleChange} value={values.text} /* onBlur={handleBlur} */ />
           {errors.text || touched.text && errors.text}
           
           <button type="submit" disabled={!values.text || isSubmitting}>
             Find!
           </button>
         </form>
       )}
     </Formik>


  </div>
}
