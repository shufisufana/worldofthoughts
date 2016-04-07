/*---------------------------------------------------
    Socket connection
-----------------------------------------------------*/

var socket = io();
var tweets = [];
//var tweet = [];
var hashtag;
var hashtags = { angry: 0,  anxious: 0, calm: 0,  excited: 0, happy: 0, sad: 0  }; //alphabetically ordered

var connected = false;

 socket.on('tweets', function(data){
  //for( var i = 0; i < 10; i++ ){
   //console.log( data );
  //  tweet[i] = data.statuses[i].text;
  if (connected == false ){

      addData(data);
      connected = true;

  }



  });

  //return tweet;
//  $('#tweet').text( tweet[0] );
 $('#text').animateCss('bounceInDown');

function addData( data ){

  for( var i = 0; i < data.statuses.length; i++ ){

    //tweet[i] = data.statuses[i].text;

    for( var j = 0; j < data.statuses[i].entities.hashtags.length; j++ )
     {
          switch(data.statuses[i].entities.hashtags[j].text.toString().toLowerCase()) {

            case 'happy': hashtag = 'happy';
                          hashtags.happy ++;
                          break;

            case 'excited': hashtag = 'excited';
                            hashtags.excited++;
                          break;

            case 'sad': hashtag = 'sad';
                        hashtags.sad++;
                          break;

            case 'angry': hashtag = 'angry';
                          hashtags.angry++;
                          break;

            case 'anxious': hashtag = 'anxious';
                            hashtags.anxious++;
                          break;

            case 'calm': hashtag = 'calm';
                         hashtags.calm++;
                          break;

          }

     }
      // console.log(hashtags[i]);
      tweets[i] = { text: data.statuses[i].text, hashtag: hashtag  };
  }

  //$('#tweet').text( tweet[0] );
  //init();
  //sort tweets in dependant on their hashtags

  //console.log( hashtags );
  tweets.sort( compare );
  //console.log( tweets );
  loadScript("js/tweets.js", function(){ initT();});



}

function compare ( a, b ) {

  if( a.hashtag < b.hashtag )
    return -1;
  else if( a.hashtag > b.hashtag )
          return 1;
    else
          return 0;
}
