import React, { useState, useContext } from "react";
import db from "../../../db/data.json";
import { useLocation, useNavigate} from "react-router-dom";
import { GlobalText } from "../../context/DataText";
import styles from "./CertificateOption.module.css";
function CertificateOption() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setImgData } = useContext(GlobalText);
  const formData = location.state.formData;
  const [images, setImages] = useState(db);
  function handleCLick(imageData,id) {
    setImgData(imageData)
    navigate(`/options/${id}`)
  }
  return (
    <>
    <div className={styles.title}>
      <h1>Choose Your Beautiful Designs from here! </h1>  
      </div>
    <div className={styles.container}>
      {images.data.map((item, index) => {
        return (
          item.images && (
            <div className={styles.template}id={index}>
              <img
                src={item.images}
                alt=""
                onClick={() => 
                 handleCLick(item.images,item.id)
                }
                
              />
              <h2>Design : {item.id}</h2>
            </div>
          )
        );
      })}
    </div>
    </>
  );
}

export default CertificateOption;
