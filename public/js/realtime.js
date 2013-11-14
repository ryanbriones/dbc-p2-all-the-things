$(function() {
  function Tweet(screenName, text, tweetedAt) {
    this.screenName = "@" + screenName;
    this.text = text;
    this.tweetedAt = tweetedAt;
  }

  Tweet.prototype.pack = function() {
    console.log("packing tweet...");
    this.locale = $( "#tweet_template .tweet" ).clone();
    this.locale.find( ".screen_name" ).html( this.screenName );
    this.locale.find( ".text" ).html( this.text );
    this.locale.find( ".tweet_at" ).html( this.tweeted_at );
  }

  Tweet.prototype.display = function(delayFactor) {
    console.log("displaying tweet");
    $( "#tweets" ).prepend( this.locale );
    this.locale.delay(100 * delayFactor).fadeIn(2000);
  }

  function getTweets() {
    console.log("getTweets called");
    var url = "/searches/" + searchId + ".json";
    var data = { since: lastUpdated }

    $.get(url, data, function(response) {
      console.log("$.get called");
      console.log(response);

      if(response.stop) {
        window.location.href = "/searches/" + searchId;
      } else {
        lastUpdated = response.timestamp;

        for(var i = 0; i < response.tweets.length; i++) {

          var t = response.tweets[i].tweet

          var tweetObj = new Tweet(
                            t.screen_name,
                            t.text,
                            t.tweeted_at
                           );

          console.log(tweetObj);

          tweetObj.pack(i);
          tweetObj.display();
        }
      }
    });
  }

  setInterval(getTweets, 15000);
});

// // via http://stackoverflow.com/a/5052661
//   (function periodicTimer() {
//     var url = "/searches/" + searchId + ".json";
//     var data = {
//       since: lastUpdated
//     }
//
//     $.get(url, data, function(response) {
//       if(response.stop) {
//         window.location.href = "/searches/" + searchId;
//       } else {
//         lastUpdated = response.timestamp;
//
//         for(var i = 0; i < response.tweets.length; i++) {
//           var newTweet = response.tweets[i].tweet;
//           var newTweetHTML = $("#tweet_template .tweet").clone();
//           newTweetHTML.hide();
//           newTweetHTML.find(".screen_name").html(newTweet.screen_name);
//           newTweetHTML.find(".text").html(newTweet.text);
//           newTweetHTML.find(".tweeted_at").html(newTweet.tweeted_at);
//
//           $('#tweets').prepend(newTweetHTML);
//           newTweetHTML.delay(100 * i).fadeIn(500);
//         }
//
//         setTimeout(periodicTimer, 5000);
//       }
//     });
//   })();

