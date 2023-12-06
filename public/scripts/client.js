$(document).ready(() => {
  const createTweetElement = function (tweet) {
    const $tweet = $(
      `<article><header><div class="header-left"><img src="${tweet.user.avatars}" alt="user-avatar" /><p>${tweet.user.name}</p></div><p>${tweet.user.handle}</p></header><h4>${tweet.content.text}</h4><footer><p class="footer-left">${tweet.created_at}</p><div class="footer-right"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer></article>`
    );

    return $tweet;
  };
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  renderTweets(data);
});
