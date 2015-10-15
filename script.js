var arrData = [];
var bestScore = 0;
var thisScore = 0;
var maxLen=4; //array size
var isNewGame = true;
var hasMove = true;
var hasLeftMove=true;
var hasRightMove=true;
var hasUpMove=true;
var hasDownMove=true;

var a = 0;
var b = 0;
for (var i=0;i<maxLen;i++) {
    arrData.push([0,0,0,0]);
}

function printArray() { //function to print array
    for (var y in arrData) {console.log(arrData[y]);}
    console.log('-------------------');
    return;
}

function newGame() { //clear matrix to v = 0
    for (var y in arrData) {
        for (var x in arrData) {
            arrData[y][x] = 0;
        }
    }
    thisScore=0;
    hasMove = true;
     hasLeftMove=true;
     hasRightMove=true;
     hasUpMove=true;
     hasDownMove=true;
    addTile();
    addTile();
}

function getRandNum(arrThis) { //pcik random idx return v
    var i = Math.floor(Math.random()*arrThis.length);
    return arrThis[i];
}
function getPx(x){ //get grid location
    var minV = 145;
    var incr = 65;
    return minV+ incr*(1+x);
}
function addTile() {
    var x=0, y=0, z = 0; 
    var i =0;
    var tileValue = 2;//TBA create random var for 2 and 4;
    var arrA = []; //array container
    if(!isNewGame){//test if array is full
        for (i in arrData) { //find rows with empty node
            if( arrData[i].indexOf(0) === -1) {
                z +=1;
            } 
        }
        if (z===maxLen) { //full row
        hasMove = false;
        alert("No More Move.");
        return;
        } else { //assign random array value=2,4
            tileValue = Math.floor(Math.random()*2)*2+2;
        }
    }    
    for (i in arrData) { //find rows with empty node
        if( arrData[i].indexOf(0) > -1) {
            arrA.push(i);
        } 
    }
    y = getRandNum(arrA); //get random row number
    arrA = []; //empty array content
    for (var n in arrData[y]) { //find col with empty node
        if(arrData[y][n]===0) {
            arrA.push(n);
        }
    }
    x = getRandNum(arrA); //get random column number
    arrData[y][x] = 2; //assign node in matrix
    isNewGame=false;
    return;
}
//array calc without considerin movement
function sumLeft(arrThis){  //for 4 tiles only
    var arrA = toLeft(arrThis);
    var hasSameNum = true;
    if(arrA[0]!==0){ //if not empty array
        hasSameNum = true;
    } else {
        return arrA;
    }
    while (hasSameNum && arrA.length>1){
        for(var i=0;i<arrA.length-1; i++){
            if(arrA[i]===arrA[i+1]) {
                arrA[i] = arrA[i]+arrA[i+1];
                thisScore = thisScore + arrA[i];
                arrA[i+1] = 0;
            } else {
                hasSameNum = false;
            }
        }
        arrA= toLeft(arrA);
    }
    if (thisScore > bestScore) {
        bestScore = thisScore;
    }
    if (arrA.length<maxLen) {
        for(var a=arrA.length; a<maxLen; a++) {
             arrA.push(0);
        }
    }   
    return arrA;
}
function toLeft(arrThis){
    var arrA=[];
    for (var x =0; x<arrThis.length; x++) {
      if (arrThis[x] !== 0) {
          arrA.push(arrThis[x]);
      }
    }
  return arrA;
}

function keyMoveLeft(){ //moveleft key
    var arrA=[]; //store tile value;
    hasLeftMove = false;
    for (var i=0; i<maxLen; i++) { //loop row
        arrA = sumLeft(arrData[i]);
        for (var a=0; a<maxLen; a++) {
            if (arrData[i][a]!==arrA[a]) {
                 hasLeftMove =true;
            } 
            arrData[i][a]=arrA[a];
        }
        arrA=[];
   }
   if (hasLeftMove) { //add tile if has move
   addTile();
   } 
    return;
}

function keyMoveRight(){ //moveright key
    var arrA=[]; //store tile value;
    var arrReverse = [];
    hasRightMove = false;
    for (var i=0; i<maxLen; i++) { //loop row
        //reverse 
        for (var c=(maxLen-1); c>-1; c--) {
             arrReverse.push(arrData[i][c])
        }
        arrA = sumLeft(arrReverse);
        arrA = arrA.reverse();
        for (var a=0; a<maxLen; a++) {
            if (arrData[i][a]!==arrA[a]) {
                 hasRightMove =true;
            } 
            arrData[i][a]=arrA[a];
        }
        arrA=[];
        arrReverse=[];
   }
   if (hasRightMove) { //add tile if has move
        addTile();
   } 
    return;
}

function keyMoveUp(){ //moveright key
    var arrA=[]; //store tile value;
    var arrCol=[]; 
    hasUpMove = false;
    
    for (var i = 0; i<maxLen; i++) { //col
        for (var a =0; a<maxLen; a++){ //row
            arrCol.push(arrData[a][i]);
        }
        arrA = sumLeft(arrCol);
        
        for (a=0; a<maxLen; a++) {
            if (arrData[a][i]!==arrA[a]) {
                 hasUpMove =true;
            } 
            arrData[a][i]=arrA[a];
        }
        arrA=[];
        arrCol=[];
   }
   if (hasUpMove) { //add tile if has move
   addTile();
   } 
    return;
}

function keyMoveDown(){ //movedown key
    var arrA=[]; //store tile value;
    var arrCol=[]; 
    hasDownMove = false;
    
    for (var i = 0; i<maxLen; i++) { //col
        for (var a =0; a<maxLen; a++){ //row
            arrCol.push(arrData[a][i]);
        }
        arrA = sumLeft(arrCol.reverse());
        arrA = arrA.reverse();
        for (a=0; a<maxLen; a++) {
            if (arrData[a][i]!==arrA[a]) {
                 hasDownMove =true;
            } 
            arrData[a][i]=arrA[a];
        }
        arrA=[];
        arrCol=[];
   }
   if (hasDownMove) { //add tile if has move
        addTile();
   } 
    return;
}



newGame();
printArray();



