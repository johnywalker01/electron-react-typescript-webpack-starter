import React, { Component } from 'react'; 
import _ from 'lodash';
import { StyleSheet, css } from 'aphrodite/no-important';

const RefreshButton = (props) => {
    return (
        <div>
            <button
                className={css(styles.btn)}
                onClick={props.reloadStars}
                disabled={props.selectedNumbers.length !== 0}>&#8635;</button>;
        </div>
    );
}
const Stars = (props) => {
    return (
        <div className={css(styles.nzStarsWrapper)}>
            {_.range(props.numberOfStars).map(i=>
                <b key={i}>&#9733;</b>
            )}
        </div>
    );
}

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className={css(styles.btn, styles.btnSuccess)} 
            onClick={props.acceptAnwser}>
                <span role="img" aria-labelledby="TICK">&#10004;</span></button>;
            break;
        case false:
            button = <button className={css(styles.btn, styles.btnDanger)} >
                <span role="img" aria-labelledby="CROSS">&#10060;</span></button>;
            break;

        default:
            button = <button
                className={css(styles.btn)}
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0}>=</button>;
            break;
    }
    return (
        <div>
            {button}
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className={css(styles.nzAnswersWrapper)}>
            {props.selectedNumbers.map((number,i)=>
            <span key={i} className={css(styles.nzAnswers)}
            onClick={()=>props.unselectNumber(number)}>
            {number}</span>
            )}
        </div>
    );
}

const Numbers = (props) => {
    const numberClassName = (number) => {
        
        if (props.usedNumbers.indexOf(number) >= 0) {
            return css(styles.nzNumbers, styles.nzNumbersUsed);
        }
        else if (props.selectedNumbers.indexOf(number) >= 0) {
            return css(styles.nzNumbers, styles.nzNumbersSelected);
        }
        else{
            return css(styles.nzNumbers);
        }
    }

    return (
        <div className={css(styles.nzNumbersWrapper, styles.greyBorder)}>
            {Numbers.list.map((number, i) =>
                <span key={i} 
                className={numberClassName(number)}
                onClick={()=>props.selectNumber(number)}>
                {number}</span>
            )}
        </div>
    );
}
Numbers.list = _.range(1, 10);

class Game extends Component {
    static numberOfStars = () => _.random(1, 9, false);
    state = {
        numberOfStars: Game.numberOfStars(),
        selectedNumbers: [],
        answerIsCorrect: null,
        usedNumbers: [],
    }

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect:null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        })

        );
    }

    unselectNumber=(clickedNumber)=>{
        this.setState(prevState => ({
            answerIsCorrect:null,
            selectedNumbers: prevState.selectedNumbers.filter(number=>number!==clickedNumber)
        }))
    }

    checkAnswer = () => {
        this.setState({
            answerIsCorrect: (this.state.numberOfStars === _.sum(this.state.selectedNumbers) ? true : false),
        });
    }

    acceptAnwser = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.numberOfStars(),
        }));
    }
    
    reloadStars = () => {
        this.setState(prevState => ({
            numberOfStars: Game.numberOfStars(),
            selectedNumbers: [],
            answerIsCorrect: null,
            usedNumbers: [],
        }));
    }

    render() {
        const {
            numberOfStars,
            selectedNumbers,
            answerIsCorrect,
            usedNumbers,
         } = this.state;
        return (
            <div>
                <h3>Play Nine</h3>
                <hr />
                <div className={css(styles.nzGameSecAWrapper)}>
                    <Stars numberOfStars={numberOfStars}/>
                    <div>
                    <Button selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect} 
                        acceptAnwser={this.acceptAnwser}/>
                    <RefreshButton selectedNumbers={selectedNumbers}
                        reloadStars={this.reloadStars} />

                    </div>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers} />
                </div>
                <br />
                <Numbers
                    selectedNumbers={selectedNumbers}
                    usedNumbers={usedNumbers}
                    selectNumber={this.selectNumber} />
            </div>
        );
    }
}


class C_Bot01 extends Component {
   
    render() {
        return (
            <div>
                <Game/>
            </div>
        );
    }
}

export default C_Bot01;

const styles = StyleSheet.create({
    nzStarsWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 20px)',
        gridGap: 2,
    },
    nzGameSecAWrapper: {
        display: 'grid',
        gridTemplateColumns: '100px 50px 80px',
        gridGap: 2,
    },
    nzAnswersWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 24px)',
        gridGap: 2,
        padding:5,
    },
    nzAnswers: {
        textAlign: 'center',
        backgroundColor: '#ccc',
        width: 18,
        height:18,
        borderRadius: '50%',
        cursor: 'pointer',
    },
    nzNumbersWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 24px)',
        gridGap: 2,
        padding:5,
    },
    nzNumbers: {
        textAlign: 'center',
        backgroundColor: '#ccc',
        width: 18,
        borderRadius: '50%',
        cursor: 'pointer',
    },
    nzNumbersSelected: {
        backgroundColor: '#E9E7E9',
        cursor: 'not-allowed',
        color:'grey',
    },
    nzNumbersUsed: {
        backgroundColor: '#4CAF50',
        cursor: 'not-allowed',
        color:'grey',
    },
    greyBorder: {
        border: '1px solid grey',
    },
    btn: {
        border: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: 4,
        padding:'5px 12px',
    },
    btnSuccess: {
        color:'white',
        backgroundColor: '#4CAF50',
    },
    btnDanger: {
        color:'white',
        backgroundColor: '#f44336',
    },
    
});