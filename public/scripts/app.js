//creates a function that returns tweets from users in a database
$(function() {
    function createTweetElement(obj) {
      var tweets = `<article class="tweet">
                  <header>
                      <img class="avatar" src="${escape(obj.user.avatars.regular)}">
                      <span class="name">${escape(obj.user.name)}</span>
                      <span class="handle">${escape(obj.user.handle)}</span>
                  </header>
                  <p>
                  ${escape(obj.content.text)}
                  </p>
                  <footer>
                  <span class="time">${escape(moment(obj.created_at).fromNow())}</span>
                  <i class="fa fa-flag-o" aria-hidden = "true"></i>          
                  <i class="fa fa-retweet" aria-hidden = "true"></i>
                  <i class="fa fa-heart-o" aria-hidden = "true"></i>          
                  </footer>
          </article>`;

      return tweets;
    }
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
        }


    function renderTweets(tweetData){
        tweetData.forEach(function(obj){
            $("#all-tweets").prepend(createTweetElement(obj));
        });
    }
    function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
      }).done(renderTweets);
    }
  
//does not let user post if the text field is empty or exceeds char count
    $('.tweetform').on('submit', function(event){
      event.preventDefault();

      var tweet = $(this).find('[name=text]').val();
      if(tweet == '') {
        alert("Text field is blank. Write something!");
        return false;
      }

      if(tweet.length > 140) {
        alert("Slow down there! Exceeded maximum amount of characters.");
        return false;
      }

      $.ajax({
        url: 'tweets',
        method: 'POST',
        data: $(this).serialize()
      }).done(function(){
        loadTweets();
        $('.new-tweet textarea').val("");
        $('.new-tweet textarea').focus();
        $('sectiion.new-tweet').slideToggle("slow");
      })
    });

     loadTweets(); 
});