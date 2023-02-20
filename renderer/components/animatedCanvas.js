import React, { useRef, useEffect, useState } from 'react';

function AnimatedCanvas(props) {
    const canvasRef = useRef(null);
    const requestIdRef = useRef(null);
  
    function removeDot (dot) {
        props.dotArray.splice(props.dotArray.indexOf(dot), 1);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        function animate() {
          requestIdRef.current = requestAnimationFrame(animate);
          ctx.clearRect(0, 0, innerWidth, innerHeight);
    
          if (props.dotArray.length > 0) {
            props.dotArray.forEach((dot) => {
              dot.draw(ctx);
              dot.move();
              ctx.beginPath();
              ctx.moveTo(dot.theRealStartPos[1], dot.theRealStartPos[0]);
              ctx.lineTo(dot.endPos[1], dot.endPos[0]);
              ctx.lineWidth = 1;
              ctx.stroke();
    
              if (
                dot.startPos[0] === dot.endPos[0] &&
                dot.startPos[1] === dot.endPos[1] ||
                dot.startPos[0] > innerWidth ||
                dot.startPos[0] < 0 ||
                dot.startPos[1] > innerHeight ||
                dot.startPos[1] < 0
              ) {
                props.removeDot(dot);
              }
            });
          }
        }
    
        requestIdRef.current = requestAnimationFrame(animate);
    
        return () => {
          cancelAnimationFrame(requestIdRef.current);
        };
      }, [props.color, props.dotArray]);
  
//   useEffect(() => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       console.log(props.dotArray)

//     function animate() {
//         ctx.clearRect(0, 0, innerWidth, innerHeight);
//         if (props.dotArray.length > 0) {
//             props.dotArray.forEach((dot) => {
//                 dot.draw(ctx);
//                 dot.move();
//                 ctx.beginPath();
//                 ctx.moveTo(dot.theRealStartPos[1], dot.theRealStartPos[0]);
//                 ctx.lineTo(dot.endPos[1], dot.endPos[0]);
//                 ctx.lineWidth = 1;
//                 ctx.stroke();
//                 if (dot.startPos[0] === dot.endPos[0] && dot.startPos[1] === dot.endPos[1] || dot.startPos[0] > innerWidth || dot.startPos[0] < 0 || dot.startPos[1] > innerHeight || dot.startPos[1] < 0) {
//                     // props.dotArray.splice(props.dotArray.indexOf(dot), 1);
//                     // props.dotArray.filter(d => d !== dot)
//                     props.removeDot(dot);
//                 }
//             })
//         }
//         requestAnimationFrame(animate);
//       }
//       animate();
//   }, [props.color, props.dotArray]);

  return <canvas id="circle-canvas" ref={canvasRef} width={props.width} height={props.height} />;
}

export default AnimatedCanvas;