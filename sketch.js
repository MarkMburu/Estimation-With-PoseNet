let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video,modelLoader)
  poseNet.on('pose',gotPoses)
}

function gotPoses(poses){
  console.log("poses",poses)
  if(poses.length > 0){
    pose = poses[0].pose
    skeleton = poses[0].skeleton;
  }
  
}

function modelLoader(){
    console.log("posenet ready")

}

function draw() {
  image(video,0,0)
  if(pose){
  let eyeR = pose.rightEye;
  let eyeL = pose.leftEye;
  let d = dist(eyeR.x,eyeR.y,eyeL.x,eyeL.y);
    
  fill(255,0,0);
  ellipse(pose.nose.x,pose.nose.y,64)
  fill(0,255,0);
  ellipse(pose.leftWrist.x,pose.leftWrist.y,32) 
  fill(0,0,255);
  ellipse(pose.rightWrist.x,pose.rightWrist.y,32)   
  
  for(let i = 0; i < pose.keypoints.length; i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    fill(25,125,150);
    ellipse(x,y,16,16);
  }
  for(let i = 0; i < skeleton.length;i++){
    let a = skeleton[i][0]
    let b = skeleton[i][1]
    let p = position.x
    let q = position.y
    strokeWeight(4)
    stroke(255)
    line(a.p,a.q,b.p,b.q)
  }  
  }
}