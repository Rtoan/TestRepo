import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import Stats from 'three/addons/libs/stats.module.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();
var size;
var points = new THREE.Object3D()
let INTERSECTED;
var attributes;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, 2*window.innerWidth/3 / window.innerHeight, 0.1, 1000 );

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*2/3, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,0,0);

const controls = new OrbitControls( camera, renderer.domElement );

document.addEventListener("keydown", function (e) {
	if([32,37,38,39,40].indexOf(e.keyCode) > -1){
	  e.preventDefault();
	  // Do whatever else you want with the keydown event (i.e. your navigation).
	}
  }, false);

var angle = 0;
var radius = 50;
// camera.position.x = radius * Math.cos( angle );  
// camera.position.z = radius * Math.sin( angle );
// angle += 0.01;
//controls.keyPanSpeed = 15;
//maybe max distance could be of use
//panspeed
//controls.getPolarAngle & controls.getAzumithalAngle gives you the rotation angle vertical/horizontal

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87 || keyCode == 38) {
        camera.position.z -= 5;
		console.log("w");
    } else if (keyCode == 83  || keyCode == 40) {
		camera.position.z += 5;
		console.log("s");
    } else if (keyCode == 65 || keyCode == 37) {
        camera.position.x -= 5;
		console.log("a");
    } else if (keyCode == 68  || keyCode == 39) {
        camera.position.x += 5;
		console.log("d");
    } else if (keyCode == 32) {
        camera.position.y += 5;
		console.log("space");
    } else if (keyCode == 82) {
        camera.position.y -= 5;
		console.log("r");
    }
	console.log(camera.position);
};

controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 0 );
controls.update();
window.addEventListener( 'resize', onWindowResize );
window.addEventListener( 'pointermove', onPointerMove );



const loader = new PCDLoader();
// nhood_test.pcd
//pole3_test - Copy.pcd
loader.load('CSite1_orig-utm.pcd',
	// called when the resource is loaded
	function ( points2 ) {
		points2.geometry.center();
		points2.rotateZ(Math.PI);
		//points2.scale.multiplyScalar( 10 ); (shows manipulation of points)
		scene.add( points2 );
		const geometry = points2.geometry;
		attributes = geometry.attributes;
		size = points2.size();
		points = points2;
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	raycaster.setFromCamera( pointer, camera );
	
	var intersects = raycaster.intersectObject( points );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].index ) {

			attributes.size.array[ INTERSECTED ] = size;

			INTERSECTED = intersects[ 0 ].index;

			attributes.size.array[ INTERSECTED ] = size * 15;
			attributes.size.needsUpdate = true;

		}

	} /*else if ( INTERSECTED !== null ) {

		attributes.size.array[ INTERSECTED ] = size;
		attributes.size.needsUpdate = true;
		INTERSECTED = null;


	} */

	renderer.render( scene, camera );
	//console.log(camera.position);
}
animate();

function onPointerMove( event ) {

	pointer.x = ( event.clientX / window.innerWidth*2/3 ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	animate();
} 

function onWindowResize() {

  camera.aspect = window.innerWidth*2/3 / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth*2/3, window.innerHeight );

  renderer.render( scene, camera );


} 


