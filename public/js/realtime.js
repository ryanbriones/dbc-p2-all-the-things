// tweet collection

function Collection(responseTweets) {
  this.tweets = responseTweets;
}

Collection.prototype.makeTweets = function() {
  for(var i = 0; i < (this.tweets).length; i++) {
    var t = (this.tweets)[i]
    var tweetObj = new Tweet(
                             t.screen_name,
                             t.text,
                             t.tweeted_at
                            );
    tweetObj.pack();
    tweetObj.display(i);
  }
}

// tweet

function Tweet(screenName, text, tweetedAt) {
  this.screenName = screenName;
  this.text       = text;
  this.tweetedAt  = tweetedAt;
}

Tweet.prototype.pack = function() {
  this.locale = $( "#tweet_template .tweet" ).clone();
  (this.locale).find( ".screen_name" ).html( this.screenName );
  (this.locale).find( ".text" ).html( this.text );
  (this.locale).find( ".tweet_at" ).html( this.tweeted_at );
}

Tweet.prototype.display = function(delayFactor) {
  $( "#tweets" ).prepend( this.locale );
  (this.locale).delay(100 * delayFactor).fadeIn(2000);
}

// driver

function getTweets() {
  var url  = "/searches/" + searchId + ".json";
  var data = { since: lastUpdated }

  $.get(url, data, function(response) {
    console.log("$.get called");
    console.log(response);

    if(response.stop) {
      window.location.href = "/searches/" + searchId;
    } else {
      lastUpdated = response.timestamp;
      var raw_tweets = []

      for (i = 0; i < response.tweets.length; i++) {
        raw_tweets.push(response.tweets[i].tweet);
      }

      collection = new Collection(raw_tweets);
      collection.makeTweets();
      setTimeout(getTweets, 7000);
    }
  });
}

$(document).ready(function() {
  getTweets();
});
