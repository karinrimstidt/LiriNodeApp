var Twitter = require("twitter");
var fs = require("fs");

var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request")

var userCommand = process.argv[2];

var userInput = process.argv[3];

var consumerKey=(keys.twitterKeys.consumer_key);
var privateKey=(keys.twitterKeys.consumer_secret);
var accessTokenKey=(keys.twitterKeys.access_token_key);
var privateTokenKey=(keys.twitterKeys.access_token_secret);



if (userCommand===undefined) {
	console.log('Type "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says".')
} else if (userCommand === "my-tweets" ) 
	{
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: privateKey,
  access_token_key: accessTokenKey ,
  access_token_secret: privateTokenKey
});

client.get("statuses/user_timeline", { screen_name: "karinjkarin", count: 10  }, function(error, tweets, response) {

	for (i= 0; i<tweets.length; i++)
	{
		console.log("================");
		console.log(tweets[i].text);
		console.log("================");
	}
});

	}
else if(userCommand === "spotify-this-song")
	{
			if (userInput === undefined)
			{ userInput = "'The Sign' by Ace of Base"};

		spotify.search({ type: "track", query: userInput}, function(err, data) {
    if ( err ) {
        console.log("Error occurred: " + err);
        return;
    }
    
    else{
 	console.log("================");
    console.log( "Artist is " + data.tracks.items[0].artists[0].name);
    console.log("================");
    console.log( "Song is " + data.tracks.items[0].name);
    console.log("================");
    console.log( "Preview is " + data.tracks.items[0].preview_url);
    console.log("================");
    console.log( "Album is " + data.tracks.items[0].album.name);
	}

});

	}
else if (userCommand === "movie-this")
	{

		if (userInput === undefined)
			{userInput = "Mr.Nobody"};

	request("http://www.omdbapi.com/?t=" + userInput, function (error, response, body) {
 	console.log("Title: " + JSON.parse(body).Title);
 	console.log("Year: " + JSON.parse(body).Year);
	console.log("Rating: " + JSON.parse(body).imdbRating);
 	console.log("Country: " + JSON.parse(body).Country);
 	console.log("Language: " + JSON.parse(body).Language);
 	console.log("Plot: " + JSON.parse(body).Plot);
 	console.log("Actors: " + JSON.parse(body).Actors);
 	console.log("Ratings: " + JSON.parse(body).Ratings[1].Source);
  	console.log("Ratings: " + JSON.parse(body).Ratings[1].Value);
  	console.log("Language: " + JSON.parse(body).Language);


 });

// r.alias("tt0068646", function (err, res) {
//     if (!err) {
//         var movie = res || {};
//         console.log(movie);
//     }
// });

  // * Rotten Tomatoes URL. --no longer avail via omdb
}



else if (userCommand === “do-what-it-says”) {
   fs.readFile(“random.txt”, “utf8”, function(error, data) {
       var doWhat = data.split(“,”);
       userCommand = doWhat[0];
       userInput = doWhat[1];
       // console.log(userCommand);
       // console.log(userInput);
       spotify.search({ type: “track”, query: userInput}, function(error, data) {
           if (error) {
               console.log(‘Error occurred: ’ + error);
               return;
           } else {
               console.log(“======== SONG: ” + data.tracks.items[0].name + ” ========“);
               console.log(“Artist: ” + data.tracks.items[0].artists[0].name);
               console.log(“Album: ” + data.tracks.items[0].album.name);
               console.log(“======== PREVIEW LINK ========“);
               console.log(“Preview: ” + data.tracks.items[0].preview_url);
               console.log(“==================“);
           }