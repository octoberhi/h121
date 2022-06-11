function preload()
{
img1=loadImage("airpods.jpg");
img2=loadImage("highlighter.jpg");
img3=loadImage("marker.jpg");
img4=loadImage("sharpie.jpg");
img5=loadImage("water bottle.jpg");
img6=loadImage("pen.webp");
img7=loadImage("pencil_case.webp");
img8=loadImage("pencil.webp");
img9=loadImage("phone.webp");
img10=loadImage("twin_pen.webp");
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded()
{
console.log("MOdel loaded");
}

function draw(){
image(video, 0,0,300,300);
classifier.classify(video, gotResults);
}

var previous_result = "";

function gotResults(error, results)
{
if(error){
console.error(error);
} else{
if((results[0].confidence > 0.5) && (previous_result != results[0].label))
{
  console.log(results);
  previous_result = results[0].label;
  var synth = window.speechSynthesis;
  speak_data = results[0].label;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  document.getElementById("result_object_name").innerHTML = results[0].label;
  document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(2);
}
}
}
