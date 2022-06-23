import axios from "axios"
import { Dots } from "./dots"
import React, { useContext, useEffect, useState } from "react"
import Styled from "./leftRules.module.css"
import { RuleContext } from "./rule_context"

export const AddRules = ()=>
{
    const [rules,setRules] = useState([])
    const [click,setClick] = useState()

    const {ruleClick,addedRule,text} = useContext(RuleContext)
 
    useEffect(()=>{
        ruleClick(click,rules)
    },[click])

    useEffect(()=>{
        getRules()
    },[])

    useEffect(()=>{
        let obj = {text:addedRule,id:text.index}
        axios.put(`http://localhost:8882/rules/${text.index}`,obj)
        .then(()=>{
            getRules()
        })
    },[addedRule])
 
    const addRule = () =>{

        const txt = { text:"New Rule"}

        axios.post("http://localhost:8882/rules",txt)
        .then(()=>{
            getRules()
        })
    }

    const getRules = () =>{
        axios.get("http://localhost:8882/rules")
        .then(({data})=>{
            setRules(data)
        })
    }

    const deleteRule = (id)=>{

        axios.delete(`http://localhost:8882/rules/${id}`)
        .then(()=>{
            getRules()
        })
    }

    if(rules === undefined)
    {
        return <div></div>
    }

    let msg = "";
    msg = rules.length >= 5?"* Maximum 5 rules allowed":""

    return <div style={{width:"25%"}}>
        <div className={Styled.backStages}>
            <img src={process.env.PUBLIC_URL + '/leftArrow.svg'} alt="svg" />
            <b>Back to Stages</b>
        </div>
        <div className={Styled.Rules}>
            <b>RULES <b>{rules.length}</b></b>
                <div>
                    <div className={Styled.Left}>
                        <div className={Styled.dot} id={Styled.firstDot}
                        style={{background:-1 === click?"gray":""}}></div>
                        {rules.map((rule,index)=>(
                        <>
                            <div className={Styled.line}></div>
                            <div className={Styled.dot} style={{background:index === click?"gray":""}}></div>
                        </>
                            ))}
                    </div>
                    
                    <div className={Styled.Right}>
                        <div className={Styled.default}>
                                <div onClick={()=>{setClick(-1)}} style={{border:-1===click?"3px solid #a6cef3":"none"}}>
                                    <Dots></Dots>
                                    Default Rule
                                </div>
                                <img src={process.env.PUBLIC_URL + '/copyPaste.svg'} alt="svg" />
                                <img src={process.env.PUBLIC_URL + '/delete.svg'} alt="svg" />
                        </div>
                        {rules?.map((rule,index)=>(
                             <div className={Styled.default}>
                                <div id={Styled.ruleBox} onClick={()=>{setClick(index)}} style={{border:index===click?"3px solid #a6cef3":"none"}}>
                                    {rule.text}
                                </div>
                                <img src={process.env.PUBLIC_URL + '/copyPaste.svg'} alt="svg"/>
                                <img src={process.env.PUBLIC_URL + '/delete.svg'} alt="svg" onClick={()=>{deleteRule(rule.id)}}/>
                            </div>
                        ))}
                       
                        <button disabled={rules.length >= 5} 
                        style={{background:rules.length>= 5?"red":""}}
                        onClick={addRule}>
                            Add New Rule
                        </button>
                        <p style={{color:"red"}}>{msg}</p>
                    </div>
            </div>
        </div>
        <div className={Styled.Footline}>
        <svg fill="gray" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="64px" height="64px">
            <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"/>
        </svg>
            Deleted Rules</div>
    </div>
}