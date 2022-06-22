import Styled from "./header.module.css"
import React from "react"

export const Header = () =>{
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
            <img src={process.env.PUBLIC_URL + '/rightArrow.svg'} alt="svg" />
            <div>
                <b>Create PO</b>
                <p>BUTTON</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/rightArrow.svg'} alt="svg" />
            <div className={Styled.lastTag}>
                <b>Button Rules</b>
            </div>
        </div>
        <div className={Styled.rightHeader}>
            <p style={{color:"rgb(136, 136, 134)"}}>App saved on 27 Jul 2017 4:32pm</p>
            <button>Done</button>
        </div>
    </div>
}