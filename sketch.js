
// classes for the assets, Parts being the most generic
class Parts {
  constructor(images) {
    this.images = images;
    this.index = 0;
  }

  display() {
    image(this.images[this.index], 0, 0, width, height);
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }
}

// Eyes and Hair classes and subclasses need the functionality to change colors
class Eyes {
  constructor(images, colors) {
    this.images = images;
    this.colors = colors;
    this.index = 0;
  }

  display() {
    tint(
      this.colors[this.index][0],
      this.colors[this.index][1],
      this.colors[this.index][2]
    );
    image(this.images[this.index], 0, 0, width, height);
    noTint();
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }

  changeColor(specificColors) {
    this.colors[this.index] = specificColors[(colorIndex + 1) % specificColors.length];
  }
}

class EyeShape extends Eyes {
  constructor(images, colors) {
    super(images, colors);
  }

  changeColor(specificColors) {
    super.changeColor(specificColors);
  }
}

class EyeWhite extends Eyes {
  constructor(images, colors) {
    super(images, colors);
  }

  changeColor(specificColors) {
    super.changeColor(specificColors);
  }
}

class Hair {
  constructor(images, overlayColors) {
    this.images = images;
    this.overlayColors = overlayColors;
    this.index = 0;
  }

  display() {
    tint(
      this.overlayColors[this.index][0],
      this.overlayColors[this.index][1],
      this.overlayColors[this.index][2]
    );
    image(this.images[this.index], 0, 0, width, height);
    noTint();
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }

  changeColor(specificColors) {
    this.overlayColors[this.index] = specificColors[(colorIndex + 1) % specificColors.length];
  }
}

class FrontHair extends Hair {
  constructor(images, overlayColors) {
    super(images, overlayColors);
    if (this.overlayColors.length !== this.images.length) {
      this.overlayColors = Array(this.images.length).fill().map(() => specificColors[0]);
    }
  }
}

class BackHair extends Hair {
  constructor(images, overlayColors) {
    super(images, overlayColors);
  }
}

let body;
let backHair;
let frontHair;
let eyeShape;
let eyeWhite;
let eyebrow;
let mouth;
let beards;
let skin;
let access;
let hats;
let back;
let clothes;
let rectColor;
let frameColor = 0;

let overlayColors = [];
let bodyIndex = 0;
let hairIndex = 0;
let bangsIndex = 0;
let colorIndex = 0;

let specificColors = [
  [255, 255, 255],  // White
  [255, 245, 229],  // Bleach
  [231, 209, 172],  // Blond
  [191, 167, 126],  // Dirty blond
  [119,101,54],  // Hazel 1
  [174,115,78],  // Hazel 2
  [145, 86, 67], // Light brown
  [102, 50, 34], // Red brown
  [63, 27, 15], // Auburn
  [66, 41, 28], // Brown
  [24, 9, 4], // Dark brown
  [0, 0, 0], // Black
   [57, 10, 17], // Wine red
  [114, 17, 30], // Red
  [214, 42, 67], // Pink red/hot pink
  [255, 155, 74], // Orange
  [255, 198, 92],  // Yellow
  [15, 61, 28],  // Dark green
  [66, 214, 108],  // Electric lime
  [198, 242, 231],  // Seafoam
  [76, 139, 255],  // Light blue
  [53, 55, 187],  // Blue
   [139, 95, 233], // Lilac
  [63, 33, 127], // Lavender
  [29, 12, 67], // Purple 
   [255, 88, 154], // Pink
  [255, 122, 218]  // Bubblegum
];

let pastelColors = [
  [255, 204, 204], // Light Pink
  [255, 229, 204], // Light Peach
  [204, 255, 204], // Light Green
  [204, 229, 255], // Light Blue
  [255, 204, 255], // Light Purple
  [213, 255, 237], // Light Seafoam
  [255, 250, 214]// Light Yellow
];

