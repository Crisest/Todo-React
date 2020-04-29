class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options : []
        }
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
    componentWillUnmount(){
        console.log('componentwillUnmount');
    }
    handleDeleteOptions(){
        this.setState(() => ({ options: []}))
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }))
    }


    handlePick(){
        const random = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[random])
    }
    handleAddOption(option){
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
    render(){
        const title ="Indecision App";
        const subtitle = "Put your life if the hands of a computer";
        return(<div>
            <Header title={title} subtitle={subtitle}/>
            <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
            <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>);
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle }</h2>}
        </div>
    );
}
Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    )
}

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

const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button
             onClick={(e) => {
                props.handleDeleteOption(props.optionText)
             }}
            >
                Remove
            </button>
        </div>
        );
}

class AddOption extends React.Component {
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        
        const error = this.props.handleAddOption(option);
        this.setState(() => ({error}))
        if(!error){
            e.target.elements.option.value = ''
        }
        
    }
    render(){


        return(<div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button type="submit">Add option</button>
                </form>
            </div>);
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'))