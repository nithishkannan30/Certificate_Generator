import React, { useState,useReducer,useRef } from 'react'
import styles from "../assets/styles/certificateGenerator.module.scss"
import Model from '../components/Model';
import './BAtch.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const  initialState={
  name:'Nithish,kannan,kaviyan,akash',
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
const CertificateGeneratorBatch = () => {
  const certificateRefs = useRef([]);
  const[isOpenModel,setIsOpenModel]=useState(false);
  const[formState,dispatch]=useReducer(reducer,initialState);
  const[number,setNumber]=useState([]);
 
    const handleSubmitForm=e=>{
        e.preventDefault();
        const {name,course,date,signature}=formState
        const namesArray = name.split(',');
        setNumber(namesArray);
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
    const handleDownloadCertificate = async () => {
      alert('Downloading...');
  
      try {
        const pdfPromises = number.map(async (name, index) => {
          const canvas = await html2canvas(certificateRefs.current[index]);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', [950, 640]);
          pdf.addImage(imgData, 'PNG', 0,0, 950, 640);
          pdf.save(`${name ? name.split(' ').join('_') : 'certificate'}.pdf`);
        });
  
        await Promise.all(pdfPromises);
      } catch (error) {
        console.error('Error capturing certificates:', error);
      }
    };
  
    
      
console.log(number);
  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.container} >
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
    <Model isOpen={isOpenModel} handleClose={() => setIsOpenModel(false)}>
        <div className='parnumber' >
          {number.map((num, index) => (
            <div key={index} ref={(ref) => (certificateRefs.current[index] = ref)}>
              <Certificate3 {...formState} />
            </div>
          ))}
          <button onClick={handleDownloadCertificate}>Download Certificates</button>
        </div>
      </Model>
    
    </>
    
  )
}

export default CertificateGeneratorBatch;