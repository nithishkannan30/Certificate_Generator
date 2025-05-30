import React, { useRef, useContext, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../assets/styles/certificateGenerator3.module.scss";
import { GlobalText } from "../context/DataText";
import "../assets/styles/Certificate.module.scss";
import Draggable from "react-draggable"; // Import react-draggable
import logo from "../../templateimages/logo.webp";
const Certificate = () => {
  const certificateRef = useRef(null);
  const focusedElement = useRef(null); // Tracks the currently focused contentEditable element.
  const { form_Data, imgData } = useContext(GlobalText);
  const [selectedColor, setSelectedColor] = useState("#000"); // Default color is black.
  const [selectedFontSize, setSelectedFontSize] = useState("24"); // Default font size in px.
  const [email,setEmail] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailCertificate = async () => {
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", [1000, 670]);
      pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
  
      const pdfBlob = pdf.output("blob");
      const { name } = form_Data; 
      const formData = new FormData();
      
      formData.append("certificate", pdfBlob, `${name}.pdf`);
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      formData.append("email", email); // Replace or get from form input
  
      await fetch("http://localhost:5000/send-certificate", {
        method: "POST",
        body: formData,
      });
  
      alert("Certificate sent via email!");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };
  

  const colors = [
    "#000",
    "#333",
    "#484848",
    "#484884",
    "#f00",
    "#0f0",
    "#00f",
    "#fff",
  ]; // Available colors.
  const fontSizes = ["12", "14", "16", "18", "20", "24", "26"]; // Available font sizes.
  const { name, course, signature, date } = form_Data;

  const divStyle = {
    backgroundImage: `url(../.${imgData})`,
  };

  const handleDownloadCertificate = async () => {
    alert("Downloading...");
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", [1000, 670]);
      pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
      pdf.save(`${name ? name.split(" ").join("_") : "certificate"}.pdf`);
    } catch (error) {
      console.error("Error capturing certificate:", error);
    }
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);

    if (focusedElement.current) {
      focusedElement.current.style.color = color;
    }
  };

  const handleFontSizeChange = (event) => {
    const fontSize = event.target.value;
    setSelectedFontSize(fontSize);

    if (focusedElement.current) {
      focusedElement.current.style.fontSize = `${fontSize}px`;
    }
  };

  return (
    <div className={styles.fullWrapper}>
      <div className={styles.certificateWrapper}>
        <div
          className={styles.certificateContainer}
          style={divStyle}
          ref={certificateRef}
        >
          <br />
          <br />
          <br />
          <br />
          <div style={{ position: "relative", width: "100%", height: "auto" }}>
            <Draggable>
              <img
                src={logo}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "200px",
                  height: "100px",
                  objectFit: "contain",
                  cursor: "move",
                  zIndex: 10,
                }}
                alt="Logo"
              />
            </Draggable>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <Draggable>
            <h1
              contentEditable={true}
              onFocus={(e) => (focusedElement.current = e.target)}
              onBlur={() => (focusedElement.current = null)}
              style={{
                color: selectedColor,
                fontSize: `${selectedFontSize}px`,
              }}
            >
              CERTIFICATE <span className={styles.span}> OF APPRECIATION</span>
            </h1>
          </Draggable>

          <Draggable>
            <span className={styles.smallText} contentEditable={true}>
              This certificate is proudly awarded to{" "}
            </span>
          </Draggable>
          <Draggable>
            <p
              className={styles.primaryItalicText}
              contentEditable={true}
              onFocus={(e) => (focusedElement.current = e.target)}
              onBlur={() => (focusedElement.current = null)}
              style={{
                color: selectedColor,
                fontSize: `${selectedFontSize}px`,
              }}
            >
              {name}
            </p>
          </Draggable>
          <Draggable>
            <span
              className={styles.smallText}
              contentEditable={true}
              onFocus={(e) => (focusedElement.current = e.target)}
              onBlur={() => (focusedElement.current = null)}
              style={{
                color: selectedColor,
                fontSize: `${selectedFontSize}px`,
              }}
            >
              for successfully completing the course
            </span>
          </Draggable>
          <Draggable>
            <h2
              contentEditable={true}
              onFocus={(e) => (focusedElement.current = e.target)}
              onBlur={() => (focusedElement.current = null)}
              style={{
                color: selectedColor,
                fontSize: `${selectedFontSize}px`,
              }}
            >
              {course}
            </h2>
          </Draggable>
          <Draggable>
            <span
              className={styles.smallText}
              contentEditable={true}
              onFocus={(e) => (focusedElement.current = e.target)}
              onBlur={() => (focusedElement.current = null)}
              style={{
                color: selectedColor,
                fontSize: `${selectedFontSize}px`,
              }}
            >
              {`conducted on ${date}`}
            </span>
          </Draggable>

          {/* Draggable Signature Block */}
          <Draggable>
            <div className={styles.signatureBlock}>
              <span className={styles.horizontalBar}></span>
              {signature ? (
                <img
                  src={signature}
                  alt="Signature"
                  style={{
                    width: "200px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span className={styles.smallText}>Signature not provided</span>
              )}
              <br />
              <br />
              <br />
            </div>
          </Draggable>
        </div>
        {!name.includes(",") ? (
          <button
            style={{ marginTop: "3rem" }}
            onClick={handleDownloadCertificate}
          >
            DOWNLOAD PDF
          </button>
        ) : null}
      
        <input type="text" className={styles.Pace} placeholder="Enter your email address"
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
        
        <button onClick={handleEmailCertificate}>EMAIL CERTIFICATE</button>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <label htmlFor="colorSelect">Text Color:</label>
          <select
            id="colorSelect"
            value={selectedColor}
            onChange={handleColorChange}
            className={styles.select}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="fontSizeSelect">Text Size:</label>
          <select
            id="fontSizeSelect"
            value={selectedFontSize}
            onChange={handleFontSizeChange}
            className={styles.select}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Certificate;