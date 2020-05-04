import React from 'react'
import Option from './Option'

const Options = (props) => {
    return(
    <div>
        {props.options.length === 0 && <p>Please Add options to get started!</p>}
        <ol>
            {props.options.map((option) => (
                <div>
                    <li><Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    /></li>
                </div>
            ))}
        </ol>
        
        
        <button onClick={props.handleDeleteOptions}>Remove All</button>
    </div>)
}

export default Options