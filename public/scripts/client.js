$(document).ready(() => {
  const createTweetElement = function (tweet) {
    const $tweet = $(
      `<article><header><div class="header-left"><img src="${tweet.user.avatars}" alt="user-avatar" /><p>${tweet.user.name}</p></div><p>${tweet.user.handle}</p></header><h4>${tweet.content.text}</h4><footer><p class="footer-left">${tweet.created_at}</p><div class="footer-right"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer></article>`
    );

    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  $("#tweet-form").submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $("#tweet-form").serialize(),
      success: () => {
        $("#tweet-form")[0].reset();
        $(".counter").text(140);
      },
    });
  });
});
