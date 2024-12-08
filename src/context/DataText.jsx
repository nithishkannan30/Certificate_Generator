import { useState, createContext } from "react";

export const GlobalText = createContext(null);

export default function GlobalState({ children }) {
    const [form_Data, setFormData] = useState({name:'',course:'',signature:'',date:0});
    const [imgData, setImgData] = useState("");

    return (
        <GlobalText.Provider
            value={{
                form_Data,
                setFormData,
                imgData,
                setImgData
            }}
        >
            {children}
        </GlobalText.Provider>
    );
}


