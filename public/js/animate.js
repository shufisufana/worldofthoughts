/*------------------------------------------
  Animate CSS function
--------------------------------------------*/

$.fn.extend({
 animateCss: function (animationName) {
     var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
     $(this).addClass('animated ' + animationName).one(animationEnd, function() {
       if( animationName != 'bounceOutUp' && animationName != 'zoomOut'  && animationName != 'fadeOutUpBig' && animationName != 'fadeOutDownBig')
         { $(this).removeClass('animated ' + animationName); }
        else if ( animationName == 'zoomOut' || animationName == 'bounceOutUp' || animationName == 'fadeOutDownBig'){

              //   $(this).removeClass('animated ' + animationName);
                 $(this).remove();
                 skipping = false;
        }
        else if ( animationName == 'fadeOutUpBig')
           {
                 $(this).text('');
                 $(this).removeClass('animated ' + animationName);
           }

        //else if( animationName == 'fadeOutDownBig' )
     });
 }
});

//on document ready
