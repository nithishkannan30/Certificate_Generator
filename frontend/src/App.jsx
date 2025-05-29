
import CertificateGenerator from './pages/CertificateGenerator'
import './App.css'
import Templates from './templates/templates'
import CertificateOption from './pages/CertificateOption/CertificateOption'
import Certificate from './view/Certificate'
import CertificateGeneratorBatch from './Batch/Batch'
import { Route,Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<CertificateGenerator/>}></Route>
        <Route path="/options" >
          <Route index element={<CertificateOption/>}></Route>

          <Route path=":id" element={<Certificate/>}></Route>
          
      </Route>

      </Routes>
      
     {/* <Templates/> */}
    {/* <CertificateGeneratorBatch/> */}
    </>
  )
}

export default App
