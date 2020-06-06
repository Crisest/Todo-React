import React from 'react'
import AddOption from './AddOption'
import Header from  './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './Option-Modal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }    
    handleDeleteOptions = () =>{
        this.setState(() => ({ options: []}))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }))
    }
    handlePick = () => {
        const random = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[random]
        this.setState(() => ({selectedOption: option}))
    }
    handleAddOption = (option) => {
        if(!option){
            return 'Enter Valid value to add item'
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'This item is already on the list'
        }
        this.setState((prevState) => ({
            options: prevState.options.concat([option])
        }))    
    }
    handleDeleteSelectedOption = () =>{
        this.setState(() => ({selectedOption: undefined}))
    }
    componentDidMount(){
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if(options){
                this.setState(() => ({options}))  
            } 
        } catch (error) {
            console.log(error)
        }       
    }
    componentDidUpdate(prevProps, prevState){
        
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            console.log('saving data');
            localStorage.setItem('options', json)
        }
    }
    render(){
        
        const subtitle = "Put your life if the hands of a computer";
        return(
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <div className="widget">
                    <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption handleAddOption={this.handleAddOption}/>
                    <OptionModal 
                        selectedOption={this.state.selectedOption} 
                        handleDeleteSelectedOption={this.handleDeleteSelectedOption}
                    />
                </div>
                <a href="https://yorm.ca/">Return to Portfolio</a>
                
                </div>
            </div>
            );
    }
}
