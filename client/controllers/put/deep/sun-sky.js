/**
 * Created by aarutunyan on 4/8/15.
 */
var sunSky;
sunSkyController = window.sunSkyController = function($holder, options) {
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var container, stats;
  var camera, controls, scene, renderer;
  var sky, sunSphere;

  init();
  animate();

  function initSky() {

    // Add Sky Mesh
    sky = new THREE.Sky({wireframe: false, isNight: options.isNight});
    scene.add(sky.mesh);

    // Add Sun Helper
    sunSphere = new THREE.Mesh(new THREE.SphereGeometry(20000, 30, 30),
      new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false}));

    sunSphere.position.y = -700000;
    sunSphere.visible = true;
    //scene.add(sunSphere);

    /// GUI
    var effectController = options && options.effectController || {
      turbidity: 10,
      reileigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      inclination: 0.5, // elevation / inclination
      azimuth: 0.25, // Facing front,
      sun: !true
    }

    options.distance = options.distance || 400000;

    function guiChanged() {
      var uniforms = sky.uniforms;
      uniforms.turbidity.value = effectController.turbidity;
      uniforms.reileigh.value = effectController.reileigh;
      uniforms.luminance.value = effectController.luminance;
      uniforms.mieCoefficient.value = effectController.mieCoefficient;
      uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

      var theta = Math.PI * (effectController.inclination - 0.5);
      var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

      sunSphere.position.x = options.distance * Math.cos(phi);
      sunSphere.position.y = options.distance * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = options.distance * Math.sin(phi) * Math.cos(theta);

      sunSphere.visible = effectController.sun;
      sky.uniforms.sunPosition.value.copy(sunSphere.position);
    }

    //var gui = new dat.GUI();
    /*gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
     gui.add( effectController, "reileigh", 0.0, 4, 0.001 ).onChange( guiChanged );
     gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
     gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
     gui.add( effectController, "luminance", 0.0, 2).onChange( guiChanged );;
     gui.add( effectController, "inclination", 0, 1, 0.0001).onChange( guiChanged );
     gui.add( effectController, "azimuth", 0, 1, 0.0001).onChange( guiChanged );
     gui.add( effectController, "sun").onChange( guiChanged );*/

    guiChanged();

    camera.lookAt(sunSphere.position)
    //testing-only:
    window.camera = camera;
    window.sunSphere = sunSphere;

    sunSkyController.setInclination = window.setInclination = function(num) {
      var curInc = effectController.inclination,
        diff = num - curInc,
        inc1 = curInc,
        delta = 0.001,
        animFreq = 5,
        stop = false;
      function iterate(inc) {
        if(!stop) {
          if(diff > 0){
            inc1 += delta;
            stop = (num - inc1) < delta;
            //console.log(inc1);
          } else {
            inc1 -= delta;
            stop = (inc1 - num) < delta;
            //console.log(inc1);
          }
          effectController.inclination = inc;
          guiChanged();
          setTimeout(function(){
            iterate(inc1);
          }, animFreq);
        }
      }
      iterate(inc1);
      /*while(!stop) {
        if(diff > 0){
          inc1 += delta;
          stop = (num - inc1) < delta;
          console.log(inc1);

        } else {
          inc1 -= delta;
          stop = (inc1 - num) < delta;
          console.log(inc1);
        }
        setTimeout(function(inc){
          effectController.inclination = inc;
          guiChanged();
        }, animFreq, inc1);

      }*/
    }
    sunSkyController.getInclination = function() {
      return effectController.inclination;
    }

  }

  function initFloor(){//poc
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( '/img/Earth_1.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 1, 1 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.SphereGeometry(200000, 100, 100); //PlaneBufferGeometry
    //var floorGeometry = new THREE.PlaneGeometry(200000, 200000, 100, 100); //PlaneBufferGeometry
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    //scene.add(floor);
  }
  function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 2000000);
    if(options.isNight) {
      camera.position.x = -13087.707820830643;
      camera.position.y = -29587.464575810234;
      camera.position.z = 370313.81135127693;
    } else {
      camera.position.z = 2000;
      camera.position.y = 100;
      camera.setLens(20);
    }
    scene = new THREE.Scene();

    initSky();
    //initFloor();

    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $('body').find('canvas').remove();
    $holder.append($(renderer.domElement));

    //controls = new THREE.TrackballControls(camera, renderer.domElement);

    /*stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);*/

    //

    window.addEventListener('resize', onWindowResize, false);

    window.skyScene = {
      sky: sky,
      sunSphere: sunSphere,
      camera: camera,
      //controls: controls,
      scene: scene,
      renderer: renderer
    };

    sunSphere.castShadow = false;
    scene.castShadow = false;

    //light.castShadow = false;

    renderer.shadowMapEnabled = false;
  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

  }

  var time = 0;

  function animate() {

    //time = Date.now();

    requestAnimationFrame(animate);

    //controls.update();

    render();

  }

  function render() {
    renderer.render(scene, camera);
    //stats.update();
  }
  window.render = render;
}
