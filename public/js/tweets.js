//Javascript will go here
//var container;
//var camera, scene, renderer, aspect, cube1, cube2, sphere, plane, light, curve2, geometry, group, sprite;
//var sphereVec = [];

//var mouseX = 0, mouseY = 0;
//var lastX = 0, lastY = 0;
//var mPosX = 0, mPosY = 0;
//var panelUp = false;

var raycaster;
var mouse = new THREE.Vector2(-1, -1), INTERSECTED; //initialised vector2 with -1, -1 because the set values would have been 0, 0 which meant the first sphere would've been intersected even if the mouse would be at a different position
var intersected = false, obj;

//var count = 0;
//var windowHalfX = window.innerWidth /2;
//var windowHalfY = window.innerHeight /2;


//var uniforms, displacement, noise;

var min, max, increment;
var lines = [];
var curves = [];
var lineDots = [];

var lineColours = {  angry: 0xb72323,  anxious: 0xE65B22, calm: 0x55E6AD ,  excited: 0xE640B9, happy: 0xE6C735 , sad: 0x222E78 };
var hashtagColours  = { angry: '#b72323',  anxious: '#E65B22', calm: '#55E6AD' ,  excited: '#E640B9', happy: '#E6C735' , sad: '#222E78'};
var sphereVecLines = [];
var counters = [{ counter: 0, increment: 0.1 }];

//var at;




// TWEENS

var scaleCircle = {x:0.01, y:0.01, z:0.01};
var targetCircle = { x:1, y:1, z:1 };
var circleLarge =  new TWEEN.Tween( scaleCircle ).to( targetCircle , 500 ).easing( TWEEN.Easing.Back.Out );

circleLarge.onUpdate( function(){

  circle.scale.x = scaleCircle.x;
  circle.scale.y = scaleCircle.y;
  circle.scale.z = scaleCircle.z;

});

circleLarge.onComplete( function(){

  at = 'raycaster';
});

function initT() {

  camera.position.set( 0, 0, 20 );

  $('text').remove();
  //var text = document.createElement( 'div' );
  //text.id = 'text';
  //document.body.appendChild( text );
  $( '#textTwitter').html( 'But everyone has their own Thought World ');
  $( '#textTwitter' ).animateCss('fadeIn');




sphereVec = [];

// Sphere

var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var geo = new THREE.SphereGeometry( 0.2, 16, 16);

var spriteMaterial = new THREE.SpriteMaterial(
{
 map: new THREE.TextureLoader().load( 'images/nebula4.jpg' ),

  color: 0xffffff, transparent: false, blending: THREE.AdditiveBlending
});
sprite = new THREE.Sprite( spriteMaterial );

//sprite.scale.set(0.8, 0.8, 4.0);


var sphere = new THREE.Mesh(geo, material);
sphere.add(sprite);

var count = 0;

for ( var hashtag in hashtags ){

  if( hashtags[hashtag] > 0 )
   {
     var lineDot = determineLineDots( hashtags[hashtag] , hashtag )

     lineDots.push(  lineDot );

     for( var i = 0; i < lineDot.lines; i++ ){

          increment = 10 / lineDot.dots[i] * aspect;
          min = -5 * aspect - 0.5;
          max = min + increment;
          var positions = [];
          var yLast = 0;


         for ( var j = 0; j < lineDot.dots[i]; j++ ){

              var x = randXgenerator( min, max );
              var y = randYgenerator( x, yLast );

              var xy = checkPosition( x, y, min, max, yLast );
              //console.log( xy );

              var vec3 = new THREE.Vector3( xy.x, xy.y, 0 );
             sphere.position.set( vec3.x, vec3.y, vec3.z );

             positions.push( vec3 );  // add sphere position to line
             sphereVec.push( sphere.clone() );  // add sphere

             yLast = y;
             min += increment;
             max += increment;

         }

         if( positions.length == 1 ){

           // add first out of screen position


           var x = positions[0].x + 10 * checkSign( positions[0].x );
           var y = positions[0].y + 10 * checkSign( positions[0].y );


           positions.unshift( new THREE.Vector3( x, y, 0 ));



           // add last out of screen position

           var x = positions[ positions.length - 1].x + 15 * checkSign( positions[ positions.length - 1 ].x )  * randGenerator( 1, 2 ) ;
           var y = positions[ positions.length - 1 ].y + 20 * checkSign( positions[ positions.length -1 ].y ) * -1 * randGenerator( 1, 2 );

           positions.push( new THREE.Vector3( x, y, 0 ));

         }

         else {

           // add first out of screen position


           var x = positions[0].x + 10 * checkSign( positions[0].x );
           var y = positions[0].y + 10 * checkSign( positions[0].y );


           positions.unshift( new THREE.Vector3( x, y, 0 ));



           // add last out of screen position

           var x = positions[ positions.length - 1].x + 10 * checkSign( positions[ positions.length - 1 ].x );
           var y = positions[ positions.length - 1 ].y + 10 * checkSign( positions[ positions.length -1 ].y );

           positions.push( new THREE.Vector3( x, y, 0 ));

         }

        //console.log( positions );
         //lines.push( { positions: positions, hashtag: hashtag });

         var curveH = new THREE.CatmullRomCurve3( positions );
         curveH.type = 'chordal';
         //curveH.tension = 0.5;
         geometry = new THREE.Geometry();
         var material = new THREE.LineBasicMaterial( { color: lineColours[ hashtag ]});
        // geometry.vertices = curveH.getPoints( 300 );
        //console.log(positions[0]);
        var position1 = curveH.getPoint( 0 );
        var position2 = curveH.getPoint( 0.00001 );
        var x1 = position1.x;
        var  x2 = position2.x;
        var y1 = position1.y;
        var y2 = position2.y;
         var points = new Array( new THREE.Vector3( x1,y1, 0),
                       new THREE.Vector3( x2, y2, 0) );

      //  var whatever = new Array( new THREE.Vector3( 0.0019, 0.345, 0 ), new THREE.Vector3( 0.002, 0.344, 0 ));



         curveH.mesh = new THREE.Line( geometry, material );
         lines[ lines.length ] = points;

         curves.push( {path: curveH, curve: createCurve( points , lineColours[ hashtag ]), hashtag: hashtag } );


     }

  }

 count++;

}


// add curves to the scene
for( var i = 0; i < curves.length; i++ ) {
   curves[i].curve.mesh.name = 'curve'+i;
   scene.add( curves[i].curve.mesh );

}

// circle for tweets

var geometry = new THREE.CircleGeometry( 2.1 , 32 );
var material  =  new THREE.MeshBasicMaterial( { color: 0x090911 });
circle = new THREE.Mesh( geometry, material );
//circle.position.x = camera.position.x;
//circle.position.y = camera.position.y;
circle.position.z = 1;
//scene.add( circle );
circle.scale.set( 0.01, 0.01, 0.01 );
raycaster = new THREE.Raycaster();


// handlers

//document.addEventListener( 'mousemove', onDocumentMouseMove, false);
//window.addEventListener('resize', onWindowResize, false);
//var lastW=0, lastH=0;

createAnimationLines( sphereVec );


}

