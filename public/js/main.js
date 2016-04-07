var container;
var camera, scene, renderer, aspect, sphere, plane, light, geometry, sprite, y, loadingLine1, loadingLine2, push = false, pushCurve = 0.4, sphereCounter = 0 , circle; //y is depending on the campera y position
var sphereVec = [];

var mouseX = 1, mouseY = 1;
var lastX = 0, lastY = 0;
var panelUp = false;

var count = 0;
var windowHalfX = window.innerWidth /2;
var windowHalfY = window.innerHeight /2;

var cameraMove = false, linesTransition = false;

var mouse = new THREE.Vector2(-1, -1), INTERSECTED; //initialised vector2 with -1, -1 because the set values would have been 0, 0 which meant the first sphere would've been intersected even if the mouse would be at a different position
var uniforms, displacement, noise;

var spline, counter = 0;
var lines = [];

var sphereVecLines = [];

var at = '';

var skipping = 0;
var skipNow = false;
var skipped = false;

// Tween
var position = { x : 0, y: -0.3 };
var target = { x : 0, y: 3 };
var push = new TWEEN.Tween(position, { override: true, paused: true }).to(target, 600).easing(TWEEN.Easing.Elastic.In);
var scale = {x:6, y:6, z:6};
var sTarget = {x:1.5, y:1.5, z:1.5};
var resize = new TWEEN.Tween(scale, { override: true, paused: true }).to( sTarget, 1200);
var positionD = { x: -2.48245868306185e-13, y: -3 };
var targetD = { x: 0 , y : -0.5 };
var moveD = new TWEEN.Tween(positionD, { override: true, paused: true }).to( targetD, 700).easing(TWEEN.Easing.Elastic.In );
var scale2 = {x:1.5, y:1.5, z:1.5};
var sTarget2 = {x:15, y:15, z:15};
var explosionTo =  new TWEEN.Tween( scale2, { override: true, paused: true } ).to( sTarget2 , 1000 ).easing( TWEEN.Easing.Elastic.Out );
var scale3 = {x:15, y:15, z:15};
var sTarget3 = {x:1.5, y:1.5, z:1.5};
var explosionBack =  new TWEEN.Tween( scale3, { override: true, paused: true } ).to( sTarget3 , 700 ).easing( TWEEN.Easing.Elastic.In );



push.onUpdate(function(){

 sphere.position.x = position.x;
 sphere.position.y = position.y;

});

resize.onUpdate( function(){

  sphere.scale.x = scale.x;
  sphere.scale.y = scale.y;
  sphere.scale.z = scale.z;

});

moveD.onUpdate( function(){

  sphere.position.x = positionD.x;
  sphere.position.y = positionD.y;

});

explosionTo.onUpdate( function(){

  sphere.scale.x = scale2.x;
  sphere.scale.y = scale2.y;
  sphere.scale.z = scale2.z;

});

explosionBack.onUpdate( function(){

  sphere.scale.x = scale3.x;
  sphere.scale.y = scale3.y;
  sphere.scale.z = scale3.z;

});

var startPos = { x: 0, y: -0.5, z: 0, r: 1, g: 1, b: 1, s: 0.8 };
var targetPos = { x: 4.5, y: -0.5, z: 0, r: 0.898, g: 0.1, b: 0.1, s: 1.1 };
var youMakeItSo =  new TWEEN.Tween( startPos, { override: true, paused: true } ).to( targetPos , 750 ).easing( TWEEN.Easing.Elastic.Out );

youMakeItSo.onUpdate( function() {

  sphere.position.x = startPos.x;
  sphere.position.y = startPos.y;
  sphere.position.z = startPos.z;
  sphere.children[0].material.color = new THREE.Color( startPos.r, startPos.g, startPos.b);
  sphere.children[0].scale.set( startPos.s, startPos.s, startPos.s );
  sphere.material.color = new THREE.Color( startPos.r, startPos.g, startPos.b);

});


var startPos2 = { x: 4.5, y: -0.5, z: 0, r: 0.898, g: 0.1, b: 0.1, s: 1.1 };
var targetPos2 = { x: 0, y: -0.5, z: 0, r: 1, g: 1, b: 1, s: 0.8 };
var youMakeItSoExit =  new TWEEN.Tween( startPos2, { override: true, paused: true } ).to( targetPos2 , 750 ).easing( TWEEN.Easing.Elastic.Out );