function preload() {
  backHairImages = loadImages("BackHair", 31, "Picrew_BackHair");
  frontHairImages = loadImages("FrontHair", 38, "Picrew_FrontHair");
  bodyImages = loadImages("Body", 17, "Picrew_Body");
  mouthImages = loadImages("Mouths", 21, "Picrew_Mouth");
  eyeShapeImages = loadImages("EyeShape", 18, "Picrew_EyeShape");
  eyeWhiteImages = loadImages("EyeWhite", 18, "Picrew_EyeWhite");
  eyebrowImages = loadImages("Eyebrows", 28, "Picrew_Eyebrows");
  clothesImages = loadImages("Clothes", 35, "Picrew_Clothes");
  hatsImages = loadImages("Hats", 14, "Picrew_Hats");
  backImages = loadImages("Back", 8, "Picrew_Back");
  accImages = loadImages("Accessories", 30, "Picrew_Accessories");
  skinImages = loadImages("Skin", 20, "Picrew_SkinDetails");
  beardImages = loadImages("Beards", 18, "Picrew_FacialHair");

  overlayColors = Array(backHairImages.length).fill().map(() => specificColors[0]);
  eyeColors = Array(eyeShapeImages.length).fill().map(() => specificColors[0]);
  eyeWhiteColors = Array(eyeWhiteImages.length).fill().map(() => specificColors[0]); // Add this line


  // Initializing assets
  backHair = new Hair(backHairImages, overlayColors);
  frontHair = new FrontHair(frontHairImages, overlayColors);
  body = new Parts(bodyImages);
  mouth = new Parts(mouthImages);
  eyebrow = new Parts(eyebrowImages);
  eyeShape = new EyeShape(eyeShapeImages, eyeColors);
  eyeWhite = new EyeWhite(eyeWhiteImages, eyeWhiteColors);
  clothes = new Parts(clothesImages);
  hats = new Parts(hatsImages);
  back = new Parts(backImages);
  access = new Parts(accImages);
  beards = new BackHair(beardImages, overlayColors);
  skin = new Parts(skinImages);
  
  
}


function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  
  createButtonForFeature('Save Character', () => saveCanvas());
  createButtonForFeature('Reload Project', () => location.reload());
  createButtonForFeature('Change Background Color', () => randomPastelColor());
  createButtonForFeature('Change Frame Color', () => randomFramePastelColor());

  
  let bodyButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => body.prev(), 'Arrows/RightArrow.png', () => body.next(), 'Skin Color');
  let skinButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => skin.prev(), 'Arrows/RightArrow.png', () => skin.next(), 'Skin Details');
  let backButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => back.prev(), 'Arrows/RightArrow.png', () => back.next(), 'Back');
  let clothesButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => clothes.prev(), 'Arrows/RightArrow.png', () => clothes.next(), 'Clothes');
  let mouthButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => mouth.prev(), 'Arrows/RightArrow.png', () => mouth.next(), 'Mouth');
  let eyebrowButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => eyebrow.prev(), 'Arrows/RightArrow.png', () => eyebrow.next(), 'Eyebrows');
  let backHairButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => backHair.prev(), 'Arrows/RightArrow.png', () => backHair.next(), 'Hair');
  let beardsButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => beards.prev(), 'Arrows/RightArrow.png', () => beards.next(), 'Facial Hair');
  let frontHairButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => frontHair.prev(), 'Arrows/RightArrow.png', () => frontHair.next(), 'Bangs');
  let hatsButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => hats.prev(), 'Arrows/RightArrow.png', () => hats.next(), 'Hats');
  let accessButtons = new ArrowButtonPair('Arrows/LeftArrow.png', () => access.prev(), 'Arrows/RightArrow.png', () => access.next(), 'Accessories');

  // Specifically tie the eyeShape and eyeWhite assets together to rotate in tandem
  let eyeButtons = new ArrowButtonPair(
  'Arrows/LeftArrow.png',
  () => {
    eyeShape.prev();
    eyeWhite.prev();
  },
  'Arrows/RightArrow.png',
  () => {
    eyeShape.next();
    eyeWhite.next();
  },
  'Eyes'
);
  // Buttons that deal with color changing aspects
    let hairColorButtons = new ColorArrowButtonPair(
  'Arrows/LeftArrow.png',
  () => {
    colorIndex = (colorIndex - 1 + specificColors.length) % specificColors.length;
    backHair.changeColor(specificColors);
    frontHair.changeColor(specificColors);
    beards.changeColor(specificColors);
  },
  'Arrows/RightArrow.png',
  () => {
    colorIndex = (colorIndex + 1) % specificColors.length;
    backHair.changeColor(specificColors);
    frontHair.changeColor(specificColors);
    beards.changeColor(specificColors);
  },
  'Hair Color'
);

