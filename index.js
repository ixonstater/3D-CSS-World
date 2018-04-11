var coords={
  Y:-10,
  xRot:0,
  yRot:90,
  zTran: 10000,
  speed:10,
  xMove:0,
  yMove:0,
}
var otherData={
  upDownInter:0,
  isFlying:false,
  horMoveInter:0,
  isMovingHor:false,
  verMoveInter:0,
  isMovingVer:false,
  mouseIsLocked:false,
}
//Mouse handling stuff
function handleMouse(e){
  if(e.type=='click'){
    if(!otherData.mouseIsLocked){
      document.body.requestPointerLock()
      document.addEventListener('mousemove', handleMouseMove)
    }
  }else if(e.type=='pointerlockchange'){
    if(!otherData.mouseIsLocked){
      otherData.mouseIsLocked = true;
    }else if(otherData.mouseIsLocked){
      document.removeEventListener('mousemove', handleMouseMove)
      otherData.mouseIsLocked = false;
    }
  }
}
function handleMouseMove(e){
  if (coords.yRot<180 && coords.yRot>0){
    coords.xRot += -e.movementX/15
    coords.yRot += -e.movementY/30
    ground.style='transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
    viewer.style = 'transform: translateX('+xTran+'px) translateY('+yTran+'px) translateZ('+zTran+'px) rotateX('+coords.yRot+'deg)'
  }else if(coords.yRot<80){
    coords.xRot += -e.movementX/5
    coords.yRot +=0.1
    ground.style='transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
  }else if(coords.yRot>80){
    coords.xRot += -e.movementX/5
    coords.yRot -=0.1
    ground.style='transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
  }
}
//End Mouse Handling stuff
//Keyboard handling stuff
function handleKeyPress(e){
    switch(e.code){
      case 'KeyW':
        if (!otherData.isMovingHor){
          otherData.horMoveInter = setInterval(function(){moveXY('forward')}, 10)
          otherData.isMovingHor = true
        }
        break;
      case 'KeyS':
        if (!otherData.isMovingHor){
          otherData.horMoveInter = setInterval(function(){moveXY('backward')}, 10)
          otherData.isMovingHor = true
        }
        break;
      case 'KeyA':
        if (!otherData.isMovingVer){
          otherData.verMoveInter = setInterval(function(){moveXY('left')}, 10)
          otherData.isMovingVer = true
        }
        break;
      case 'KeyD':
        if (!otherData.isMovingVer){
          otherData.verMoveInter = setInterval(function(){moveXY('right')}, 10)
          otherData.isMovingVer = true
        }
        break;
      case 'Space':
        if(!otherData.isFlying){
          otherData.upDownInter = setInterval(higher, 1)
          otherData.isFlying = true;
        }
        break;
      case 'ShiftLeft':
        if(!otherData.isFlying){
          otherData.upDownInter = setInterval(lower, 1)
          otherData.isFlying = true;
        }
        break;
  }
}
function handleKeyRelease(e){
  switch(e.code){
    case 'KeyW':
      clearInterval(otherData.horMoveInter)
      otherData.isMovingHor = false
      break;
    case 'KeyS':
      clearInterval(otherData.horMoveInter)
      otherData.isMovingHor = false
      break;
    case 'KeyA':
      clearInterval(otherData.verMoveInter)
      otherData.isMovingVer = false
      break;
    case 'KeyD':
      clearInterval(otherData.verMoveInter)
      otherData.isMovingVer = false
      break;
    case 'Space':
      clearInterval(otherData.upDownInter)
      otherData.isFlying = false
      break;
    case 'ShiftLeft':
      clearInterval(otherData.upDownInter)
      otherData.isFlying = false
      break;
  }
}
//End Keyboard Handling
//World Motion Functions
function higher(){
  coords.Y-=1
  ground.style = 'transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
}
function lower(){
  if (coords.Y < -1){
    coords.Y+=1
    ground.style = 'transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
  } else{
    return null;
  }
}
function moveXY(dir){
  var forX = 0
  var forY = 0
  var bacX = 0
  var bacY = 0
  var lefX = 0
  var lefY = 0
  var rigX = 0
  var rigY = 0
  switch (dir){
    case 'forward':
      var forY = coords.speed*Math.cos(toRadians(coords.xRot))
      var forX = coords.speed*Math.sin(toRadians(coords.xRot))
      break;
    case 'backward':
      var bacY = coords.speed*Math.cos(toRadians(coords.xRot))*-1
      var bacX = coords.speed*Math.sin(toRadians(coords.xRot))*-1
      break;
    case 'left':
      var lefY = coords.speed*Math.cos(toRadians(coords.xRot+90))/2
      var lefX = coords.speed*Math.sin(toRadians(coords.xRot+90))/2
      break;
    case 'right':
      var rigY = coords.speed*Math.cos(toRadians(coords.xRot+90))/(-2)
      var rigX = coords.speed*Math.sin(toRadians(coords.xRot+90))/(-2)
      break;
  }
  if (coords.xMove>-5000 && coords.xMove<5000){
    coords.xMove += (forX+bacX+lefX+rigX)
  }else if (coords.xMove<=-400){
    coords.xMove++
  }else {
    coords.xMove-=1
  }

  if (coords.yMove>-5000 && coords.yMove<5000){
    coords.yMove += (forY+bacY+lefY+rigY)
  }else if (coords.yMove<=-5000){
    coords.yMove++
  }else {
    coords.yMove-=1
  }
  ground.style = 'transform: translateX(-5000px) translateY(-5000px) translateZ('+coords.Y+'px) rotateZ('+coords.xRot+'deg) translateY('+coords.yMove+'px) translateX('+coords.xMove+'px)'
}
//End World Motion Functions
//Main Method and extra small stuff
function init(){
  xTran = (window.innerWidth)/2
  yTran = (window.innerHeight)/2
  zTran = 10000
  document.addEventListener('keydown',handleKeyPress)
  document.addEventListener('keyup',handleKeyRelease)
  document.body.addEventListener('click', handleMouse)
  document.addEventListener('pointerlockchange', handleMouse)
  ground = document.getElementById('ground-plane')
  viewer = document.getElementById('stand-point')
  let crosshair = document.getElementById('crosshair-cont')
  crosshair.style = 'top:'+((window.innerHeight-40)/2)+'px; left:'+((window.innerWidth-40)/2)+'px;'
  viewer.style = 'transform: translateX('+xTran+'px) translateY('+yTran+'px) translateZ('+zTran+'px) rotateX(90deg)'
  ground.style = 'transform: translateX(-5000px) translateY(-5000px) translateZ(-10px)'
  fillWorld()
}
document.addEventListener('DOMContentLoaded',init)
function toRadians(angle){
  return (angle*Math.PI/180)
}
function fillWorld(){
  var count = 0;
  for (let x=0; x<10; x++){
    for (let y=0; y<10; y++){
      let sideLength = Math.floor(Math.random() * (400)) + 10;
      let xDisp = Math.floor(Math.random() * (sideLength + 1)) + x*1000;
      let yDisp = Math.floor(Math.random() * (sideLength + 1)) + y*1000;
      let xRot = Math.floor(Math.random() * (91));
      let yRot = Math.floor(Math.random() * (91));
      let zDisp = Math.floor(Math.random() * (100));
      let colorInt =  Math.floor(Math.random() * (8));
      let color = ''
      switch (colorInt){
        case 0:
          color = 'white'
          break;
        case 1:
          color = 'green'
          break;
        case 2:
          color = 'yellow'
          break;
        case 3:
          color = 'blue'
          break;
        case 4:
          color = 'pink'
          break;
        case 5:
          color = 'red'
          break;
        case 6:
          color = 'purple'
          break;
        case 7:
          color = 'orange'
          break;
        case 8:
          color = 'grey'
          break;
      }
      let id = 'c'+count;
      new Rock (sideLength, xRot, yRot, xDisp, yDisp, zDisp, color, id)
      count++
    }
  }
}
//End Main Mehthod
//Assembly Methods for filling world
class assemblyMethods {
  constructor(){

  }
  addHTMLElem(parentID, tagType, text, attributes){
    var child = document.createElement(tagType)
    child.appendChild(document.createTextNode(text))
    if (parentID === 'body') {
      document.body.appendChild(child)
    }else{
      document.getElementById(parentID).appendChild(child)
    }
    for (let i=0; i<attributes.length; i+=2){
      child.setAttribute(attributes[i],attributes[i+1])
    }
    return{
      child
    }
  }
  setTransform(elemId, inString){
    let elem = document.getElementById(elemId)
    let oldStyle = elem.style.cssText
    elem.style = oldStyle+' '+'transform:'+inString
  }

