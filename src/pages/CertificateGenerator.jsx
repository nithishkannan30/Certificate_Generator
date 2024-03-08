import React, { useState,useReducer } from 'react'
import styles from '../assets/styles/certificateGenrator.module.scss'
import Model from '../components/Model';
import Certificate from '../view/Certificate';
import Certificate3 from '../view/Certificate3';
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
  const[isOpenModel,setIsOpenModel]=useState(false);
  const[formState,dispatch]=useReducer(reducer,initialState)
    const handleSubmitForm=e=>{
        e.preventDefault();
        const {name,course,date,signature}=formState
        if(name && course && date && signature){
        console.log('form submitted');
        setIsOpenModel(true);
        }else{
          alert('Please fill all details')
        }
    }
    const handleTextChange=()=>{
            dispatch({type:'TEXT_CHANGE',field:e.target.name,payload:e.target.value})
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
    <Model isOpen={isOpenModel} handleClose={()=>setIsOpenModel(false)}>
      <Certificate3 {...formState}/>
    </Model>

    </>
  )
}

export default CertificateGenerator
