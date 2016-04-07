

function loadingScreen() {

   if( camera.position.y > 0 ) {

    camera.position.y -= 0.15;
    loadingLine1.position.y -= 0.15;
    loadingLine2.position.y -= 0.15;

  }  else {
           setTimeout( function(){ changeAt( 'loading2' ); }, 300 )
           for( var i = 0; i < 50 ; i++ )
             removeSpheres();
          // cameraMove = false;


   }

   y = camera.position.y;

}


function loadingScreen2() {

      if ( loadingLine1.geometry.vertices[0].x < -1 ){

        loadingLine1.geometry.vertices[0].x += 0.1;
        loadingLine2.geometry.vertices[0].x -= 0.1;

        loadingLine1.geometry.verticesNeedUpdate = true;
        loadingLine2.geometry.verticesNeedUpdate = true;

        sphere.scale.x += 0.05;
        sphere.scale.y += 0.05;
        sphere.scale.z += 0.05;

        sphere.position.y += 0.02;
        loadingLine1.position.y += 0.02;
        loadingLine2.position.y += 0.02;

      }

      else {
              scene.remove(loadingLine1);
              scene.remove(loadingLine2);
              $('#text').text('Thought is a great force');
              $('#text').animateCss('bounceInDown');
              skip();
              window.setTimeout( function() {changeAt('force');  push.start();  } , 1200);


            }

}



function spherePush() {

 TWEEN.update();
 push.onComplete(function() {

    $('#text').animateCss('fadeOutUpBig');

    var numPoints = 70;

     spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 0, 3, 0 ),
        new THREE.Vector3( 0, 2.4, 0 ),
        new THREE.Vector3( -3, 1, 0 ),
        new THREE.Vector3( -4, -4, 0 ),
        new THREE.Vector3( -2, -3.5, 0 ),

        new THREE.Vector3( 0, -3, 0 )
     ]);

     var material = new THREE.LineBasicMaterial({
				color: 0xff00f0,
			});

			var geometry = new THREE.Geometry();
			var splinePoints = spline.getPoints( numPoints );

			for( var i = 0; i < splinePoints.length; i++ ){
				geometry.vertices.push( splinePoints[i] );
			}

			var line = new THREE.Line( geometry, material );
			//scene.add( line );

      changeAt('createStart');

      resize.start();



 });

}

function moveSphere() {

   TWEEN.update();

  if ( counter <= 1 ) {

    var position = spline.getPoint( counter );
    sphere.position.set(position.x, position.y, position.z );
    //box.rotation = spline.getTangent( counter );
    counter += 0.012;
  }

  resize.onComplete(function(){




    setTimeout(function () {

      $('#text').text('Thought creates');
      $('#text').animateCss('bounceInDown');
      changeAt( 'thought creates' );

      createHeart();

    }, 500);
  });

}


function createHeart() {


  //var numPoints = 400;

   spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0, -3, 0 ),
      new THREE.Vector3( 3, 0, 0 ),
      new THREE.Vector3( 2.5, 2, 0 ),
      new THREE.Vector3( 1, 2, 0 ),
      new THREE.Vector3( 0, 0.8, 0 ),
      new THREE.Vector3( -1, 2, 0 ),
      new THREE.Vector3( -2.5, 2, 0 ),
      new THREE.Vector3( -3, 0, 0 ),

   ]);
   spline.closed = true;

   counter = 0;
   sphereCounter = 0;

}

function thoughtCreates(){

  if ( counter <= 1 ) {

    var position = spline.getPoint( counter );
    sphere.position.set(position.x, position.y, position.z );
    //box.rotation = spline.getTangent( counter );

    switch ( sphereCounter ){

      case 1: sphereVec[0] = sphere.clone();             //set to 1 because sphere was duplicating on 0 for some reason
              sphereVec[0].scale.set( 0.9, 0.9, 0.9 );
              scene.add(sphereVec[0]);

               break;

      case 10: sphereVec[1] = sphere.clone();
               sphereVec[1].scale.set( 0.9, 0.9, 0.9 );
                 scene.add(sphereVec[1]);

                 break;

      case 20:  sphereVec[2] = sphere.clone();
                sphereVec[2].scale.set( 0.9, 0.9, 0.9 );
               scene.add(sphereVec[2]);

              break;

      case 40:  sphereVec[3] = sphere.clone();
                sphereVec[3].scale.set( 0.9, 0.9, 0.9 );
               scene.add(sphereVec[3]);

               break;

      case 70:  sphereVec[4] = sphere.clone();
                sphereVec[4].scale.set( 0.9, 0.9, 0.9 );
               scene.add(sphereVec[4]);
               break;

      case 100:  sphereVec[5] = sphere.clone();
                 sphereVec[5].scale.set( 0.9, 0.9, 0.9 );
                 scene.add(sphereVec[5]);

                 break;

      case 130:  sphereVec[6] = sphere.clone();
                sphereVec[6].scale.set( 0.9, 0.9, 0.9 );
               scene.add(sphereVec[6]);

               break;

      case 160:  sphereVec[7] = sphere.clone();
                sphereVec[7].scale.set( 0.9, 0.9, 0.9 );
                 scene.add(sphereVec[7]);

                 break;

      case 180:  sphereVec[8] = sphere.clone();
                sphereVec[8].scale.set( 0.9, 0.9, 0.9 );
                 scene.add(sphereVec[8]);
                 $('#text').animateCss('fadeOutUpBig');
                 $('#text').text('');

                 break;

      case 190:  sphereVec[9] = sphere.clone();
                  sphereVec[9].scale.set( 0.9, 0.9, 0.9 );
                 scene.add(sphereVec[9]);
                //counter = 1;
                 break;
    }

    counter += 0.005;
    sphereCounter +=1;

  }
  else {
          changeAt( 'thought destroys' );


            moveD.start();


  }

}



function thoughtDestroys() {

  TWEEN.update();


}

function createLines(){

    for ( var i = 0; i<= 9; i++ )
        {
          if( sphereVec[i].position.x == 0 )
          {

             lines[i] = new THREE.CatmullRomCurve3([

                new THREE.Vector3( sphereVec[i].position.x, sphereVec[i].position.y, 0 ),
                new THREE.Vector3( 0, 10, 0 )

             ]);

          } else if( sphereVec[i].position.x > 0 ){

          lines[i] = new THREE.CatmullRomCurve3([

              new THREE.Vector3( sphereVec[i].position.x, sphereVec[i].position.y, 0 ),
              new THREE.Vector3( sphereVec[i].position.x * 13, computePoint( 13, 0, sphereVec[i].position.x, -0.5, sphereVec[i].position.y ), 0 )

           ]);
         }  else {
                    lines[i] = new THREE.CatmullRomCurve3([

                    new THREE.Vector3( sphereVec[i].position.x, sphereVec[i].position.y, 0 ),
                    new THREE.Vector3( sphereVec[i].position.x * 13, computePoint( -13, 0, sphereVec[i].position.x, -0.5, sphereVec[i].position.y ), 0 )

            ]);


         }
        }
    counter = 0;
}

function explode() {

  TWEEN.update();

  if ( counter <= 1 )
  {
      for( var i = 0; i <= 9 ; i++ ){

        var position = lines[i].getPoint( counter );
        sphereVec[i].position.set(position.x, position.y, position.z );

      }

    counter += 0.05;

  }

}

function computePoint( x, x1, x2, y1, y2 ) {

      var y = (( y2 - y1 ) / ( x2 - x1 ) * x) + y1;

      return y;
}

function removeSpheres() {

  for( var i = 0; i < sphereVec.length ; i++ )
    scene.remove(sphereVec[i]);

}