let eyeColorButtons = new ColorArrowButtonPair(
  'Arrows/LeftArrow.png',
  () => {
    colorIndex = (colorIndex - 1 + specificColors.length) % specificColors.length;
    eyeShape.changeColor(specificColors);
  },
  'Arrows/RightArrow.png',
  () => {
    colorIndex = (colorIndex + 1) % specificColors.length;
    eyeShape.changeColor(specificColors);
  },
  'Eye Color'
);

let eyeWhiteColorButtons = new ColorArrowButtonPair(
  'Arrows/LeftArrow.png',
  () => {
    colorIndex = (colorIndex - 1 + specificColors.length) % specificColors.length;
    eyeWhite.changeColor(specificColors);
  },
  'Arrows/RightArrow.png',
  () => {
    colorIndex = (colorIndex + 1) % specificColors.length;
    eyeWhite.changeColor(specificColors);
  },
  'Eye White Color'
);
  
}

// Default
rectColor = (220);

function randomPastelColor() {
  rectColor = random(pastelColors);
}


function draw() {
  background(255);
  
  // Draw the background to change character background color
  fill(rectColor);
  strokeWeight(5);
  rect(0, 0, width, height);

  
  back.display();
  backHair.display();
  body.display();
  skin.display();
  mouth.display();
  eyeWhite.display();  
  eyeShape.display();
  eyebrow.display();
  clothes.display();
  frontHair.display();
  hats.display();
  access.display();
  beards.display();
  
  if (frameColor) {
    frame(frameColor);
  }
}
// Simplify code for image assets
function loadImages(folder, count, template) {
  let images = [];
  for (let i = 1; i <= count; i++) {
    images.push(loadImage(`${folder}/${template} ${i}.png`));
  }
  return images;
}

// Frame code 

function randomFramePastelColor() {
  const r = random(150, 225);
  const g = random(150, 225);
  const b = random(150, 225);
  frameColor = color(r, g, b);
}

function frame(color) {
  stroke(color);
  strokeWeight(60);
  noFill();
  rect(0, 0, width, height);
}

// Button code
function createButtonForFeature(label, action) {
  let button = createButton(label);
  button.parent('button-holder');
  button.class('button-style');
  button.mousePressed(action);
}

// Created classes for complicated arrow buttons
class ArrowButtonPair {
  constructor(prevImage, prevAction, nextImage, nextAction, buttonLabel) {
    this.buttonContainer = createDiv(); // Create a container for the button and arrow text
    this.buttonContainer.class('arrow-button-container'); // A specific class for styling 
    this.buttonContainer.parent('arrow-button-holder');

    // Create the label
    let labelElement = createP(buttonLabel);
    labelElement.class('label'); // Apply specific class for label styling 
    labelElement.parent(this.buttonContainer);

    // Create the "Prev" button
    let prevButton = createImg(prevImage, 'Prev');
    prevButton.class('arrow-button-style');
    prevButton.class('prev-button'); // Apply specific class for prev buttons
    prevButton.mousePressed(prevAction);
    prevButton.parent(this.buttonContainer);
    prevButton.size(20,20);

    // Create the "Next" button
    let nextButton = createImg(nextImage, 'Next');
    nextButton.class('arrow-button-style');
    nextButton.class('next-button'); // Apply specific class for next buttons
    nextButton.mousePressed(nextAction);
    nextButton.parent(this.buttonContainer);
    nextButton.size(20,20);
  }
}

class ColorArrowButtonPair {
  constructor(prevImage, prevAction, nextImage, nextAction, buttonLabel) {
    this.buttonContainer = createDiv(); // Create a container for the button and arrow text
    this.buttonContainer.class('arrow-button-container'); // A specific class for styling i
    this.buttonContainer.parent('arrow-button-holder');

    // Create the label
    let labelElement = createP(buttonLabel);
    labelElement.class('label'); // Apply specific class for label styling 
    labelElement.parent(this.buttonContainer);

    // Create the "Prev" button
    let prevButton = createImg(prevImage, 'Prev');
    prevButton.class('arrow-button-style');
    prevButton.class('prev-button'); // Apply specific class for prev buttons
    prevButton.mousePressed(prevAction);
    prevButton.parent(this.buttonContainer);
    prevButton.size(20,20);

    // Create the "Next" button
    let nextButton = createImg(nextImage, 'Next');
    nextButton.class('arrow-button-style');
    nextButton.class('next-button'); // Apply specific class for next buttons
    nextButton.mousePressed(nextAction);
    nextButton.parent(this.buttonContainer);
    nextButton.size(20,20);
  }
}