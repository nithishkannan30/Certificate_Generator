import React, { useState,useReducer,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../assets/styles/certificateGenerator.module.scss"
import { GlobalText } from '../context/DataText';
const  initialState={
  name:'Nithish',
  course:'Data structure',
  date:'2020-05-10',
  signature:'Nithish',
}
const reducer=(state,action)=>{
  switch(action.type){
        case 'TEXT_CHANGE':
          return {...state,[action.field]:action.payload}
        default:
          break
  }
}
const CertificateGenerator = () => {
  const {setFormData} = useContext(GlobalText)
  const navigate =useNavigate()
  const[isOpenModel,setIsOpenModel]=useState(false);
  const[formState,dispatch]=useReducer(reducer,initialState)
    const handleSubmitForm=e=>{
        e.preventDefault();
        const {name,course,date,signature}=formState
        if(name && course && date && signature){
        console.log('form submitted');
        setIsOpenModel(true);
        setFormData(formState)
        navigate('/options', { state: { formData: formState } });

        }else{
          alert('Please fill all details')
        }
    }
    const handleTextChange = (e) => {
      dispatch({type:'TEXT_CHANGE', field: e.target.name, payload: e.target.value})
  }
  
  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.inputGroup}>
            <label htmlFor='user-name'>NAME</label>
            <input type='text' name='name' id='user-name' value={formState.name} placeholder='Enter Name' onChange={handleTextChange}/>
        </div>
        <div className={styles.inputGroup}>
            <label htmlFor='course'>Course</label>
            <input type='text' name='course' value={formState.course} id='course' onChange={handleTextChange}/>
        </div>
        <div className={styles.inputGroup}>
            <label htmlFor='dateOfConduct'>Date</label>
            <input type='date' value={formState.date} name='name' id='DateofCondact' onChange={handleTextChange}/>
        </div>
        <div className={styles.inputGroup}>
            <label htmlFor='signature'>Signature</label>
            <input type='text' name='signature' value={formState.signature} id='signature' onChange={handleTextChange}/>
        </div>
     <button type='submit'>Generate certificate</button>
      </form>
    </div>
    </div>



      
    
    </>
  )
}

export default CertificateGenerator
