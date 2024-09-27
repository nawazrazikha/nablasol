import { useState, useContext, createContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
 const [projectName, setProjectName]=useState('');
 const [client, setClient]=useState('');
 const [dates, setDates]=useState(new Date());
 const [notes, setNotes]=useState('')
 const [selectView, setSelectView]=useState('')



  return (
    <FormContext.Provider 
      value={{
        projectName,
        setProjectName,
        client,
        setClient,
        dates,
        setDates,
        notes,
        setNotes,
   
        selectView,
        setSelectView,
       
       
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormContext;