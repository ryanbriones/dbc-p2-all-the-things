$(function() {
  // via http://stackoverflow.com/a/5052661
  (function periodicTimer() {
    var url = "/searches/" + searchId + ".json";
    var data = {
      since: lastUpdated
    }

    $.get(url, data, function(response) {
      if(response.stop) {
        window.location.href = "/searches/" + searchId;
      } else {
        lastUpdated = response.timestamp;

        for(var i = 0; i < response.tweets.length; i++) {
          var newTweet = response.tweets[i].tweet;
          var newTweetHTML = $("#tweet_template .tweet").clone();
          newTweetHTML.hide();
          newTweetHTML.find(".screen_name").html(newTweet.screen_name);
          newTweetHTML.find(".text").html(newTweet.text);
          newTweetHTML.find(".tweeted_at").html(newTweet.tweeted_at);

          $('#tweets').prepend(newTweetHTML);
          newTweetHTML.delay(500 * i).fadeIn(1000);
        }
   
        setTimeout(periodicTimer, 5000);
      }
    });
  })();
})