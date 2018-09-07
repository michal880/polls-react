export const polls = [
  {
    id: 1,
    question: "Do you like JS?"
  },
  {
    id: 2,
    question: "Your favourite meal"
  }
];

export const answers = [
  {
    id: 1,
    name: "Yes",
    votes: 39,
    pollId: 1
  },
  {
    id: 2,
    name: "Of course",
    votes: 28,
    pollId: 1
  },
  {
    id: 1,
    name: "Pizza",
    votes: 19,
    pollId: 2
  },
  {
    id: 2,
    name: "Donuts",
    votes: 2,
    pollId: 2
  },
  {
    id: 3,
    name: "Kiwi",
    votes: 7,
    pollId: 2
  }
];

[
  {
    id: 2,
    question: "Does it work?",
    votes: [
      { id: 3, pollId: 2, name: "yes", score: 0 },
      { id: 4, pollId: 2, name: "no", score: 0 },
      { id: 5, pollId: 2, name: "maybe", score: 0 }
    ],
    createdAt: "2018-09-07T14:00:32Z"
  },
  {
    id: 1,
    question: "Are you sure?",
    votes: [
      { id: 1, pollId: 1, name: "Yes", score: 20 },
      { id: 2, pollId: 1, name: "No", score: 0 }
    ],
    createdAt: "2018-09-07T13:46:45Z"
  }
];
