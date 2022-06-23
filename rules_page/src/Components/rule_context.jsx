import { createContext, useState } from "react";

export const RuleContext = createContext()

export const RuleContextProvider = ({children})=>{

    const [text,setText] = useState({
        txt:"",
        index:""
    })
    const [addedRule,setAddedRule] = useState()

    const [mode,setMode] = useState()

    const newRule = (value) =>{
       setAddedRule(value)
    }

    const ruleClick = (index,array)=>{

        if(index === -1)
        {
            setText({...text,txt:"Default Rule",index:-1})
        }
        else
        {
            setText({...text,txt:array[index]?.text,index:array[index]?.id})
        } 
    }

    const pageType = (type) =>{

        setMode(type)
    }


    return <RuleContext.Provider value={{newRule,ruleClick,text,addedRule,pageType,mode}}>{children}</RuleContext.Provider>
}