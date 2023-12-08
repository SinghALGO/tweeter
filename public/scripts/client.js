$(document).ready(() => {
  //Write a new tweet form should be hidden when page is loaded, when user clicks Write a new tweet, then it will show
  $(".new-tweet").hide();

  /**
   *
   * @param {*} object containing tweet
   * @returns html
   */
  const createTweetElement = function (tweet) {
    const $tweet = $(
      `<article><header><div class="header-left"><img src="${
        tweet.user.avatars
      }" alt="user-avatar" /><p>${tweet.user.name}</p></div><p>${
        tweet.user.handle
      }</p></header><h4>${escape(
        tweet.content.text
      )}</h4><footer><p class="footer-left">${timeago.format(
        tweet.created_at
      )}</p><div class="footer-right"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer></article>`
    );

    return $tweet;
  };
  /**
   *
   * @param {*} Array of tweets obejcts
   * Calls createTweetElement for each array index and prepends it to tweets-container element
   */
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  //Function to prevent cross client scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //Event listener for form submission
  $("#tweet-form").submit((event) => {
    event.preventDefault();
    $(".error-container").hide();
    $(".error-container").removeClass("error-container-flex");
    //Check if tweet is null or empty
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(".error-container").slideDown("slow");
      $(".error-container").addClass("error-container-flex");
      $(".error-container").children("p").text("Tweet is empty");
    }
    //Check if tweet length is greater than 140
    else if ($("#tweet-text").val().length > 140) {
      $(".error-container").slideDown("slow");
      $(".error-container").addClass("error-container-flex");
      $(".error-container").children("p").text("Tweet length is more than 140");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#tweet-form").serialize(),
        success: () => {
          $("#tweet-form")[0].reset();
          $(".counter").text(140);
          loadtweets();
        },
      });
    }
  });
  /**
   * Function to get data from the server
   */
  const loadtweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function (response) {
        renderTweets(response);
      },
    });
  };
  loadtweets();

  //Event listener for clicking "Write a new tweet" nav item
  $(".right-text").click(() => {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow");
    } else {
      $("#tweet-form")[0].reset();
      $(".counter").text(140);
      $(".error-container").removeClass("error-container-flex");
      $(".error-container").hide();
      $(".new-tweet").slideUp();
    }
  });
  //Event listener for scrolling the winow
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("nav").addClass("nav-transparent");
      $(".right-text").hide();
      $("#button-scroll").addClass("button-scroll-flex");
      $("#button-scroll").fadeIn();
    } else {
      $(".right-text").slideDown();
      $("nav").removeClass("nav-transparent");
      $("#button-scroll").removeClass("button-scroll-flex");
      $("#button-scroll").fadeOut();
    }
  });
  //Event listener for clicking the button that will scroll to the top
  $("#button-scroll").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    $(".new-tweet").slideDown("slow");
    return false;
  });
});
