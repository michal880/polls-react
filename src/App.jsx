import React, { Component } from "react";

import "./styles.css";
import { Header } from "./Header";

import { PollsList } from "./polls/PollsList";
import { Form } from "./polls/Form";

class App extends Component {
  state = {
    polls: [],
    poll: {},
    answers: []
  };
  componentDidMount() {
    const endpoint = "https://skygate.io/api/polls";
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const answers = data.reduce((acc, val) => [...acc, ...val.votes], []);
        this.setState({
          polls: data.map(poll => ({ id: poll.id, question: poll.question })),
          answers
        });
      });
  }
  addPoll = ({ poll, pollAnswers }) => {
    this.setState(state => ({
      polls: [...state.polls, poll],
      answers: [...state.answers, ...pollAnswers]
    }));
    console.log(poll);
    this.sendPollToAdd({ poll, pollAnswers });
  };

  removePoll = id => {
    this.setState(state => ({
      polls: state.polls.filter(poll => poll.id !== id),
      answers: state.answers.filter(answer => answer.pollId !== id)
    }));
    this.sendRemovePoll(id);
  };

  voteOnAnswer = ({ pollId, answerId }) => {
    const answers = this.state.answers.map(
      answer =>
        answer.id === answerId && answer.pollId === pollId
          ? { ...answer, score: answer.score + 1 }
          : answer
    );
    this.sendVoteForPoll({ answerId, pollId });
    this.setState({
      answers
    });
  };
  removeVoteFromAnswer = ({ pollId, answerId }) => {
    const answers = this.state.answers.map(
      answer =>
        answer.id === answerId && answer.pollId === pollId
          ? { ...answer, score: answer.score - 1 }
          : answer
    );
    this.removeVoteFromPoll({ answerId, pollId });
    this.setState({
      answers
    });
  };

  sendVoteForPoll = ({ answerId, pollId }) => {
    const endpoint = "https://skygate.io/api/polls";
    fetch(endpoint + "/" + pollId + "/votes/" + answerId, {
      method: "post"
    });
  };
  removeVoteFromPoll = ({ answerId, pollId }) => {
    const endpoint =
      "https://cors-anywhere.herokuapp.com/https://skygate.io/api/polls";
    fetch(endpoint + "/" + pollId + "/votes/" + answerId, {
      method: "delete"
    });
  };
  sendRemovePoll = id => {
    const endpoint =
      "https://cors-anywhere.herokuapp.com/https://skygate.io/api/polls";
    fetch(endpoint + "/" + id, {
      method: "delete"
    });
  };
  sendPollToAdd = ({ poll, pollAnswers }) => {
    console.log(poll);
    const endpoint = "https://skygate.io/api/poll";
    const payload = JSON.stringify({
      question: poll.question,
      votes: [...pollAnswers]
    });
    console.log(payload);
    fetch(endpoint, {
      method: "post",
      body: payload
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <PollsList
          polls={this.state.polls}
          answers={this.state.answers}
          removePoll={this.removePoll}
          voteOnAnswer={this.voteOnAnswer}
          removeVoteFromAnswer={this.removeVoteFromAnswer}
        />
        <Form addPoll={this.addPoll} />
      </div>
    );
  }
}

export default App;