// determine the number of lines needed for one emotion
// max points on a line = 7
// ideal number is 5

function determineLineDots ( number, hashtag )
{
  var lineDots = { lines: 0, dots: [], hashtag: hashtag };   // number of lines / number of dots on each line  / hashtag


    if( number <= 7 ){
       lineDots.lines = 1;
        lineDots.dots[0] = number; // holds the number of lines and number of dots for each line

       return lineDots;
    }


     else {

            lineDots.lines = Math.floor( number / 5 );

            if( number % 5 >= 3 ) {// if modulus is larger or equal to 3 we will create another 3 dotted line{

               lineDots.lines ++;
               lineDots.dots[0] = number % 5;

               for( var i = 1; i < lineDots.lines ; i++ ){

                 lineDots.dots[i]  = 5;

               }
                  return lineDots;
            }

           else if( number % 5 < 3 ){

               lineDots.dots[0] = 5 + number % 5;

               for( var i = 1; i < lineDots.lines; i++ ) {

               	 lineDots.dots[i] = 5;

               }

               return lineDots;
           }
           else {

           				for( var i = 0; i < lineDots.lines; i++) {

                  		lineDots.dots[i] = 5;

                  }
                  return lineDots;
           }

     }

}

function checkPosition( x , y , min, max, yLast ) {

  var xy = { x: x, y: y };
  if( sphereVec.length >  1 ) {

        for( var i = 0; i < sphereVec.length; i++ ){
          //console.log( sphereVec[i]);
          if( Math.abs( sphereVec[i].position.x - x ) < 0.5 && Math.abs( sphereVec[i].position.y - y ) < 0.5 ) {

              x = randXgenerator( min, max );
              y = randYgenerator( x, yLast );

              return checkPosition( x, y, min, max, yLast );
          }

        }

       return xy;

     }

  else return xy;

}

// generates a float number between min and max
function randGenerator( min, max )
{

  var number = Math.random() * ( max - min + 1 ) + min;

  return number;

}

