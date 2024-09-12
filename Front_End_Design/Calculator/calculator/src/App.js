import logo from './logo.svg';
import './App.css';
import React from 'react';



/* #### User story One
 * - User clicks buttons denoting expression for which they need calculation
 *    - Listen for click event, prevent button default action, update inputStat
 * - User clicks enter to evaluate the calculation
 *    - Validate expression , return error if any bloopers are found
 *      - turn input string into a list and pop out elements one by one
 *      - if element is a number string, it is an operand, turn it into a digit
 *        and add it to some storage buffer then continue popping items from th e list.
 *      - if anything that is not an operand or a number is encountered, return error
 *      - if another number is encountered, append it to the buffer after parsing it to digit data type.
 *      - if an operator is encountered (one of + / - *), store it in a seperate operator buffer. 
 *      - if anything  other than a number or space is encountered on the next pop after detecting an operator, return error.
 *      - If a number is encountered, parse it to string. Now send the expression over to the calculator which will return a result based off of the operand,
 *      - every expression while parsing will therefore have 2 operands and one operator each.
 *      - there shall be two operant buffers and one operator buffer.
 *      - there shall be one result buffer, this shall by default hold the value 0. 
 *      - the result buffer will after every evaluation be equal to the result of that evaluation.
 *
 * - User gets the result printed to the screen
 * */






class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.state  = {
			currentInputValue: '',
			curretOutputValue: ''
		}
		this.handleClick = this.handleClick.bind(this);
		this.arithmeticHandler = this.arithmeticHandler.bind(this);
		this.parser = this.parser.bind(this);
		this.isOperand = this.isOperand.bind(this);
		this.isOperator = this.isOperator.bind(this);
		this.operands = '1 2 3 4 5 6 7 8 9 0'.split(' ');
		this.operators = '+ * / -'.split(' ');
	}

	isOperand(token){
		return operands.includes(token.toString());
	}

	isOperator(token){
		return operators.includes(token.toString());
	}

	parser(){

		console.log('Entered parser mode');
		let operandOne;
		let operandTwo;
		let operator;
		let result;
		let expression = this.state.currentInputValue.split(' ').reverse();
		let currentToken;
		let previousToken = '';
		let tempExpression = '';
		let success = '';
		while(expression.length > 0){
			currentToken =  expression.pop();
			if (this.isOperand(currentToken)){
				if(this.isOperand(previousToken)){
					tempExpression += currentToken
					previousToken = currentToken
					continue;
				} else if (this.isOperator(previousToken)){
					tempExpression += currentToken;
					result = this.evaluateExpression(expression);
					continue;
				} else {
					tempExpression = currentToken;
					previousToken = currentToken;
					continue;
				}
			} else if (this.isOperator(currentToken)){
				if(this.isOperator(previousToken)){
					console.log('error: Bad expression');
					success = false;
					break;
				} else if (this.isOperand(previousToken)) {
					tempExpression += currrentToken;
					previousToken = currentToken;
					continue;
				} else {
					// user entered operator first without any operands
					success = false;
					break;
				}

			}
		}

	}

	arithmeticHandler(){


	}

        handleClick(event){
		event.preventDefault();
		// update inputState
		let targetValue = event.target.value;
		let validOps = '+ - * / 1 2 3 4 5 6 7 8 9 0'.split(' ');
		if(validOps.includes(targetValue)){
			this.setState((state)=>(
			{currentInputValue: state.currentInputValue + ' ' + event.target.value}
		))
		} else if (targetValue === 'CLR'){
			this.setState(
				{
					currentInputValue:'',
				}
			)
		} else if (targetValue === '='){
			this.parser();
		}
		// wait for enter button to validate input

	}



	render(){
		// ui setup
		let operands = [1,2,3,4,5,6,7,8,9,0];
		let operators = '+ - / CLR * ='.split(' ');
		return(
			<div>
	                   <p>Operands:</p>
			   {operands.map(operand=>(<button onClick={this.handleClick} className='button btn-secondary' value={operand} key={operand}>{operand}</button>))}
			   <p>Operators:</p>
			   {operators.map(operator=>(<button onClick={this.handleClick} className='button btn-secondary' value={operator} key={operator} >{operator}</button>))}
			<hr />
			<p> This is the output panel </p>
			<input value={this.state.currentInputValue} className='currentInput' disabled />
			<input value={this.state.currentOutputValue} className='currentOutput' disabled />
			</div>
		)
	}

}



class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
			 This is a test line.
			<hr />
			<Calculator />
			</div>

		)
	}
}


export default App;
