$(function() {
  // via http://stackoverflow.com/a/5052661
  (function periodicTimer() {
    console.log("timer called");
    var url = "/searches/" + searchId + ".json";
    var data = {
      since: lastUpdated
    }

    $.get(url, data, function(response) {
      lastUpdated = response.timestamp;

      for(var i = 0; i < response.tweets.length; i++) {
        var newTweet = response.tweets[i].tweet;
        var newTweetHTML = $(".tweet").first().clone();
        newTweetHTML.hide();
        newTweetHTML.find(".screen_name").html(newTweet.screen_name);
        newTweetHTML.find(".text").html(newTweet.text);
        newTweetHTML.find(".tweeted_at").html(newTweet.tweeted_at);

        $('#tweets').prepend(newTweetHTML);
        newTweetHTML.delay(500 * i).fadeIn(1000);
      }
   
      setTimeout(periodicTimer, 5000);
    });
  })();
})