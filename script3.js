var arrData = [];
var bestScore = 0;
var thisScore = 0;
var maxLen=16; //array size
var hasMove = true;

function emptyArray() {
    arrData = [];
    for(var i=0; i<maxLen; i++) {
        arrData.push(0);
    }
}

function printArray() { //function to print array
   var arrMatrix =[];
   var end = 3;
   var counter = 0;
   for (var i =0; i<4; i++) {
        arrMatrix.push([]);
        end = end + 4;
       for (var a = 0; a<4; a++) {
          arrMatrix[i].push(arrData[counter]);
          counter += 1;
       }
       console.log(arrMatrix[i]);
   }
    console.log('-----------------');
    return;
}

function newGame() { //clear matrix to v = 0
    var a=Math.floor(Math.random()*maxLen); 
    var b=Math.floor(Math.random()*maxLen);
    while (a === b) {
        b=Math.floor(Math.random()*maxLen);
    }
    emptyArray();
    arrData[a] = 2;
    arrData[b] = 2;
}

function addTile() {
    var newArr =[]; //idx with empty node
    var randIndex;  //idx of newArr
    var randID;  //randID of arrTiles
    var randValue; //2  or 4
    for(var i=0; i<arrData.length; i++) {
        if (arrData[i] === 0) {
            newArr.push(i);
        }
    }
    if(newArr.length === 0 ){ //game lose
        hasMove = false;
        return;
    }
    randIndex = Math.floor(Math.random()*newArr.length);
    randID = newArr[randIndex];
    randValue = Math.floor(Math.random()*2)*2+2;
    arrData[randID] = randValue;
    return;
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
                arrA[i+1] = 0;
            } else {
                hasSameNum = false;
            }
        }
        arrA= toLeft(arrA);
    }
    
    if (arrA.length<4) {
        for(var a=arrA.length; a<4; a++) {
             arrA.push(0);
        }
    }   
    return arrA;
}
function keyMoveLeft(){ //moveleft key
    var idx = 0;
    var hasLeftMove = false;
    var arrRow = [];
    var arrRowNew = [];
    
    for (var i =0; i < maxLen; i+=4){
            for (var c=0; c<4; c++) {
                arrRow.push(arrData[i+c]);
            }
            arrRowNew = sumLeft(arrRow);
            for (var a = 0; a<4; a++) {
                if(arrRow !== arrRowNew) {
                    hasLeftMove = true;
                }
                arrData[i+a] = arrRowNew[a];
            }
            arrRow = [];
            arrRowNew = [];
    }
  
  if (hasLeftMove) { //add tile if has move
      addTile();
      console.log('addtile');
  } 
    return;
}


// function getPx(x){ //get grid location
//     var minV = 145;
//     var incr = 65;
//     return minV+ incr*(1+x);
// }

// function addValue(arrThis) {
//     //given array with four nodes
//     //if empty array, do nothing
//     //if node0 = 0 then shift 1,2,3 nodes
//     //if node0 = node1, then update node0, node1, move 2,3
//     //if 
// }

newGame();
printArray();

    for(var x=1; x<3;x++) {
      keyMoveLeft();  
      if (!hasMove) {
          break;
      } else {
      console.log("move:",x);
      printArray();
      }
    }




