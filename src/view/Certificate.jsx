import React, { useRef,useContext } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../assets/styles/certificateGenerator3.module.scss'
import { GlobalText } from '../context/DataText';
// ./templateimages/img1.png


const Certificate = () => {
  const certificateRef=useRef(null);
    const {form_Data,imgData} = useContext(GlobalText)
   const{name,course,signature,date}=form_Data;
const divStyle = {
    backgroundImage: `url(../.${imgData})`,
  };
  const handleDownloadCertificate = async () => {
    alert('Downloading...');
    
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', [1000, 670]);
      pdf.addImage(imgData, 'PNG', 0, 0, 1000, 667);
      pdf.save(`${name ? name.split(' ').join('_') : 'certificate'}.pdf`);
    } catch (error) {
      console.error('Error capturing certificate:', error);
    }
  };
  console.log(form_Data)
  return (
    <div className={styles.fullWrapper}>
      
       <div className={styles.certificateWrapper}>
        <div className={styles.certificateContainer} style={divStyle} ref={certificateRef}>
            <div>Logo here</div>
            <h1>CERTIFICATE <span className={styles.span}> OF APPRECIATION</span> </h1>
            <span className={styles.smallText}>This certificate is proudly awarded to </span>
            <p className={styles.primaryItalicText} contentEditable={true}>{name}</p>
            <span className={styles.smallText} contentEditable={true}>for successfully completing the course</span>
            <h2>{course}</h2>
            <span className={styles.smallText} contentEditable={true}>
                {`conducted on ${date}`}
            </span>
            <div className={styles.signatureBlock}>
               
                <span className={styles.horizontalBar}></span>
                <span className={styles.smallText}>{signature}</span>
            </div>
        </div>
       {!name.includes(',')?<button style={{marginTop:'3rem'}} onClick={handleDownloadCertificate}>DOWNLOAD PDF</button>:null}
    </div> 
  
    </div>
  )
}

export default Certificate
