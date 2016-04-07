var glow, evil;

function start(){

 //Text

  $('#intro').animateCss('bounceInDown');
  $('#start').animateCss('zoomIn');

  //load textures

  evil  = new THREE.TextureLoader().load( '../images/evil.png' );
  glow = new THREE.TextureLoader().load( '../images/nebula4.jpg' );

  // stars init

  sphereInit( 0.01, 3, 0.15, 0, 10, 0 );
  generateSpheres( 50 );

  //loading Lines

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
   new THREE.Vector3( -13, 7.2, 0 ),
   new THREE.Vector3( -1, 7.2, 0 )
  );

  loadingLine1 = new THREE.Line( geometry, material );

  geometry = new THREE.Geometry();
  geometry.vertices.push(
   new THREE.Vector3( 13, 7.2, 0 ),
   new THREE.Vector3( 1, 7.2, 0 )

  );

  loadingLine2 = new THREE.Line( geometry, material );

   scene.add( loadingLine2 );
   scene.add( loadingLine1 );

   loadingLine1.position.x = -13;
   loadingLine2.position.x = 13;

   //On click -> start loading screen

  $('#start p').on('click', function() {

    $('#intro').animateCss('bounceOutUp');
   changeAt( 'loading1', at );




  //  skip();

    //loading1.start();
    //moveLines.start();

    $('#start').css({"-webkit-animation-duration": "0"});
    $('#start').animateCss('zoomOut');
    setTimeout( sphereInit(0.2, 32, 0.8, 0, -2.7, 0), 300);

  });


  $('#text').text('');


}