  modHTMLElem(elemID, attributes){
    elem = document.getElementById(elemID)
    for (let i=0; i<attributes.length; i+=2){
      elem.setAttribute(attributes[i],attributes[i+1])
    }
  }
  addJSElem(parentID, generateElem, params, attributes){
      console.log('totalDisp' + (sideLength+xDisp))
    let newElem = generateElem(params)
    for (let i=0; i<attributes.length; i+=2){
      if (attributes[i]==='text'){
        newElem.innerHTML=attributes[i+1]
      }
      newElem.setAttribute(attributes[i],attributes[i+1])
    }
    document.getElementById(parentID).appendChild(newElem)
  }
  forEachStyle (classname, styles) {
    let elems = document.getElementsByClassName('mobile-menu-link')
    let newStyles = ''
    for(let i=0; i<styles.length; i+=2){
      newStyles += styles[i]+':'
      newStyles += styles[i+1]+';'
    }
    for (let i=0; i<elems.length; i++){
      elems[i].style=newStyles
    }
  }
}
var assembler = new assemblyMethods()
//End Assembly Methods
//Rock maker class
//Cube id's must be completely unique in program, even when wrapped in other elems!!!!
class Rock{
  constructor(sideLength, xRot, yRot, xDisp, yDisp, zDisp, color, id){
    this.sideLength = sideLength
    this.xRot = xRot
    this.yRot = yRot
    this.xDisp = xDisp
    this.yDisp = yDisp
    this.id = id
    assembler.addHTMLElem('ground-plane','div','',['id',id,'class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position: absolute; background-color: '+color+';'])
    assembler.setTransform(id,'translateY('+(-yDisp-sideLength-2)+'px) translateX('+(xDisp)+'px) translateZ('+zDisp+'px) rotateX('+xRot+'deg) rotateY('+yRot+'deg)')

      assembler.addHTMLElem(id,'div','',['id',id+'face1','class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position:absolute'])
      assembler.setTransform(id+'face1', 'translateX(-1px) translateY(-1px) translateZ('+(sideLength+2)+'px)')
      assembler.addHTMLElem(id,'div','',['id',id+'face3','class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position:absolute'])
      assembler.setTransform(id+'face3', 'translateX(-1px) translateY(-1px) translateZ('+(sideLength/2+1)+'px) rotateX(90deg) translateZ('+(-(sideLength/2+1))+'px)')
      assembler.addHTMLElem(id,'div','',['id',id+'face4','class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position:absolute'])
      assembler.setTransform(id+'face4', 'translateX(-1px) translateY(-1px) translateZ('+(sideLength/2+1)+'px) rotateX(90deg) translateZ('+(sideLength/2+1)+'px)')
      assembler.addHTMLElem(id,'div','',['id',id+'face5','class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position:absolute'])
      assembler.setTransform(id+'face5', 'translateX(-2px) translateY(-1px) translateZ('+(sideLength/2+1)+'px) rotateY(90deg) translateZ('+(sideLength/2+2)+'px)')
      assembler.addHTMLElem(id,'div','',['id',id+'face6','class','world-object cube-side','style','width:'+sideLength+'px; height:'+sideLength+'px; position:absolute'])
      assembler.setTransform(id+'face6', 'translateX(-1px) translateY(-1px) translateZ('+(sideLength/2+1)+'px) rotateY(90deg) translateZ('+(-(sideLength/2+1))+'px)')
  }
}
//End rock maker class
