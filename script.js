var arrData = [];
var bestScore = 0;
var thisScore = 0;
var maxLen=4; //array size
var isNewGame = true;
var hasMove = true;
for (i=0;i<maxLen;i++) {
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
    addTile();
    addTile();
}

function getRandNum(arrThis) { //select random index in arrThis and return value
    var i = Math.floor(Math.random()*arrThis.length);
    return arrThis[i];
}
function addTile() {
    var x=0, y=0, z = 0; 
    var i =0;
    var tileValue = 2;//TBA create random var for 2 and 4;
    var arrA = []; //array container
    if(!isNewGame){
        //test if array is full
        for (i in arrData) { //find rows with empty node
            if( arrData[i].indexOf(0) === -1) {
                z +=1;
            } 
        }
        if (z===maxLen) {
        hasMove = false;
        console.log("No More Move.");
        return;
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
    for (var i in arrData) { //loop row
        arrA = sumLeft(arrData[i]);
        for (var a in arrData[i]) {
            arrData[i][a]=arrA[a];
        }
        arrA=[];
   }
   addTile();
    return;
}
newGame();
printArray();
for(var x=1; x<30;x++) {
   keyMoveLeft();  
   if (!hasMove) {
       break;
   } else {
   console.log("move:",x);
   printArray();
   }
}




