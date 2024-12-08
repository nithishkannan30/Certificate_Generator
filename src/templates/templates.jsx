import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './template.css'
const Templates = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
 
      <div className='templatemain'>
        <h1>Choose Your Template</h1>
        <ul className='ul'>
          {jsonData.map(item => (
            <li key={item.id} className='li'>
              <img src={item.images} alt='img'/>
              <div>
                  <button type='button'>CHOOSE</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  
  );
};

export default Templates;
