function t(t,e,i,s){Object.defineProperty(t,e,{get:i,set:s,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},h={},o=i.parcelRequireaa2a;null==o&&((o=function(t){if(t in s)return s[t].exports;if(t in h){var e=h[t];delete h[t];var i={id:t,exports:{}};return s[t]=i,e.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){h[t]=e},i.parcelRequireaa2a=o),o.register("27Lyk",(function(e,i){var s,h;t(e.exports,"register",(()=>s),(t=>s=t)),t(e.exports,"resolve",(()=>h),(t=>h=t));var o={};s=function(t){for(var e=Object.keys(t),i=0;i<e.length;i++)o[e[i]]=t[e[i]]},h=function(t){var e=o[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),o("27Lyk").register(JSON.parse('{"67Pf5":"index.9ffee55c.js","kp27Z":"cat-sprites-running.47e835c7.png","1H4Ur":"cat-sprites-idle.8767d413.png","7agUk":"confetti-sprites.0546130f.png"}'));class n{constructor(t,e){this.x=t,this.y=e,this.x=t,this.y=e}static zero(){return new n(0,0)}add(t){return new n(this.x+t.x,this.y+t.y)}subtract(t){return new n(this.x-t.x,this.y-t.y)}unit(){const t=this.length();return 0===t?n.zero():new n(this.x/t,this.y/t)}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}multiply(t){return new n(this.x*t,this.y*t)}angle(){return Math.atan2(this.y,this.x)}}class r{constructor(t){this.context=t,this.position=n.zero(),this.velocity=n.zero(),this.direction=new n(0,0),this.lifetime=0,this.maxLifetime=1/0}animate(t){this.update(t),this.render(t)}move(t){this.velocity=t.unit(),this.direction=t}moveTo(t){this.position=t}stop(){this.velocity=n.zero()}update(t){this.lifetime+=t,this.position=this.position.add(this.velocity.multiply(t/5)),this.checkLifetimeEnd()&&this.onLifetimeEnd?.()}checkLifetimeEnd(){return this.lifetime>this.maxLifetime}}class a{constructor(t,e,i,s=60,h=!0){this.image=t,this.frameWidth=e,this.frameHeight=i,this.framesPerSecond=s,this.loop=h,this.frameIndex=0,this.time=0,this.imageLoaded=!1,this.loopCount=0,this.image.onload=()=>{this.imageLoaded=!0,this.framesPerRow=Math.floor(t.width/e)}}update(t){if(this.checkLoop())for(this.time+=t;this.time>1e3/this.framesPerSecond;)this.time-=1e3/this.framesPerSecond,this.frameIndex++,this.frameIndex>=this.framesPerRow*Math.floor(this.image.height/this.frameHeight)&&(this.frameIndex=0,this.loopCount++)}draw(t,e,i,s=n.zero()){if(!this.checkLoop())return;if(!this.imageLoaded)return;const h=Math.floor(this.frameIndex/this.framesPerRow),o=this.frameIndex%this.framesPerRow,r=s.x<0?1:-1;t.save(),t.scale(r,1),t.drawImage(this.image,o*this.frameWidth,h*this.frameHeight,this.frameWidth,this.frameHeight,e-this.frameWidth/2,i-this.frameHeight/2,this.frameWidth,this.frameHeight),t.restore()}checkLoop(){return this.loop||0===this.loopCount}}var c;c=new URL(o("27Lyk").resolve("kp27Z"),import.meta.url).toString();var d;let l;var m;d=new URL(o("27Lyk").resolve("1H4Ur"),import.meta.url).toString(),(m=l||(l={}))[m.IDLE=0]="IDLE",m[m.RUNNING=1]="RUNNING";class u extends r{sprites=new Map;mode=l.IDLE;static SPRITES=[{mode:l.IDLE,img:e(d),width:20,height:15,fps:5},{mode:l.RUNNING,img:e(c),width:22,height:16,fps:10}];constructor(t){super(t),u.SPRITES.forEach((({mode:t,img:e,width:i,height:s,fps:h})=>{const o=new Image;o.src=e,this.sprites.set(t,new a(o,i,s,h))}))}render(t){const e=this.sprites.get(this.mode);e?.update(t),e?.draw(this.context,0,0,this.direction)}move(t){super.move(t),this.mode=l.RUNNING}stop(){super.stop(),this.mode=l.IDLE}}class p extends r{constructor(t){super(t)}render(){this.context.save(),this.context.rotate(this.lifetime/1e3),this.context.beginPath(),this.context.moveTo(0,-5),this.context.lineTo(5,5),this.context.lineTo(0,3),this.context.lineTo(-5,5),this.context.lineTo(0,-5),this.context.fillStyle="red",this.context.fill(),this.context.restore()}}class f extends r{constructor(t,e){super(t),this.source=e,this.visible=!0}setVisible(t){this.visible=t}render(){if(!this.visible)return;const t=this.source.position.subtract(this.position);this.context.beginPath(),this.context.moveTo(0,0),this.context.lineTo(t.x,t.y),this.context.strokeStyle="#FFF",this.context.setLineDash([5,15]),this.context.stroke()}moveTo(t){super.moveTo(t)}}var g;g=new URL(o("27Lyk").resolve("7agUk"),import.meta.url).toString();class y extends r{constructor(t,e){super(t),this.sprite=e}checkLifetimeEnd(){return this.sprite.loopCount>0}render(t){this.sprite.update(t),this.sprite.draw(this.context,0,0,this.direction)}}class x extends y{constructor(t){const i=new Image;i.src=e(g);super(t,new a(i,81,81,45,!1))}}class v{constructor(t){this.context=t,this.starElapsed=0,this.backgroundColor="rgb(10, 10, 10)",this.starColorRange=100,this.stars=[],this.maxStars=400}animate(t){this.render(t)}render(t){this.renderBackground(),this.renderStars(),this.checkStarElapsed(t)&&this.updateStars()}renderBackground(){this.context.fillStyle=this.backgroundColor,this.context.fillRect(0,0,this.width,this.height)}renderStars(){this.context.fillStyle="white",this.stars.forEach((t=>{this.context.fillRect(t.x,t.y,1,1)}))}updateStars(){this.stars=[];for(let t=0;t<this.maxStars;t++)this.stars.push(new n(Math.random()*this.width,Math.random()*this.height))}checkStarElapsed(t){return this.starElapsed+=t,this.starElapsed>200&&(this.starElapsed=0,!0)}}class w{constructor(t){this.context=t,this.width=0,this.height=0,this.lastTime=0,this.delta=0,this.mobiles=[],this.space=new v(t),this.player=new u(t),this.targetPoint=new f(t,this.player),this.mobiles.push(this.targetPoint);for(let e=0;e<10;e++){const e=new p(t);e.position.x=1e3*Math.random()-500,e.position.y=1e3*Math.random()-500,this.mobiles.push(e)}}resize(t,e){this.width=t,this.height=e,this.space.width=t,this.space.height=e}animate(t){this.updateDelta(t),this.updateNonPlayerMobiles(),this.updatePlayer(),this.context.restore()}movePlayer(t,e){const i=new n(t,e);this.player.move(i),this.targetPoint.moveTo(this.player.position.add(i)),this.targetPoint.setVisible(!0)}stopPlayer(){this.player.stop(),this.targetPoint.setVisible(!1),this.createCatAttackEffect()}updatePlayer(){this.context.save(),this.context.translate(this.width/2,this.height/2),this.player.animate(this.delta),this.context.restore()}updateNonPlayerMobiles(){this.space.animate(this.delta),this.mobiles.forEach((t=>{this.context.save(),this.context.translate(this.width/2-this.player.position.x+t.position.x,this.height/2-this.player.position.y+t.position.y),t.animate(this.delta),this.context.restore()}))}updateDelta(t){this.delta=t-this.lastTime,this.lastTime=t}createCatAttackEffect(){const t=new x(this.context);t.position=this.player.position,t.onLifetimeEnd=()=>{this.mobiles.splice(this.mobiles.indexOf(t),1)},this.mobiles.push(t)}}class E{keys=[];constructor(){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.game=new w(this.context)}start(){document.body.appendChild(this.canvas),window.addEventListener("resize",this.resize.bind(this)),this.registerCanvasEvents(),this.resize(),this.animate()}animate(t=0){this.game.animate(t),requestAnimationFrame(this.animate.bind(this))}resize(){this.width=document.body.clientWidth,this.height=document.body.clientHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.game.resize(this.width,this.height)}registerCanvasEvents(){this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),this.canvas.addEventListener("mousemove",this.onMouseMove.bind(this)),this.canvas.addEventListener("mouseup",this.onTouchEnd.bind(this)),this.canvas.addEventListener("touchstart",this.onTouchStart.bind(this)),this.canvas.addEventListener("touchmove",this.onTouchStart.bind(this)),this.canvas.addEventListener("touchend",this.onTouchEnd.bind(this)),document.addEventListener("keydown",this.onKeyDown.bind(this)),document.addEventListener("keyup",this.onKeyUp.bind(this))}onMouseDown(t){this.game.movePlayer(...this.calculateDistanceFromCenter(t.clientX,t.clientY))}onMouseMove(t){0!==t.buttons&&this.game.movePlayer(...this.calculateDistanceFromCenter(t.clientX,t.clientY))}onTouchStart(t){this.game.movePlayer(...this.calculateDistanceFromCenter(t.touches[0].clientX,t.touches[0].clientY))}onTouchEnd(){this.game.stopPlayer()}calculateDistanceFromCenter(t,e){const i=new n(this.width/2,this.height/2),s=new n(t,e).subtract(i);return[s.x,s.y]}onKeyDown(t){t.key in E.KEY_TO_DIRECTION&&(this.keys.includes(t.key)||(this.keys.push(t.key),this.updateKeys()))}onKeyUp(t){t.key in E.KEY_TO_DIRECTION&&(this.keys=this.keys.filter((e=>e!==t.key)),this.updateKeys())}updateKeys(){if(0===this.keys.length)return void this.game.stopPlayer();const t=this.keys.reduce(((t,e)=>[t[0]+E.KEY_TO_DIRECTION[e][0],t[1]+E.KEY_TO_DIRECTION[e][1]]),[0,0]);this.game.movePlayer(t[0],t[1])}static KEY_TO_DIRECTION={w:[0,-1],a:[-1,0],s:[0,1],d:[1,0],ArrowUp:[0,-1],ArrowLeft:[-1,0],ArrowDown:[0,1],ArrowRight:[1,0]}}(new E).start();
//# sourceMappingURL=index.9ffee55c.js.map
