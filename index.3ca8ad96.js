function t(t,e,i,s){Object.defineProperty(t,e,{get:i,set:s,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},h={},n=i.parcelRequireaa2a;null==n&&((n=function(t){if(t in s)return s[t].exports;if(t in h){var e=h[t];delete h[t];var i={id:t,exports:{}};return s[t]=i,e.call(i.exports,i,i.exports),i.exports}var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){h[t]=e},i.parcelRequireaa2a=n),n.register("27Lyk",(function(e,i){var s,h;t(e.exports,"register",(()=>s),(t=>s=t)),t(e.exports,"resolve",(()=>h),(t=>h=t));var n={};s=function(t){for(var e=Object.keys(t),i=0;i<e.length;i++)n[e[i]]=t[e[i]]},h=function(t){var e=n[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),n("27Lyk").register(JSON.parse('{"67Pf5":"index.3ca8ad96.js","kp27Z":"cat-sprites-running.47e835c7.png","1H4Ur":"cat-sprites-idle.8767d413.png","7agUk":"confetti-sprites.0546130f.png"}'));class o{constructor(t,e){this.x=t,this.y=e,this.x=t,this.y=e}static zero(){return new o(0,0)}add(t){return new o(this.x+t.x,this.y+t.y)}subtract(t){return new o(this.x-t.x,this.y-t.y)}unit(){const t=this.length();return 0===t?o.zero():new o(this.x/t,this.y/t)}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}multiply(t){return new o(this.x*t,this.y*t)}angle(){return Math.atan2(this.y,this.x)}distanceTo(t){return this.subtract(t).length()}}class r{constructor(t,e=0){this.power=e,this.hp=a.of(100),this.hp=a.of(t)}damage(t){this.hp.value-=t.power}}class a{constructor(t,e){this.value=t,this.max=e}static of(t){return new a(t,t)}setMax(t){this.value=Math.min(this.value,t),this.max=t}}class c{constructor(t){this.context=t,this.position=o.zero(),this.velocity=o.zero(),this.direction=new o(0,0),this.lifetime=0,this.maxLifetime=1/0,this.isLiving=!0,this.attributes=new r(5,1),this.enemies=[]}animate(t){this.update(t),this.render(t)}move(t){this.velocity=t.unit(),this.direction=t}moveTo(t){this.position=t}stop(){this.velocity=o.zero()}attack(t){t.attributes.hp.value-=this.attributes.power}isOpponent(t){return this.enemies.includes(t)}update(t){this.lifetime+=t,this.position=this.position.add(this.velocity.multiply(t/5)),this.checkLifetimeEnd()&&this.onLifetimeEnd?.()}checkLifetimeEnd(){return this.lifetime>this.maxLifetime}}class d{constructor(t,e,i,s=60,h=!0){this.image=t,this.frameWidth=e,this.frameHeight=i,this.framesPerSecond=s,this.loop=h,this.frameIndex=0,this.time=0,this.imageLoaded=!1,this.loopCount=0,this.image.onload=()=>{this.imageLoaded=!0,this.framesPerRow=Math.floor(t.width/e)}}update(t){if(this.checkLoop())for(this.time+=t;this.time>1e3/this.framesPerSecond;)this.time-=1e3/this.framesPerSecond,this.frameIndex++,this.frameIndex>=this.framesPerRow*Math.floor(this.image.height/this.frameHeight)&&(this.frameIndex=0,this.loopCount++)}draw(t,e,i,s=o.zero()){if(!this.checkLoop())return;if(!this.imageLoaded)return;const h=Math.floor(this.frameIndex/this.framesPerRow),n=this.frameIndex%this.framesPerRow,r=s.x<0?1:-1;t.save(),t.scale(r,1),t.drawImage(this.image,n*this.frameWidth,h*this.frameHeight,this.frameWidth,this.frameHeight,e-this.frameWidth/2,i-this.frameHeight/2,this.frameWidth,this.frameHeight),t.restore()}checkLoop(){return this.loop||0===this.loopCount}}var l;l=new URL(n("27Lyk").resolve("kp27Z"),import.meta.url).toString();var u;let m;var p;u=new URL(n("27Lyk").resolve("1H4Ur"),import.meta.url).toString(),(p=m||(m={}))[p.IDLE=0]="IDLE",p[p.RUNNING=1]="RUNNING";class f extends c{sprites=new Map;mode=m.IDLE;static SPRITES=[{mode:m.IDLE,img:e(u),width:20,height:15,fps:5},{mode:m.RUNNING,img:e(l),width:22,height:16,fps:10}];constructor(t){super(t),this.attributes.hp.setMax(20),this.attributes.power=5,f.SPRITES.forEach((({mode:t,img:e,width:i,height:s,fps:h})=>{const n=new Image;n.src=e,this.sprites.set(t,new d(n,i,s,h))}))}render(t){const e=this.sprites.get(this.mode);e?.update(t),e?.draw(this.context,0,0,this.direction)}move(t){super.move(t),this.mode=m.RUNNING}stop(){super.stop(),this.mode=m.IDLE}}class g extends c{constructor(t){super(t),this.attributes.hp.setMax(5),this.attributes.power=5,this.isEnemy=!0}render(){this.context.save(),this.context.rotate(this.lifetime/1e3),this.context.beginPath(),this.context.moveTo(0,-5),this.context.lineTo(5,5),this.context.lineTo(0,3),this.context.lineTo(-5,5),this.context.lineTo(0,-5),this.context.fillStyle="red",this.context.fill(),this.context.restore()}}class y extends c{constructor(t,e){super(t),this.source=e,this.visible=!0,this.isLiving=!1}setVisible(t){this.visible=t}render(){if(!this.visible)return;const t=this.source.position.subtract(this.position);this.context.beginPath(),this.context.moveTo(0,0),this.context.lineTo(t.x,t.y),this.context.strokeStyle="#FFF",this.context.setLineDash([5,15]),this.context.stroke()}moveTo(t){super.moveTo(t)}}var x;x=new URL(n("27Lyk").resolve("7agUk"),import.meta.url).toString();class w extends c{constructor(t,e){super(t),this.sprite=e,this.isLiving=!1}checkLifetimeEnd(){return this.sprite.loopCount>0}render(t){this.sprite.update(t),this.sprite.draw(this.context,0,0,this.direction)}}class v extends w{constructor(t){const i=new Image;i.src=e(x);super(t,new d(i,81,81,10,!1))}render(t){this.context.save();const e=this.direction.unit().multiply(30);this.context.translate(e.x,e.y),this.context.rotate(this.direction.angle()+Math.PI/2),super.render(t),this.context.restore()}}class b{constructor(t){this.context=t,this.starElapsed=0,this.backgroundColor="rgb(10, 10, 10)",this.starColorRange=100,this.stars=[],this.maxStars=400}animate(t){this.render(t)}render(t){this.renderBackground(),this.renderStars(),this.checkStarElapsed(t)&&this.updateStars()}renderBackground(){this.context.fillStyle=this.backgroundColor,this.context.fillRect(0,0,this.width,this.height)}renderStars(){this.context.fillStyle="white",this.stars.forEach((t=>{this.context.fillRect(t.x,t.y,1,1)}))}updateStars(){this.stars=[];for(let t=0;t<this.maxStars;t++)this.stars.push(new o(Math.random()*this.width,Math.random()*this.height))}checkStarElapsed(t){return this.starElapsed+=t,this.starElapsed>200&&(this.starElapsed=0,!0)}}class E{constructor(t){this.context=t,this.showCoordinates=!1,this.width=0,this.height=0,this.lastTime=0,this.delta=0,this.mobiles=[],this.space=new b(t),this.player=new f(t),this.targetPoint=new y(t,this.player),this.mobiles.push(this.targetPoint);for(let e=0;e<10;e++){const e=new g(t);e.position.x=1e3*Math.random()-500,e.position.y=1e3*Math.random()-500,e.enemies.push(this.player),this.player.enemies.push(e),this.mobiles.push(e)}}resize(t,e){this.width=t,this.height=e,this.space.width=t,this.space.height=e}animate(t){this.updateDelta(t),this.updateNonPlayerMobiles(),this.updatePlayer(),this.context.restore()}movePlayer(t,e){const i=new o(t,e);this.player.move(i),this.targetPoint.moveTo(this.player.position.add(i)),this.targetPoint.setVisible(!0)}stopPlayer(){this.player.stop(),this.targetPoint.setVisible(!1),this.createCatAttackEffect(),this.attackEnemy()}getSummary(){return`\n      Player: ${this.player.position.x}, ${this.player.position.y}\n      Mobiles: ${this.mobiles.length}\n    `}updatePlayer(){this.context.save(),this.context.translate(this.width/2,this.height/2),this.player.animate(this.delta),this.drawCoordinates(this.player,20),this.context.restore(),this.removeDeadEnemies()}removeDeadEnemies(){this.mobiles=this.mobiles.filter((t=>t.attributes.hp.value>0))}attackEnemy(){const t=this.mobiles.filter((t=>this.player.isOpponent(t))).find((t=>t.position.distanceTo(this.player.position)<50));t&&this.player.attack(t)}updateNonPlayerMobiles(){this.space.animate(this.delta),this.mobiles.forEach((t=>{this.context.save(),this.context.translate(this.width/2-this.player.position.x+t.position.x,this.height/2-this.player.position.y+t.position.y),t.animate(this.delta),this.drawCoordinates(t,10,5),this.context.restore()}))}updateDelta(t){this.delta=t-this.lastTime,this.lastTime=t}createCatAttackEffect(){const t=new v(this.context);t.position=this.player.position,t.direction=this.player.direction,t.onLifetimeEnd=()=>{this.mobiles.splice(this.mobiles.indexOf(t),1)},this.mobiles.push(t)}drawCoordinates(t,e,i=8){if(!this.showCoordinates||!t.isLiving)return;this.context.fillStyle="white",this.context.font=`${i}px Arial`;const s=`${Math.round(t.position.x)}, ${Math.round(t.position.y)}`,h=s.length/4*i;this.context.fillText(s,-h,e)}}class k{keys=[];constructor(){this.canvas=document.createElement("canvas");const t=this.canvas.getContext("2d");if(!t)throw new Error("Could not get canvas context");this.context=t,this.game=new E(this.context)}start(){document.body.appendChild(this.canvas),window.addEventListener("resize",this.resize.bind(this)),this.registerCanvasEvents(),this.resize(),this.animate()}enableDebugMode(){return this.game.showCoordinates=!0,setInterval((()=>{console.log(this.game.getSummary())}),5e3),this}animate(t=0){this.game.animate(t),requestAnimationFrame(this.animate.bind(this))}resize(){this.width=document.body.clientWidth,this.height=document.body.clientHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.game.resize(this.width,this.height)}registerCanvasEvents(){this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),this.canvas.addEventListener("mousemove",this.onMouseMove.bind(this)),this.canvas.addEventListener("mouseup",this.onTouchEnd.bind(this)),this.canvas.addEventListener("touchstart",this.onTouchStart.bind(this)),this.canvas.addEventListener("touchmove",this.onTouchStart.bind(this)),this.canvas.addEventListener("touchend",this.onTouchEnd.bind(this)),document.addEventListener("keydown",this.onKeyDown.bind(this)),document.addEventListener("keyup",this.onKeyUp.bind(this))}onMouseDown(t){this.game.movePlayer(...this.calculateDistanceFromCenter(t.clientX,t.clientY))}onMouseMove(t){0!==t.buttons&&this.game.movePlayer(...this.calculateDistanceFromCenter(t.clientX,t.clientY))}onTouchStart(t){this.game.movePlayer(...this.calculateDistanceFromCenter(t.touches[0].clientX,t.touches[0].clientY))}onTouchEnd(){this.game.stopPlayer()}calculateDistanceFromCenter(t,e){const i=new o(this.width/2,this.height/2),s=new o(t,e).subtract(i);return[s.x,s.y]}onKeyDown(t){t.key in k.KEY_TO_DIRECTION&&(this.keys.includes(t.key)||(this.keys.push(t.key),this.updateKeys()))}onKeyUp(t){t.key in k.KEY_TO_DIRECTION&&(this.keys=this.keys.filter((e=>e!==t.key)),this.updateKeys())}updateKeys(){if(0===this.keys.length)return void this.game.stopPlayer();const t=this.keys.reduce(((t,e)=>[t[0]+k.KEY_TO_DIRECTION[e][0],t[1]+k.KEY_TO_DIRECTION[e][1]]),[0,0]);this.game.movePlayer(t[0],t[1])}static KEY_TO_DIRECTION={w:[0,-1],a:[-1,0],s:[0,1],d:[1,0],ArrowUp:[0,-1],ArrowLeft:[-1,0],ArrowDown:[0,1],ArrowRight:[1,0]}}(new k).enableDebugMode().start();
//# sourceMappingURL=index.3ca8ad96.js.map
