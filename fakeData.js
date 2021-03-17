let fakeDataUsers = [
  {
    id: 1,
    userName: "khanh",
    refreshToken: null,
  },
  {
    id: 2,
    userName: "khanhnoi",
    refreshToken: null,
  },
];

const fakeDataPosts = [
  {
    id: 1,
    userId: 1,
    post: "This is a post by User1 Khanh",
  },
  {
    id: 2,
    userId: 2,
    post: "This is a post by User2 KhanhNoi",
  },
  {
    id: 3,
    userId: 3,
    post: "This is a post by User3 Nobody",
  },
  {
    id: 6,
    userId: 2,
    post: "This is a post by User2 KhanhNoi",
  },
];

module.exports = {
  fakeDataUsers,
  fakeDataPosts,
};
