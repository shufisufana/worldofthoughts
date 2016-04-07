var sphere;
var material;
var geo;
var spriteMaterial;
var sprite;
var sphereVec = [];
var glow;

function sphereInit( sphereSize, sphereVertices, spriteScale, posX, posY, posZ  ) {

  material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  geo = new THREE.SphereGeometry( sphereSize, sphereVertices, sphereVertices);

  spriteMaterial = new THREE.SpriteMaterial(
    {
       map: glow,

        color: 0xffffff, transparent: false, blending: THREE.AdditiveBlending
     });
   sprite = new THREE.Sprite( spriteMaterial );
   sprite.scale.set(spriteScale, spriteScale, 4.0);


   sphere = new THREE.Mesh(geo, material);
   sphere.add(sprite);
    sphere.name = 'sphere';

   sphere.position.set( posX, posY, posZ );

   scene.add(sphere);
   //console.log( sphere );
}

function generateSpheres( number ) {

  for( var i = 0; i < number; i++ )
  {

   sphereVec[i] = sphere.clone();
   sphereVec[i].position.set( Math.floor(( Math.random() * 12 * aspect ) -(( 10 * aspect) / 2 - 0.5 )) , Math.floor( Math.random() * 12 ) - 4.6 + 8, Math.floor( Math.random() * 2 ) );
   var x = Math.random();
   sphereVec[i].scale.set(x, x, x );


   scene.add( sphereVec[i] );

  }

}



function sphereInitBrain( sphereSize, sphereVertices, spriteScale, posX, posY, posZ  ) {

  material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  geo = new THREE.SphereGeometry( sphereSize, sphereVertices, sphereVertices);

  spriteMaterial = new THREE.SpriteMaterial(
    {
       map: glow,

        color: 0xffffff, transparent: false, blending: THREE.AdditiveBlending
     });
   sprite = new THREE.Sprite( spriteMaterial );
   sprite.scale.set(spriteScale, spriteScale, 4.0);


   var sph = new THREE.Mesh(geo, material);
   sph.add(sprite);


   sph.position.set( posX, posY, posZ );

   console.log(scene);
    sphereVec.push( sph );

}
