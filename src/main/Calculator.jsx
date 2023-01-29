import React, {Component} from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay:true}) // se clicou na operação e o current atual é 0, passe a operação para o operation, current altera pra 1 e limpe o display
        } else { // ou seja, é uma operação contínua
            const equals = operation === '='
            const currentOperation = this.state.operation //sete o valor atual da operação

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                values[0] = this.state.values
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n == '.' && this.state.displayValue.includes('.')) {
            return //se o usuário digitou um ponto e o display já contem um ponto, retorne e volte para a próxima função
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay //limpe o display se o valor do display for zero ou se o booleano for true
        const currentValue = clearDisplay ? '' : this.state.displayValue //pegue o valor digitado se o clearDisplay for false
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false}) // altera o estado para exibir o valor e não limpar o display

        if (n !=='.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <div>
                <div>CALCULADORA</div>
                <div className="calculator">
                    <Display value={this.state.displayValue}/>
                    <Button label="AC" click={this.clearMemory} triple/>
                    <Button label="/" click={this.setOperation} operation/>
                    <Button label="7" click={this.addDigit}/>
                    <Button label="8" click={this.addDigit}/>
                    <Button label="9" click={this.addDigit}/>
                    <Button label="*" click={this.setOperation} operation/>
                    <Button label="4" click={this.addDigit}/>
                    <Button label="5" click={this.addDigit}/>
                    <Button label="6" click={this.addDigit}/>
                    <Button label="-" click={this.setOperation} operation/>
                    <Button label="1" click={this.addDigit}/>
                    <Button label="2" click={this.addDigit}/>
                    <Button label="3" click={this.addDigit}/>
                    <Button label="+" click={this.setOperation} operation/>
                    <Button label="0" click={this.addDigit} double/>
                    <Button label="." click={this.addDigit}/>
                    <Button label="=" click={this.setOperation} operation/>
                </div>
            </div>
        )
    }

}