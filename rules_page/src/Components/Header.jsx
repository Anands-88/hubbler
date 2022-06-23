import Styled from "./header.module.css"
import React, { useContext,useEffect,useState } from "react"
import { RuleContext } from "./rule_context"

export const Header = () =>{

    const [buttonType,setButtonType] = useState("Done");
    const [save,setSave] = useState("App saved on 12 Dec 2021 12:12pm")

    const {text,pageType} = useContext(RuleContext)
    
    let savedDate;

    if(buttonType == "Edit")
    {
       let date = new Date()
       let year = date.getFullYear()
       let month = date.getMonth()
       let day = date.getDate()
       let hour = date.getHours()
       let min = date.getMinutes() 

       let months = ["Jan","Feb","Mar","Apr","May",
        "Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

        month = months[month]

        if(min<=9)
        {
            min = "0"+min
        }
       
        savedDate = `App saved on ${day} ${month} ${year} ${hour}:${min}`
    }

    useEffect(()=>{
        if(savedDate)
        {
            setSave(savedDate)
        }
    },[savedDate])

    pageType(buttonType)

    return <div className={Styled.header}>
        <div className={Styled.leftHeader}>
            <div>
                <b>Demo Custom App</b>
                <p>APP NAME</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/rightArrow.svg'} alt="svg" />
            <div>
                <b>Assessment</b>
                <p>STAGE</p>
            </div>
           {text.txt === undefined?<></>:
            <>
                <img src={process.env.PUBLIC_URL + '/rightArrow.svg'} alt="svg" />
                <div>
                    <b>{text.txt}</b>
                    <p>BUTTON</p>
                </div>
                <img src={process.env.PUBLIC_URL + '/rightArrow.svg'} alt="svg" />
                <div className={Styled.lastTag}>
                    <b>Button Rules</b>
                </div>
            </>}
        </div>
        <div className={Styled.rightHeader}> 
            <p style={{color:"rgb(136, 136, 134)"}}>{save}</p>
            <button onClick={()=>{
                setButtonType(buttonType=="Done"?"Edit":"Done")
            }}>{buttonType}</button>
        </div>
    </div>
}