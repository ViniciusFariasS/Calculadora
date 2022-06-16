import React, { Component } from "react";
import './Calculator.css'

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

    state = { ...initialState }//clonando para state

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }


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
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay


        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
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
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button Name="AC" click={this.clearMemory} triple />
                <Button Name="/" click={this.setOperation} operation />
                <Button Name="7" click={this.addDigit} />
                <Button Name="8" click={this.addDigit} />
                <Button Name="9" click={this.addDigit} />
                <Button Name="*" click={this.setOperation} operation />
                <Button Name="4" click={this.addDigit} />
                <Button Name="5" click={this.addDigit} />
                <Button Name="6" click={this.addDigit} />
                <Button Name="-" click={this.setOperation} operation />
                <Button Name="1" click={this.addDigit} />
                <Button Name="2" click={this.addDigit} />
                <Button Name="3" click={this.addDigit} />
                <Button Name="+" click={this.setOperation} operation />
                <Button Name="0" click={this.addDigit} double />
                <Button Name="." click={this.addDigit} />
                <Button Name="=" click={this.setOperation} operation />
            </div>
        )
    }
}