youMakeItSoExit.onUpdate( function() {

  sphere.position.x = startPos2.x;
  sphere.position.y = startPos2.y;
  sphere.position.z = startPos2.z;
  sphere.children[0].material.color = new THREE.Color( startPos2.r, startPos2.g, startPos2.b);
  sphere.children[0].scale.set( startPos2.s, startPos2.s, startPos2.s );
  sphere.material.color = new THREE.Color( startPos2.r, startPos2.g, startPos2.b);

});



moveD.onComplete( function(){
  $('#text').text('Thought destroys');
  $('#text').animateCss('rubberBand');
  //setTimeout(function () {
    changeAt( 'explode' );
    createLines();
//  }, 10);
  explosionTo.start();
});

explosionTo.onComplete( function(){

  removeSpheres();


  explosionBack.start();

});

explosionBack.onComplete( function() {


       $('text').animateCss('fadeOutUpBig');
       setTimeout(function () {
         goodOrEvil();
       }, 1000);



});
// end tweens
function goodOrEvil() {


       $('#text').html(' Thought is not');
       $('#text').animateCss('bounceInDown');

       setTimeout(function () {
         $('#text2').html(' Good &nbsp;or&nbsp; Evil');
         $('#text2').animateCss('zoomInDown');

         setTimeout(function () {

           $('#text3').html('YOU');
           $('#text3').animateCss('bounceInLeft');



           setTimeout(function () {

             $('#text4').html('MAKE IT SO');
             $('#text4').animateCss('bounceInLeft');


             setTimeout(function () {

               youMakeItSo.start();




                 var spriteMaterial1 = new THREE.SpriteMaterial(
                   {
                      map: evil,

                       color: 0xffffff, transparent: false
                    });
                  var sprite1 = new THREE.Sprite( spriteMaterial1 );

                  sprite1.scale.set(0.5, 0.5, 0.5);
                  sprite1.position.z = 1.5;
                  sprite1.position.x = -0.35;


                  //sphere = new THREE.Mesh(geo, material);
                  sphere.add(sprite1);


             }, 350);


           }, 100);

         }, 2000);
       }, 550);

}

youMakeItSo.onComplete( function(){



  setTimeout(function () {

    $('#text').animateCss( 'fadeOutLeftBig ');

    setTimeout(function () {
      $('#text2').animateCss( 'fadeOutLeftBig ');

      setTimeout(function () {
        $('#text3').animateCss( 'fadeOutLeftBig ');
        youMakeItSoExit.start();

        setTimeout(function () {
          $('#text4').animateCss( 'fadeOutLeftBig ');

           sphere.remove( sphere.children[1]);
          setTimeout(function () {

              $('#text').html('');
              $('#text2').html('');
              $('#text3').html('');
              $('#text4').html('');



          }, 600);

        }, 100);
      }, 100);
    }, 100);
  }, 3000);

});

youMakeItSoExit.onComplete( function() {
  if( skipped == false )
     brainInit();
});

//init();
//animate();

function init() {



  container = document.createElement( 'div' );
  document.body.appendChild( container );

  //Scene
  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(30, aspect, 1, 10000);
  camera.position.z = 20;
  camera.position.y = 10;
  y = -10;

  //Light
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 0, 1).normalize();
  scene.add( light );

  //SkyDome

  var vertexShader = document.getElementById( 'vertexShader' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
  uniforms = {
    topColor: 	 { type: "c", value: new THREE.Color( 0x1B0D3D ) },
    bottomColor: { type: "c", value: new THREE.Color( 0x000000 ) },
    offset:		 { type: "f", value: 800 },
    exponent:	 { type: "f", value: 0.9 }
  };

  var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  var skyMat = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
  });
  var sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );

  //Renderer
  renderer = new THREE.WebGLRenderer( { antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  start();



  // handlers

  document.addEventListener( 'mousemove', onDocumentMouseMove, false);
  document.addEventListener( 'touchstart', onTouch, false);
  window.addEventListener('resize', onWindowResize, false);
  var lastW=0, lastH=0;

  }

function onWindowResize() {

   windowHalfX = window.innerHeight / 2;
   windowHalfY = window.innerHeight / 2;

   camera.aspect = window.innerWidth / window.innerHeight;
   aspect = camera.aspect;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );



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



        var object = scene.getObjectByName('curve'+lineCount+resizeCounter);
        scene.remove( object );

        curves[lineCount].curve = createCurve( positions, lineColours[ curves[i].hashtag] );
        curves[lineCount].curve.mesh.name  = 'curve'+lineCount+resizeCounter;
        scene.add( curves[lineCount].curve.mesh);


        lineCount++;

    }

 }
 }

}

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;



}

