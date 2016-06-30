var c = document.getElementById("myCanvas");
if (c.getContext) {
    //might regulate attribute
    //*****************************************************************************************//
    var maxY = 50; //max y coordinate
    var minY = 0;  //min y coordinate
    //test data  ↓↓↓↓
    var weatherArray = [[19, 22], [21, 25], [23, 28], [20, 23], [26, 28], [24, 29], [21, 26], [15, 28], [23, 31], [21, 25], [17, 26], [23, 29]];
    var pointColor = "#CB1B45";  //the color of the point
    var bezierColor = "#CB1B45"; //The color of the bezier curve
    var bgColor = "#CB1B45";  //The top of the gradient color
    var bgColor2 = "#ff3234"; //The top of the gradient color
    var textColor = "#CB1B45"; //the color of the text
    var dashedColor = "#CB1B45"; //the color of the dashed
    var textSize = "14px"; //text size tip:can add text font behind of the "14px ==>(here)"
    // *****************************************************************************************//

    var cxt = c.getContext("2d");
    var width = c.clientWidth;
    var height = c.clientHeight;

    var oneX = width / (weatherArray.length - 1);
    var oneY = height / (maxY - minY); // Each of the Y ratio

    //there test data(7true + 2false)
    //var testArray = [[-1, (weatherArray[0][1] - minY) * oneY], [oneX, (weatherArray[1][1] - minY) * oneY], [oneX * 2, (weatherArray[2][1] - minY) * oneY], [oneX * 3, (weatherArray[3][1] - minY) * oneY], [oneX * 4, (weatherArray[4][1] - minY) * oneY], [oneX * 5, (weatherArray[5][1] - minY) * oneY], [oneX * 6, (weatherArray[6][1] - minY) * oneY], [oneX * 7, (weatherArray[7][1] - minY) * oneY], [oneX * 8, (weatherArray[8][1] - minY) * oneY], [oneX * 9, (weatherArray[9][1] - minY) * oneY], [oneX * 10, (weatherArray[10][1] - minY) * oneY], [801, (weatherArray[11][1] - minY) * oneY]];
    var testArray = [];
    var testArray1 = [];
    for (var i = 0; i < weatherArray.length; i++) {
        if (i == 0) {
            testArray.push([-1, (maxY - (weatherArray[i][1] - minY)) * oneY]);
            testArray1.push([-1, (maxY - (weatherArray[i][0] - minY)) * oneY]);
        } else {
            testArray.push([oneX * i,(maxY - (weatherArray[i][1] - minY)) * oneY]);
            testArray1.push([oneX * i,(maxY - (weatherArray[i][0] - minY)) * oneY]);
        }
    }

    drawBg(cxt, testArray, bgColor);
    drawBg(cxt, testArray1, bgColor2);


    for (var i = 0; i < testArray.length; i++) {
        if (i == testArray.length - 1) {
            //drawBezier(cxt, testArray[i][0], testArray[i][1], testArray[i + 1][0], testArray[i + 1][1]);
        } else if (i == 0) {
            drawBezier(cxt, bezierColor, testArray[i][0], testArray[i][1], testArray[i + 1][0], testArray[i + 1][1]);
            drawBezier(cxt, bezierColor, testArray1[i][0], testArray1[i][1], testArray1[i + 1][0], testArray1[i + 1][1]);
        } else {
            drawBezier(cxt, bezierColor, testArray[i][0], testArray[i][1], testArray[i + 1][0], testArray[i + 1][1]);
            drawDashed(cxt, testArray[i][0], testArray[i][1], testArray1[i][1]);
            drawPoint(cxt, pointColor, testArray[i][0], testArray[i][1], false);

            drawBezier(cxt, bezierColor, testArray1[i][0], testArray1[i][1], testArray1[i + 1][0], testArray1[i + 1][1]);
            drawPoint(cxt,pointColor, testArray1[i][0], testArray1[i][1], true);

            drawText(cxt, weatherArray[i][1] + "`", testArray[i][0] - 5, testArray[i][1], true);
            drawText(cxt, weatherArray[i][0] + "`", testArray1[i][0] - 5, testArray1[i][1], false);
        }
        //alert(testArray[i][0]);

    }
} else {
    // canvas-unsupported code here
}
//draw point
function drawPoint(cxt, color, drawX, drawY, isSolid) {

    cxt.fillStyle = color;
    if (!isSolid) {
        cxt.beginPath();
        cxt.arc(drawX, drawY, 5, 0, Math.PI * 2, true);
        cxt.fill();
        cxt.closePath();
        cxt.beginPath();
        cxt.fillStyle = "#ffffff";
        cxt.arc(drawX, drawY, 3, 0, Math.PI * 2, true);
        cxt.fill();
    } else {
        cxt.beginPath();
        cxt.fillStyle = color;
        cxt.arc(drawX, drawY, 5, 0, Math.PI * 2, true);
        cxt.fill();
    }
    cxt.closePath();
}

//draw text
function drawText(cxt, text, drawX, drawY, isUpInfo) {
    cxt.beginPath();
    cxt.fillStyle = textColor;
    cxt.font = textSize;
    if (isUpInfo) {
        cxt.fillText(text, drawX, drawY - 10);
    } else {
        cxt.fillText(text, drawX, drawY + 20);
    }
    cxt.closePath();
}

//draw bezierLine
function drawBezier(cxt, color, startX, startY, stopX, stopY) {
    cxt.beginPath();
    //line color
    cxt.strokeStyle = color;
    cxt.lineWidth = 3;
    cxt.moveTo(startX, startY);
    cxt.bezierCurveTo((stopX - startX) / 2 + startX, startY, (stopX - startX) / 2 + startX, stopY, stopX, stopY);
    cxt.stroke();
    cxt.closePath();
}

//draw bg
function drawBg(cxt, array, startColor) {
    cxt.beginPath();
    var my_gradient = cxt.createLinearGradient(0, 0, 0, height);
    //bg gradient color
    my_gradient.addColorStop(0, startColor);
    my_gradient.addColorStop(1, "white");
    cxt.fillStyle = my_gradient;
    cxt.moveTo(width+4, height+4);
    cxt.lineTo(-4, height+4);
    cxt.lineTo(array[0][0], array[0][1]);
    //cxt.lineTo(array[array.length-1][0],array[array.length-1][1]);
    for (var i = 0; i < array.length; i++) {
        if (i == array.length - 1) {

        } else {
            cxt.bezierCurveTo((array[i + 1][0] - array[i][0]) / 2 + array[i][0], array[i][1],
                (array[i + 1][0] - array[i][0]) / 2 + array[i][0], array[i + 1][1],
                array[i + 1][0], array[i + 1][1]);
        }
        //alert(array[i][0]);
    }
    cxt.lineTo(width+4, height+4);

    cxt.fill();
}

//draw dashed line
function drawDashed(cxt, startX, startY, stopY) {
    var dashedLength = stopY - startY;
    var draw = true;
    var pointLength = 5;
    // /2 is 2px
    for (var i = 0; i < dashedLength / pointLength; i++) {

        if (draw) {
            cxt.beginPath();
            cxt.strokeStyle = dashedColor;
            cxt.moveTo(startX, startY + pointLength * i);
            cxt.lineTo(startX, startY + pointLength + pointLength * i);
            cxt.stroke();
            cxt.closePath();
            draw = false;
        } else {
            draw = true;
        }
    }
}