function randXgenerator( min, max ) {

  return randGenerator( min, max );


}

function randYgenerator ( x, yLast ) {

  var y;

  if( yLast == 0 ) {
   if ( x >= -2.3 && x <= 2.3 )
     {
        return randGenerator( 2.3, 2.8 ) * checkSign( randGenerator( -1, 1 ) );


     }

    else return randGenerator( -4.5, 3 );

  } else {

      if ( x >= -2.3 && x <= 2.3 )
        {

          return  randGenerator( 2.3, 2.8 ) * checkSign( yLast );

       }

     else return randGenerator( Math.min( yLast - 2, -4.5 ) , Math.min( yLast + 2, 3 ));


  }

}


function checkSign ( number ) {

   if( number < 0 ) {

     return -1;
   }
    else if( number > 0 ) {

            return 1;

    }

       else return 0;

}



function createCurve( curvePositions, colour )
{

    var curve = new THREE.CatmullRomCurve3( curvePositions );

    curve.closed = false;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: colour });
    geometry.vertices = curve.getPoints( 2000 );
    curve.mesh = new THREE.Line( geometry, material );

    return curve;

}

//
function createAnimationLines( sphereVec ){

      for ( var i = 0; i< sphereVec.length; i++ )
          {
            sphereVecLines[i] = new THREE.CatmullRomCurve3([

                new THREE.Vector3( 0, 0, 0 ),
                new THREE.Vector3( sphereVec[i].position.x, sphereVec[i].position.y , 0 )

             ]);

           sphereVec[i].position.set( 0, 0 , 0 );


          }

    scene.add( sphereVec[0]);
    setTimeout(function () {

      addSpheres( 1 );
      at = 'twitterIntro';


    }, 1500);

    counter = 0;

}

//animate spheres


function twitterSpheresIntro() {

  if( counter <= 1.01 ){

  for( var i = 0; i < sphereVecLines.length; i++ ){



      var position = sphereVecLines[i].getPoint( counter );
      //console.log( sphereVecLines[i]);
      sphereVec[i].position.set( position.x, position.y, position.z );


  }
  }
  else {
         counter = 0.00002;
        at = 'linesAnimate';
         setTimeout(function () {
            $('#textTwitter').animateCss('fadeOutUpBig');
         }, 500);

      }


 counter += 0.025;


}

function moveTwitterSphere( spherePlace, increment ){

  if ( counter <= 1 ){

    var position = sphereVecLines[spherePlace].getPoint( counter );
    sphereVec[spherePlace].position.set( position.x, position.y, position.z );


  } else if( spherePlace + 1 == 4 ){

                 addSpheres( 4 );
                 counter = 0;
                 return 4;

               }

          else {
                  scene.add( sphereVec[ spherePlace + 1 ]);
                  counter = 0;

                  return spherePlace + 1;

           }

   counter += increment;
   return spherePlace;
}

function addSpheres( x ){

    for( var i = x; i < sphereVecLines.length; i++ ){

       scene.add( sphereVec[i]);

    }
}

var lastCounter = 0;
var resizeCounter = 0;

function twitterLinesIntro() {
    if( counter <= 1.006){

       for( var i = 0; i < curves.length; i++ ){

         var position =  curves[i].path.getPoint( counter );
         lines[i].push( new THREE.Vector3( position.x, position.y, 0) );
         curves[i].curve = createCurve( lines[i], lineColours[ curves[i].hashtag] );
         curves[i].curve.mesh.name = 'curve'+i+counter;

         scene.add( curves[i].curve.mesh);

         if ( counter == 0.02002 ){
           var object = scene.getObjectByName('curve'+i);
           scene.remove( object );

         }
           else {
                  var object = scene.getObjectByName('curve'+i+lastCounter);
                  scene.remove( object );
                }
       }

    } else {

         resizeCounter = lastCounter;
         scene.add( circle );
         circleLarge.start();
         $('#textTwitter').text('What is the world thinking now?');
         $('#textTwitter').animateCss('bounceInDown');

         setTimeout(function () {
           $('#instructions').animateCss('fadeIn');
           $('#instructions').css('display', 'block');
           $('.at4-share-outer-right').animateCss('slideInRight');
            $('.at4-share-outer-right').css('display', 'block');

          $('#aboutImg').animateCss('slideInRight');
          $('#aboutImg').css('display', 'block');

         }, 2000);

         at = 'raycaster';
    }

   lastCounter = counter;
   counter += 0.0075;
}