function onTouch(event) {

  mouse.x = (event.targetTouches[0] / window.innerWidth) * 2 - 1;
  mouse.y = -(event.targetTouches[0] / window.innerHeight) * 2 + 1;

}

function skip(){

  $('#skipArea').html("<p id = 'skip'>Skip Intro ></p>");

  $('#skip').on( 'click', function(){

     clear();
     loadTwitter();

     $('#skipArea').animateCss('fadeOutDownBig');

     skipped = true;

  });

  $('#skip').animateCss('fadeInUpBig');




}

function animate() {

   requestAnimationFrame( animate );

   update();
   render();

}


   function update()
   {  //Loading line start animation
     if( loadingLine1.position.x < -0.5 ) {

       loadingLine1.position.x += 0.5;
       loadingLine2.position.x -= 0.5;

     }

     //Smooth Camera Move

     if(mouseX != lastX )
       {
           camera.position.x += (( mouseX / window.innerWidth ) - camera.position.x ) * 0.03;

           if( at == 'twitterIntro' || at == 'linesAnimate' || at == 'circle' || at == 'raycaster')
                circle.position.x += (( mouseX / window.innerWidth ) - camera.position.x ) * 0.03;
           lastX = mouseX;



         //  loadingLine1.position.x += (( mouseX / window.innerWidth ) - camera.position.x ) * 0.05;
         //  loadingLine2.position.x += (( mouseX / window.innerWidth ) - camera.position.x ) * 0.05;

       }

    if(mouseY != lastY )
     {
         camera.position.y += (( -mouseY / window.innerWidth) - camera.position.y - y ) * 0.03 ;
         lastY = mouseY;

         loadingLine1.position.y += (( -mouseY / window.innerWidth) - camera.position.y - y ) * 0.03 ;
         loadingLine2.position.y += (( -mouseY / window.innerWidth) - camera.position.y - y ) * 0.03 ;

         if( at == 'twitterIntro' || at == 'linesAnimate' || at == 'circle' || at == 'raycaster')

            circle.position.y += (( -mouseY / window.innerWidth) - camera.position.y - y) * 0.03;

     }

     camera.updateMatrixWorld();

     switch (at) {

        case 'loading1':
              loadingScreen();

              break;

        case 'loading2':
              loadingScreen2();
              break;

        case 'force':
              if( skipped == false )
               spherePush();
              break;

        case 'createStart':
             if( skipped == false )
              moveSphere();
              break;

        case 'thought creates':
              if( skipped == false )
                thoughtCreates();
              break;

        case 'thought destroys':
                if( skipped == false )
                  thoughtDestroys();
                break;

        case 'explode':
             if( skipped == false )
               explode();
              break;
        //case 'goodOrEvil':

        case 'brainSpheres':
                            if( skipped == false )
                            brainSpheresMove();
                            break;

        case 'brainLines':
                          if( skipped == false )
                          brainDrawLines();
                          break;

        case 'brainZoomOut': if( skipped == false )
                            brainZoomOut();
                            break;

        case 'brainDissapear':
                              if( skipped == false )
                              brainDissapear();
                               break;

        case 'twitter':
                        loadTwitter();


                         break;

        case 'twitterIntro': twitterSpheresIntro();
                            break;

        case 'linesAnimate': twitterLinesIntro();
                            break;

        case 'circle': TWEEN.update();
                       at = 'raycaster';
                       break;

       case 'raycaster': raycasterUpdate();
                         TWEEN.update();
                         break;


     }


   }

   function loadTwitter(){

     at='pause';
     $('#skipArea').remove();
     loadScript("js/webSocket.js", function(){});



   }

  // clear scene for twitter intro

   function clear(){

    at = 'pause';

   $('#text2').remove();
   $('#text3').remove();
   $('#text4').remove();

   $('#text').remove();

  scene.children.splice(2, scene.children.length - 2 );

   }

   function changeAt( name ){

     if( at != 'pause' && at != 'twitterIntro' && at != 'linesAnimate' && at != 'circle' && at != 'raycaster' ){

        at = name;

     }

   }

   function render() {

    renderer.render( scene, camera );

  }
