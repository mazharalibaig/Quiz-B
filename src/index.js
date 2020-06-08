import React, { Component } from "react";
import "./assets/style.css";
import ReactDOM from "react-dom";
import quizService from "./quizService";
import QuestionBox from './components/QuestionBox';
import Results from "./components/Results";

class QuizComponent extends Component {

    constructor(props)
    {
        super();
        
        this.state = {
            questionBank: [],
            score: 0,
            responses: 0
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    

    getQuestions  = () => {

        
        quizService()
        .then(question => {
            this.setState({
                questionBank: question
            });
            
        })
    }

    computeAnswer = (answer,correct) => {

        if(answer === correct)
        {
            this.setState({score: this.state.score + 1});
        }

        this.setState({responses: this.state.responses < 5 ? this.state.responses +1 : 5});

    }

    playAgain = () => {

        this.getQuestions();
        this.setState({

            score:0,
            responses:0

        });

    }

    componentDidMount(){
        this.getQuestions();
    }

    render(){
        return(
            <div className="container">
                <div className="title">QuizBee</div>
                {this.state.questionBank.length > 0 && 
                    this.state.responses < 5 &&
                        this.state.questionBank.map(
                            ({question,answers,correct,questionID}) => {
                                console.log(question);
                                console.log(answers);
                                console.log(correct);
                                console.log(questionID);
                                return(<QuestionBox 
                                    question={question} 
                                    options={answers}
                                    selected = {answer => this.computeAnswer(answer,correct)}
                                />);})}

                                {this.state.responses === 5 ? <Results score={this.state.score} playAgain={this.playAgain} /> : null}

            </div>
        );
    }
}

ReactDOM.render(<QuizComponent />, document.getElementById("root"));