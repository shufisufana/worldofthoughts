
  var brain, brainBox;

  var brainCurves = [];
  var brainPositions = { pos1: [], pos2: [], pos3: [] };

function brainInit(){


  sphereVec.length = 0;

  //load brain object



  var loader = new THREE.ObjectLoader();

  var brainObject = loader.parse(brainJSON);

   brain  = brainObject.children[0].children[0];

  brain.name  = 'brain';

  brain.material  = new THREE.MeshNormalMaterial( { wireframe: true });
  brain.geometry.scale( 9, 9, 9 );

  brain.geometry.rotateX( -90 * ( Math.PI / 180));

  brain.geometry.translate( 0, 0, 0 );

  brain.geometry.verticesNeedUpdate = true;
  brain.matrixWorldNeedsUpdate = true;



  var geometry = new THREE.BoxGeometry( 0.0001, 0.0001 ,0.0001 );
  //var material = new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  brainBox = new THREE.Mesh( geometry );


  //glow = new THREE.TextureLoader().load( '../images/nebula4.jpg' );
  for( var i = 0; i < brain.geometry.vertices.length; i ++  ){
     sphereInitBrain( 0.2, 16, 1.5, brain.geometry.vertices[i].x + Math.random()*2 - 1 , brain.geometry.vertices[i].y + Math.random()*2 - 1 , brain.geometry.vertices[i].z + Math.random()*2 - 1 );

  }


 brainLinesInit();

 scene.add( brainBox );


  createAnimationLines( sphereVec );

}

function createAnimationLines( sphereVec ){

      for ( var i = 0; i< sphereVec.length; i++ )
          {
            sphereVecLines[i] = new THREE.CatmullRomCurve3([

                new THREE.Vector3( 0, -0.5, 0 ),
                new THREE.Vector3( sphereVec[i].position.x, sphereVec[i].position.y , sphereVec[i].position.z )

             ]);

           sphereVec[i].position.set( 0, -0.5, 0 );


          }



     setTimeout(function () {
       $( '#text ').html( 'Your thought expands into a multitude of thoughts in no time ');
       $( '#text' ).animateCss('bounceInDown');

       setTimeout(function () {

         brainBox.add( sphereVec[0]);
         addSpheres( 1 );
         counter = 0;

         changeAt('brainSpheres') ;

         scene.children.splice( 2, 1 );
         scene.children.splice( 2, 1 );

          setTimeout(function () {



            $( '#text' ).animateCss('fadeOutUpBig');


                 setTimeout(function () {

                   $( '#text ').html( 'Creating your own Thought World ');
                   $( '#text' ).animateCss('bounceInDown');
                    setTimeout(function () {

                      $('#text').animateCss('fadeOutUpBig');

                    }, 3000);

                    changeAt('brainZoomOut');

                 }, 3000);



          }, 2000);

       }, 500);

       counter = 0;


     }, 500);




}

function addSpheres( x ){

    for( var i = x; i < sphereVecLines.length; i++ ){

       brainBox.add( sphereVec[i]);

    }
}

function brainSpheresMove() {

  if( counter <= 1.01 ){

  for( var i = 0; i < sphereVecLines.length; i++ ){



      var position = sphereVecLines[i].getPoint( counter );

      sphereVec[i].position.set( position.x, position.y, position.z );


  }
  }
  else {
         counter = 0.00002;



        changeAt('brainLines') ;
      }


 counter += 0.05;

}

