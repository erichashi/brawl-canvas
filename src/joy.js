https://github.com/bobboteck/JoyStick
var JoyStick=function(t,e){var n=void 0===(e=e||{}).title?"joystick":e.title,i=void 0===e.width?0:e.width,o=void 0===e.height?0:e.height,r=void 0===e.internalFillColor?"#00AA00":e.internalFillColor,d=void 0===e.internalLineWidth?2:e.internalLineWidth,h=void 0===e.internalStrokeColor?"#003300":e.internalStrokeColor,a=void 0===e.externalLineWidth?2:e.externalLineWidth,f=void 0===e.externalStrokeColor?"#008000":e.externalStrokeColor,c=void 0===e.autoReturnToCenter||e.autoReturnToCenter,u=document.getElementById(t),l=document.createElement("canvas");l.id=n,0===i&&(i=u.clientWidth),0===o&&(o=u.clientHeight),l.width=i,l.height=o,u.appendChild(l);var s=l.getContext("2d"),g=0,v=2*Math.PI,m=(l.width-(l.width/2+10))/2,p=m+5,C=m+30,w=l.width/2,L=l.height/2,E=l.width/10,P=-1*E,S=l.height/10,k=-1*S,W=w,T=L;function G(){s.beginPath(),s.arc(w,L,C,0,v,!1),s.lineWidth=a,s.strokeStyle=f,s.stroke()}function x(){s.beginPath(),W<m&&(W=p),W+m>l.width&&(W=l.width-p),T<m&&(T=p),T+m>l.height&&(T=l.height-p),s.arc(W,T,m,0,v,!1);var t=s.createRadialGradient(w,L,5,w,L,200);t.addColorStop(0,r),t.addColorStop(1,h),s.fillStyle=t,s.fill(),s.lineWidth=d,s.strokeStyle=h,s.stroke()}"ontouchstart"in document.documentElement?(l.addEventListener("touchstart",function(t){g=1},!1),document.addEventListener("touchmove",function(t){t.preventDefault(),1===g&&t.targetTouches[0].target===l&&(W=t.targetTouches[0].pageX,T=t.targetTouches[0].pageY,"BODY"===l.offsetParent.tagName.toUpperCase()?(W-=l.offsetLeft,T-=l.offsetTop):(W-=l.offsetParent.offsetLeft,T-=l.offsetParent.offsetTop),s.clearRect(0,0,l.width,l.height),G(),x())},!1),document.addEventListener("touchend",function(t){g=0,c&&(W=w,T=L);s.clearRect(0,0,l.width,l.height),G(),x()},!1)):(l.addEventListener("mousedown",function(t){g=1},!1),document.addEventListener("mousemove",function(t){1===g&&(W=t.pageX,T=t.pageY,"BODY"===l.offsetParent.tagName.toUpperCase()?(W-=l.offsetLeft,T-=l.offsetTop):(W-=l.offsetParent.offsetLeft,T-=l.offsetParent.offsetTop),s.clearRect(0,0,l.width,l.height),G(),x())},!1),document.addEventListener("mouseup",function(t){g=0,c&&(W=w,T=L);s.clearRect(0,0,l.width,l.height),G(),x()},!1)),G(),x(),this.GetWidth=function(){return l.width},this.GetHeight=function(){return l.height},this.GetPosX=function(){return W},this.GetPosY=function(){return T},this.GetX=function(){return((W-w)/p*100).toFixed()},this.GetY=function(){return((T-L)/p*100*-1).toFixed()},this.GetDir=function(){var t="",e=W-w,n=T-L;return n>=k&&n<=S&&(t="C"),n<k&&(t="N"),n>S&&(t="S"),e<P&&("C"===t?t="W":t+="W"),e>E&&("C"===t?t="E":t+="E"),t}};