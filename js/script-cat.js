// define: colors
const colorFeatures = "#AB5C53";
const black         = "#211F1F";
const colorShadow   = "#C39B88";
const colorSkin     = "#E5C0AA";
const white         = "#FFF";

// define: helpers
var isSpinning = true;
var TAU = Zdog.TAU;

// define: illustration
var mona = new Zdog.Illustration({
  element: ".mona",
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

// model: head
const head = new Zdog.Anchor({
  addTo: mona,
	translate: {
		y: 15
	},
});

const domepiece = new Zdog.Group({
  addTo: head
});

const noggin = new Zdog.RoundedRect({
  addTo: domepiece,
  width: 160,
  height: 66,
  stroke: 228,
  cornerRadius: 25,
  color: black,
  path: [
    { x: -4.5 },
    { x: 5.5 }
  ]
});

const face = new Zdog.Group({
  addTo: head,
  translate: { 
    x: 0, 
    y: 36, 
    z: 20 
  },
});

const skinShadow = new Zdog.RoundedRect({
  addTo: face,
  width: 100,
  height: 0,
  stroke: 180,
  cornerRadius: 40,
  color: colorShadow,
});

const skin = new Zdog.RoundedRect({
  addTo: face,
  width: 100,
  height: 0,
  stroke: 170,
  cornerRadius: 40,
  color: colorSkin,
  translate: {
    y: 4.5
  }
});

// model: eyes
const eyeRight = new Zdog.Anchor({
  addTo: face,
  translate: { 
    x: -76, 
    y: 6, 
    z: 80 
  },
  rotate: { 
    y: TAU / 14 
  }
});

const eye = new Zdog.Group({
  addTo: eyeRight
});

const iris = new Zdog.Ellipse({
  addTo: eye,
  fill: true,
  width: 40,
  height: 56,
  stroke: 2,
  scale: 1.5,
  color: white,
});

const pupil = new Zdog.Ellipse({
  addTo: eye,
  width: 37,
  height: 56,
  stroke: 0,
  fill: true,
  color: colorFeatures,
  translate: { 
    x: 3, 
    y: 5, 
    z: 0 
  },
});

const 반짝반짝 = new Zdog.Ellipse({
  addTo: pupil,
  width: 10,
  height: 10,
  color: white,
  fill: true,
  stroke: 0,
  translate: { 
    x: -7, 
    y: -12, 
    z: 3 
  }
});

const eyeLeft = eyeRight.copyGraph({
  translate: { 
    x: 76, 
    y: 6, 
    z: 80 
  },
  rotate: { 
    y: TAU / -14 
  }
});

// model: nose
const nose = new Zdog.Ellipse({
  addTo: face,
  width: 6,
  height: 6,
  fill: true,
  stroke: 10,
	color: colorFeatures,
  translate: { 
    x: 0, 
    y: 32, 
    z: 74 
  },
});

// model: mouth
const mouth = new Zdog.Ellipse({
  addTo: face,
	diameter: 30,
	quarters: 2,
	stroke: 4,
  scale: { 
    x: 0.8, 
    y: 1 
  },
	color: colorFeatures, 
  rotate: { 
    x: TAU / 2.3, 
    z: TAU / -4 
  },
  translate: { 
    x: 0, 
    y: 46, 
    z: 74 
  },
});


// model: ears
const ear = new Zdog.Cone({
  addTo: head,
  diameter: 120,
  length: 90,
  stroke: false,
  color: black,
	translate: {
		x: -120,
		y: -105
	},
  rotate: {
    x: TAU/4,
    y: TAU/12
  },
});

ear.copy({
  translate: { 
    x: 120, 
    y: -105 
  },
  rotate: {
    x: TAU/4,
    y: TAU/-12
  },
});


// model: whiskies
const whiskersRight = new Zdog.Anchor({
  addTo: head,
  translate: { 
    x: -290, 
    y: 20
  },
});

const whiskers = new Zdog.Group({
  addTo: whiskersRight
});

const whisker = new Zdog.Shape({
	addTo: whiskers,
	path: [
		{ x: 100, y: 0 },
    { arc: [
      { x: 30, y: -10 }, // corner
      { x: 0, y: 0 }, // end point
    ]}
	],
	closed: false,
	stroke: 4,
	color: black,
});

whisker.copy ({
	path: [
		{ x: 100, y: 0 },
    { arc: [
      { x: 30, y: -5 }, // corner
      { x: 0, y: 10 }, // end point
    ]}
	],
  translate: { 
    y: 20
  },
});

const whiskersLeft = whiskersRight.copyGraph({
  translate: { 
    x: 290, 
    y: 20
  },
  rotate: {
    y: TAU/2,
  },
});

// render + animate
var t = 0;
var tSpeed = 1/240;

// 判断是否移动端
const isMobile =  () => {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};
window.onload = () => {
  if (isMobile()) {
    // 隐藏猫
    document.getElementById("cat").style.display="none";
    return;
  }
  // 加载猫
  animate();
}
function animate() {
  if ( isSpinning ) {
    t += tSpeed;
    var theta = Zdog.easeInOut( t % 1 ) * TAU;
    var delta = TAU * -3/64;
    mona.rotate.y = Math.sin( theta ) * delta;
    mona.rotate.x = ( Math.cos( theta ) * -0.75 + -0.5 ) * delta;
  }

  mona.updateRenderGraph();
  requestAnimationFrame( animate );
}