function onWindowResize() {

   windowHalfX = window.innerHeight / 2;
   windowHalfY = window.innerHeight / 2;

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  // plane.scale.x = camera.aspect;
  if( at == 'raycaster'){
   var positions = [];
   var lineCount = 0;
   var sphereCount = 0;

  for( var i = 0; i < lineDots.length; i++ ) {
   for( var j = 0; j < lineDots[i].lines; j++ ){

        increment = 10 / lineDots[i].dots[j] * camera.aspect;
        min = -5 * camera.aspect - 0.5;
        max = min + increment;
        var positions = [];
        var yLast = 0;


       for ( var k = 0; k < lineDots[i].dots[j]; k++ ){

            var x = randXgenerator( min, max );
            var y = sphereVec[ sphereCount ].position.y; //using the same y if it checks out

            var xy = checkPosition( x, y, min, max, yLast );

           sphereVec[ sphereCount ].position.set( xy.x, xy.y, 0 );
           positions.push( sphereVec[ sphereCount ].position );
           yLast = y;
           min += increment;
           max += increment;

           sphereCount++;

       }

       if( positions.length == 1 ){

         // add first out of screen position


         var x = positions[0].x + 10 * checkSign( positions[0].x );
         var y = positions[0].y + 10 * checkSign( positions[0].y );


         positions.unshift( new THREE.Vector3( x, y, 0 ));

         // add last out of screen position

         var x = positions[ positions.length - 1].x + 15 * checkSign( positions[ positions.length - 1 ].x )  * randGenerator( 1, 2 ) ;
         var y = positions[ positions.length - 1 ].y + 20 * checkSign( positions[ positions.length -1 ].y ) * -1 * randGenerator( 1, 2 );

         positions.push( new THREE.Vector3( x, y, 0 ));

       }

       else {

         // add first out of screen position

         var x = positions[0].x + 10 * checkSign( positions[0].x );
         var y = positions[0].y + 10 * checkSign( positions[0].y );


         positions.unshift( new THREE.Vector3( x, y, 0 ));

         // add last out of screen position

         var x = positions[ positions.length - 1].x + 10 * checkSign( positions[ positions.length - 1 ].x );
         var y = positions[ positions.length - 1 ].y + 10 * checkSign( positions[ positions.length -1 ].y );

         positions.push( new THREE.Vector3( x, y, 0 ));

       }


      //console.log( counter);

       var object = scene.getObjectByName('curve'+lineCount+resizeCounter);
       scene.remove( object );

       curves[lineCount].curve = createCurve( positions, lineColours[ curves[i].hashtag] );
       curves[lineCount].curve.mesh.name  = 'curve'+lineCount+resizeCounter;
       scene.add( curves[lineCount].curve.mesh);
       //console.log( scene );

       lineCount++;

   }

}
}
}

$('#aboutImg').on('click', function(){

  $('#aboutImg').hide();
  $('#about').css('display', 'block');
  $('#about').animateCss('flipInX');
  at = 'pause';

});

$('#close').on('click', function(){

  $('#about').animateCss('flipOutX');
  at = 'raycaster';
   setTimeout(function () {
       $('#about').css('display', 'none');
       $('#close').hide();
       $('#aboutImg').animateCss('slideInRight');
       $('#aboutImg').css('display', 'block');


   }, 700);

});


 function raycasterUpdate() {



   //Raycaster
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( sphereVec );
  if( intersects.length > 0 ){

        console.log( tweets );
        console.log( sphereVec );
       INTERSECTED = intersects[0].object;

        $('#tweet').html( tweets[sphereVec.indexOf(INTERSECTED)].text );
        $('#hashtag').html( '#'+tweets[sphereVec.indexOf(INTERSECTED)].hashtag);
        $('#hashtag').css( 'color', hashtagColours[ tweets[sphereVec.indexOf(INTERSECTED)].hashtag ] );

        $('#instructions').animateCss('fadeOut');
        setTimeout(function () {
          $('#instructions').remove();
        }, 1001);

       if( INTERSECTED.scale.x < 1.5 )
       {

            INTERSECTED.scale.x += 0.05;
            INTERSECTED.scale.y += 0.05;
            INTERSECTED.scale.z += 0.05;

            intersected = true;

       }

   //  }
    } else if( INTERSECTED ) {

              $('#tweet').html('');
              $('#hashtag').html('');

             if( INTERSECTED.scale.x > 0.6 )
             {

               INTERSECTED.scale.x -= 0.25;
               INTERSECTED.scale.y -= 0.25;
               INTERSECTED.scale.z -= 0.25;

             }

              else  INTERSECTED = null;
     }

 }