function brainLinesInit() {

for( var i = 0; i < brain.geometry.faces.length; i ++ ){

         if( i % 3 == 0 ){

           if( i < 250 ){

             brainPositions.pos1.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].a].position.x, sphereVec[ brain.geometry.faces[i].a].position.y, sphereVec[ brain.geometry.faces[i].a].position.z ));
             brainPositions.pos1.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].b].position.x, sphereVec[ brain.geometry.faces[i].b].position.y, sphereVec[ brain.geometry.faces[i].b].position.z  ));
             brainPositions.pos1.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].c].position.x, sphereVec[ brain.geometry.faces[i].c].position.y, sphereVec[ brain.geometry.faces[i].c].position.z  ));

           } else if( i > 500 ){

             brainPositions.pos3.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].a].position.x, sphereVec[ brain.geometry.faces[i].a].position.y, sphereVec[ brain.geometry.faces[i].a].position.z ));
             brainPositions.pos3.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].b].position.x, sphereVec[ brain.geometry.faces[i].b].position.y, sphereVec[ brain.geometry.faces[i].b].position.z  ));
             brainPositions.pos3.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].c].position.x, sphereVec[ brain.geometry.faces[i].c].position.y, sphereVec[ brain.geometry.faces[i].c].position.z  ));

           }  else {

             brainPositions.pos2.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].a].position.x, sphereVec[ brain.geometry.faces[i].a].position.y, sphereVec[ brain.geometry.faces[i].a].position.z ));
             brainPositions.pos2.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].b].position.x, sphereVec[ brain.geometry.faces[i].b].position.y, sphereVec[ brain.geometry.faces[i].b].position.z  ));
             brainPositions.pos2.push( new THREE.Vector3( sphereVec[ brain.geometry.faces[i].c].position.x, sphereVec[ brain.geometry.faces[i].c].position.y, sphereVec[ brain.geometry.faces[i].c].position.z  ));

           }



   }
}





   var path1 = new THREE.CatmullRomCurve3( brainPositions.pos1 );
   var path2 = new THREE.CatmullRomCurve3( brainPositions.pos2 );
   var path3 = new THREE.CatmullRomCurve3( brainPositions.pos3 );

   var pos1 = [ path1.getPoint( 0 ),
                path1.getPoint( 0.00001) ];

   var pos2 = [ path2.getPoint( 0 ),
                path2.getPoint( 0.00001) ];

   var pos3 = [ path3.getPoint( 0 ),
                path3.getPoint( 0.00001) ];

   var brainCurve1 = createCurve( pos1, 0x0068e6, true, 0.5 );
   var brainCurve2 = createCurve( pos2, 0x006ef3, true, 0.5 );
   var brainCurve3 = createCurve( pos3, 0x005ccc, true, 0.5 );

   brainCurves = [  { path: path1, curve: brainCurve1, currentPos: pos1, color: 0x0068e6 },
                    { path: path2, curve: brainCurve2, currentPos: pos2, color: 0x006ef3 },
                    { path: path3, curve: brainCurve3, currentPos: pos3, color: 0x005ccc }  ];

   brainCurves[0].curve.mesh.name = 'curve0';
   brainCurves[1].curve.mesh.name = 'curve1';
   brainCurves[2].curve.mesh.name = 'curve2';



  brainBox.add( brainCurves[0].curve.mesh );
  brainBox.add( brainCurves[1].curve.mesh );
 brainBox.add( brainCurves[2].curve.mesh );

}





function createCurve( curvePositions, colour, transparent, opacity  )
{

var curve = new THREE.CatmullRomCurve3( curvePositions );

curve.closed = false;
curve.type = 'chordal';
var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial( { color: colour, transparent: transparent, opacity: opacity });
geometry.vertices = curve.getPoints( 5000 );
curve.mesh = new THREE.Line( geometry, material );

return curve;

}

var lastCounter = 0;

function brainDrawLines() {
if( counter <= 1.006){

  for( var i = 0; i < brainCurves.length; i++ ){

     var position =  brainCurves[i].path.getPoint( counter );

     brainCurves[i].currentPos.push( new THREE.Vector3( position.x, position.y, position.z) );
     brainCurves[i].curve = createCurve( brainCurves[i].currentPos, brainCurves[i].color, true, 0.5  );

     brainCurves[i].curve.mesh.name = 'curve'+i+counter;


     brainBox.add( brainCurves[i].curve.mesh);


     brainBox.rotation.y += 0.01 * ( Math.PI / 180 );

     if ( lastCounter == 0 ){
       var object = brainBox.getObjectByName('curve'+i);
       brainBox.remove( object );

     }
       else {
              var object = brainBox.getObjectByName('curve'+i+lastCounter);
              brainBox.remove( object );
            }
   }

}

lastCounter = counter;
counter += 0.005;
}

function brainZoomOut() {

if( brainBox.position.z > -100 ){

  brainBox.position.z -= 2.5;


}
else {

   setTimeout(function () {


      changeAt('brainDissapear') ;

   }, 1000);




};

brainBox.rotation.y +=  0.5 * ( Math.PI / 180 );

}


function brainDissapear(){

  TWEEN.update();
   console.log( brainBox.scale );
  if( brainBox.scale.z > 0.01 ){
     console.log( brainBox.scale );
    brainBox.scale.x -= 0.01;
    brainBox.scale.y -= 0.01;
    brainBox.scale.z -= 0.01;

    brainBox.rotation.y +=  0.5 * ( Math.PI / 180 );


  } else {

         scene.children.splice( 2, 1 );
         $('#text').animateCss('fadeOutUpBig');
      // scene.children.splice( 2, 1 );
         at = 'twitter';
         console.log( scene );


  }

}
