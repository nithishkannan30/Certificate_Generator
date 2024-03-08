import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../assets/styles/certificateGenerator3.module.scss'
const Certificate = ({name,course,date,signature}) => {
  const certificateRef=useRef(null);
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
  
  return (
    <>
      <div className={styles.certificateWrapper}>
        <div className={styles.certificateContainer} ref={certificateRef}>
            <div>Logo here</div>
            <h1>CERTIFICATE <span className={styles.span}> OF APPRECIATION</span> </h1>
            <span className={styles.smallText}>This certificate is proudly awarded to </span>
            <p className={styles.primaryItalicText} contentEditable={true}>{name}</p>
            <span className={styles.smallText} contentEditable={true}>for successfully completing the course</span>
            <h2>{course}</h2>
            <span className={styles.smallText}>
                {`conducted on ${date}`}
            </span>
            <div className={styles.signatureBlock}>
                <img className={styles.signatureImage} src={signature.preview} alt=''></img>
                <span className={styles.horizontalBar}></span>
                <span className={styles.smallText}>{signature}</span>
            </div>
        </div>
       {!name.includes(',')?<button style={{marginTop:'3rem'}} onClick={handleDownloadCertificate}>DOWNLOAD PDF</button>:null}
    </div>
  
    </>
  )
}

export default Certificate
