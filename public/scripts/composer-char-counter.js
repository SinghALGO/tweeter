$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    $(this)
      .siblings("div")
      .children("output")
      .text(140 - $(this).val().length);
    if (140 - $(this).val().length < 0) {
      $("output").addClass("counter-red");
    } else {
      $("output").removeClass("counter-red");
    }
  });
});
