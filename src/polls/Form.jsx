import React, { Component } from "react";
import nano from "nanoid";

export class Form extends Component {
  state = {
    question: "",
    answers: [],
    answerInput: ""
  };

  handleQuestionInputChange = e => this.setState({ question: e.target.value });

  handleAnswerInputChange = e => this.setState({ answerInput: e.target.value });

  onAddAnswer = event => {
    event.preventDefault();

    if (this.state.answerInput.length > 0) {
      this.setState(state => ({
        answerInput: "",
        answers: [
          ...state.answers,
          {
            id: nano(),
            name: state.answerInput,
            votes: 0
          }
        ]
      }));
    }
  };

  onRemoveAnswer = id =>
    this.setState(state => ({
      ...state,
      answers: state.answers.filter(answer => answer.id !== id)
    }));

  handlePollFormSubmit = event => {
    event.preventDefault();
    const { question, answers } = this.state;

    if (question.length > 0 && answers.length > 0) {
      const id = nano();
      const poll = {
        id,
        question
      };

      const pollAnswers = answers.map(answer => ({ ...answer, pollId: id }));
      console.log(poll);
      console.log(pollAnswers);
      this.props.addPoll({ poll, pollAnswers });
      this.setState({ question: "", answers: [], answerInput: "" });
    }
  };

  render() {
    const { answers } = this.state;

    return (
      <div className="form-container">
        <div className="form">
          <h2>Add new poll</h2>
          <label>Poll question</label>
          <input
            type="text"
            value={this.state.question}
            placeholder="Question"
            onChange={this.handleQuestionInputChange}
          />
          <label>Poll answers</label>
          <input
            type="text"
            value={this.state.answerInput}
            placeholder="type answer"
            onKeyDown={e => e.key === "Enter" && this.onAddAnswer(e)}
            onChange={this.handleAnswerInputChange}
          />
          <button onClick={this.onAddAnswer}>Add answer</button>
          <ul>
            {answers.length > 0 &&
              answers.map(answer => (
                <li key={answer.id}>
                  <button
                    className="answer-remove-btn"
                    onClick={e => {
                      e.preventDefault();
                      this.onRemoveAnswer(answer.id);
                    }}
                  >
                    <i className="fa fa-times" />
                  </button>
                  {answer.name}
                </li>
              ))}
          </ul>
          <button className="add-poll-btn" onClick={this.handlePollFormSubmit}>
            Add poll
          </button>
        </div>
      </div>
    );
  }
}
