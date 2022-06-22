import React,{useState,useEffect} from "react"
import axios from "axios"
import Styled from "./edit.module.css"

export const EditRules = () =>{

    const [condition,setCondition] = useState()
    const [action,setAction] = useState()

    useEffect(()=>{
        getConditions()
        getActions()
    },[])

    const addCondition = () =>{

        const txt = { text:"New condition"}

        axios.post("http://localhost:8889/conditions",txt)
        .then(()=>{
            getConditions()
        })
    }

    const getConditions = () =>{
        axios.get("http://localhost:8889/conditions")
        .then(({data})=>{
            setCondition(data)
        })
    }

    const deleteCondition = (id)=>{
        console.log("index",id)
        axios.delete(`http://localhost:8889/conditions/${id}`)
        .then(()=>{
            getConditions()
        })
    }

    const addAction = () =>{

        const txt = { text:"New Action"}

        axios.post("http://localhost:8889/actions",txt)
        .then(()=>{
            getActions()
        })
    }

    const getActions = () =>{
        axios.get("http://localhost:8889/actions")
        .then(({data})=>{
            setAction(data)
        })
    }

    const deleteAction = (id)=>{
        console.log("index",id)
        axios.delete(`http://localhost:8889/actions/${id}`)
        .then(()=>{
            getActions()
        })
    }

    if(condition === undefined)
    {
        return <div style={{transform:"translate(400px,200px)",fontSize:50}}>None</div>
    }

    if(action === undefined)
    {
        return <div style={{transform:"translate(400px,200px)",fontSize:50}}>None</div>
    }

    let conditions = ""; 
    let actions = "";
    conditions = condition.length >= 8?"* Maximum 8 conditions allowed":""
    actions = action.length >= 5?"* Maximum 5 actions allowed":""
    
    return <div className={Styled.editPage}>
        <div className={Styled.editTop}>
            <h3>Default Rule</h3>
            <div className={Styled.editButton}>
                <p>Button Name</p>
                <input type="text" value="Create PO"/>
            </div>
            <div className={Styled.ifAll}>
                <div>if All
                <img src={process.env.PUBLIC_URL + '/barrow.svg'} alt="svg" />
            </div>
            of the following conditions are met:  
            </div>
           {condition.map((el,index)=>(
             <div className={Styled.text}>
                <div>
                    text
                    <img src={process.env.PUBLIC_URL + '/barrow.svg'} alt="svg" />
                </div>
                <div>
                    Contains
                    <img src={process.env.PUBLIC_URL + '/barrow.svg'} alt="svg" />
                </div>
                <div className={Styled.urgent}>
                    <div className={Styled.urgentText}>Urgent
                    <img src={process.env.PUBLIC_URL + './wrong.svg'} alt="svg" />
                    </div>
                    <div className={Styled.type}>
                        <span>Type to search & add</span>
                        <b>Add from list</b>
                    </div>
                </div>
                <img className={Styled.whiteBin} 
                onClick={()=>{deleteCondition(el.id)}}
                src={process.env.PUBLIC_URL + '/Wdelete.png'} alt="svg" />
             </div>
           ))}
            <button disabled={condition.length > 8}
            className={Styled.Condition} 
            style={{background:condition.length>=8?"red":"",
            color:condition.length>= 8?"white":"",}}
            onClick={addCondition}>
                Add New Condition
                </button>
                <p style={{color:"red",transform:"translate(1px,-55px)"}}>{conditions}</p>
        </div> 
        <div className={Styled.perform}>
            <b>Perform the following action:</b>
            {action.map((el,index)=>(
                <div>
                    <div className={Styled.start}>
                        <img src={process.env.PUBLIC_URL + '/play.png'} alt="svg" />
                        <span>START NEW APP</span>
                        <b>Setup</b>
                    </div>
                    <img className={Styled.whiteBin} 
                    onClick={()=>{deleteAction(el.id)}}
                    src={process.env.PUBLIC_URL + '/Wdelete.png'} alt="svg" />
                </div>
            ))}
        </div>
        <hr style={{marginLeft:"2%"}}/>
        <button disabled={action.length > 4}
            className={Styled.action} 
            style={{background:action.length>= 5?"red":"",
            color:action.length>= 5?"white":""}}
            onClick={addAction}>
            Add another action
        </button>
        <p style={{color:"red",transform:"translate(22px,-60px)"}}>{actions}</p>

        <div style={{margin:"3% 3% 1% 0",textAlign:"right",color:"gray"}}>© 2019 Hubbler Pvt Ltd</div>
    </div>  
}