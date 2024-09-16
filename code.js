//consts
const raritysgradients=["radial-gradient(circle, rgba(175,175,175,1) 0%, rgba(113,113,113,1) 100%)","radial-gradient(circle, rgba(24,255,0,1) 0%, rgba(0,173,7,1) 100%)","radial-gradient(circle, rgba(0,174,255,1) 0%, rgba(0,91,134,1) 100%)","radial-gradient(circle, rgba(207,0,255,1) 0%, rgba(111,0,134,1) 100%)","radial-gradient(circle, rgba(255,199,0,1) 0%, rgba(176,149,0,1) 100%)"]
const raritysgradients2=["rgba(175,175,175,1)","rgba(24,255,0,1)","rgba(0,174,255,1)","rgba(207,0,255,1)","rgba(255,199,0,1)"]
const consola=document.getElementById("consola")
const menu=document.getElementById("menu")
const game=document.getElementById("game")
const typesofgun=[["Riffle",36],["shotgun",6],["rocket",1]]
let startbutton
let player
let stick
let gun
let ehealth
let healthbar
let crosshair
let eyeballs
let UI
let nofslots
let gunslot
let gunimg
let bulletshow
let gunslotcontainer
let min
let bodyx
let bodyy
let isx
let isy
let maxx
let maxy
let ds
let home=true
let explosion

//Arrays
let pickguns
let shieldmap
let bulletmap     
let guns
let result
let enemys
let explosions

//Player variables
let health
let PlayerX
let PlayerY
let currentslot
let MoveX
let MoveY
let angle
let movespeed
let shield

//Others
let moveidx
let shootidx
let reloadidx
let reloadidx2
let mousedown
let cooldown
let tactil
let fps
let sx
let sy
let mybullet
let mousex
let mousey
let playtime
let windowx = window.innerWidth;
let windowy = window.innerHeight;


//Audios
let shotgunsound= new Audio('shotgun.mp3');
let Rifflesound= new Audio('Riffle.mp3');
let rocketsound= new Audio('rocket.mp3');
Rifflesound.volume="0.2"
let shotgunreload= new Audio('reloadshotgun.mp3');
let Rifflereload= new Audio('reloadriffle.mp3');
Rifflereload.volume="0.2"
let shotgunreloadfinish= new Audio('shotgunreloadfinish.mp3');
let rocketreload= new Audio('reloadrocket.mp3');

searchMenuitems()
function searchMenuitems(){
        startbutton=document.getElementById("startbtn")
startbutton.onclick=function(){
    startbutton.style.backgroundColor="yellow"
    Gamestart()
}
}

function Gamestart(){

createGame()
assignvariables()
uicreate()
Playermove()
Enemymove()
createShield("no",5)
bulletmove()
playtimeadd()
createRandomPickgun(6)
createEnemy()
createShieldElement(274,583)
document.documentElement.style.cursor = 'none';
if (tactil==false){
document.getElementById("controls").style.visibility="hidden"
stick.style.visibility="hidden"
Playermove()
createTree(bodyx,bodyy)
}
}
function createGame(){
    home=false
    menu.innerHTML=""
    game.innerHTML=`<div id="controls"> </div>
    <div id="stick"></div>
  
    <img id="gun" class="gun" src="Riffle.png">

<div id="player">
  <div style="top:5px;left:1px;" class="eye">
    <div class="eyeball"></div>
  </div>
  <div style="top:5px;left:26px;"class="eye">
  <div class="eyeball"></div>
</div>
</div>
<div id="healthbar"></div>
<div id="health"></div>
<img src="crosshair.png" id="crosshair"></img>
<div id="UI">

</div>`
}
function assignvariables(){
    player=document.getElementById("player")
stick=document.getElementById("stick")
gun=document.getElementById("gun")
ehealth=document.getElementById("health")
healthbar=document.getElementById("healthbar")
crosshair=document.getElementById("crosshair")
eyeballs=document.getElementsByClassName("eyeball")
UI=document.getElementById("UI")
nofslots=3
creategunslotcontainer()
gunslot=document.getElementsByClassName("gunslot")
gunimg=document.getElementsByClassName("gunimg")
bulletshow=document.getElementsByClassName("bullets")
gunslotcontainer=document.getElementById("gunslotcontainer")
min=3
bodyx=1200
bodyy=1200
isx=60
isy=175
maxx=-50
maxy=30
ds=200
guns=gunslotcreate()
pickguns=[]
shieldmap=[]
bulletmap=[]    
result=[]
enemys=[]
explosions=[]
health=100
PlayerX=bodyx/2
PlayerY=bodyy/2
player.style.left=PlayerX-22.5
player.style.top=PlayerY-22.5
currentslot=0
MoveX=0
MoveY=0
angle=0
movespeed=0.1
shield=false
gunidx=0
bulletidx=0
enemyidx=0
moveidx=0
shootidx=0
reloadidx=0
reloadidx2=0
mousedown=false
cooldown=true
tactil=false
fps=60
sx=0
sy=0
mousex=0
mousey=0
playtime=0
explosion=null
}
function goHome(){
home=true
game.innerHTML=""
menu.innerHTML=`<button id="startbtn">START</button>
  <div id="title"><strong>MIDWAY<br>SHOOTDOWN</strong>  </div>`
Rifflereload.pause()
Rifflesound.pause()
rocketreload.pause()
shotgunreload.pause()
window.scroll(0,0)
searchMenuitems()
}
function Demo(event)
{
    
    if (tactil==true){
        var br = document.body.getBoundingClientRect();
   
    mousex = Math.round(event.touches[0].clientX - br.left)-25
    mousey = Math.round(event.touches[0].clientY - br.top)-25
      moveidx++
         if (((mousex>maxx) && (maxx+ds>mousex))&&((mousey>maxy) && (maxy+ds>mousey))){
moveplayer()
             checkmove(moveidx)
       stick.style.left=mousex+"px"
    stick.style.top=mousey+"px"
         }else{
             Goback()
         }
    
  }}
  
    document.body.ontouchend=function(){
        Goback()
        
        
    }
function Goback(){
    mousex=0
        mousey=0
        stick.style.left=isx+"px"
    stick.style.top=isy+"px"

}

function moveplayer(){
    sx=mousex-isx
    sy=mousey-isy
    if (PlayerX+sx*0.1<bodyx && PlayerX+sx*0.1>min){
    PlayerX+=sx*0.1
    
    }
     if (PlayerY+sy*0.1<bodyy && PlayerY+sy*0.1>min){
    PlayerY+=sy*0.1
     }
     
    var tr=(Math.atan2((0-sy),sx)*180)/ Math.PI
    angle=(180-tr)+270
    player.style.left=PlayerX-22.5+"px"
    player.style.top=PlayerY-22.5+"px"
    gun.style.left=PlayerX-25-40*(angle<360||angle>540)+"px"
    gun.style.top=PlayerY-20+"px"
    if (angle<360||angle>540){
        gun.style.scale="-1 1"
        gun.style.transform=`rotateZ(${360-angle-90}deg)`
        }else{
            gun.style.scale="1 1"    
        gun.style.transform=`rotateZ(${angle-90}deg)`
        }

    
    if (cooldown==true){
        cooldown=false
        setTimeout(function(){
       cooldown=true
   },500)
        mybullet=document.createElement("img")
mybullet.className="bullet"
mybullet.src="Bullet.png"
    game.appendChild(mybullet)
    mybullet.style.left=PlayerX+7+"px"
    mybullet.style.top=PlayerY-10+"px"
    mybullet.style.transform=`rotateZ(${angle}deg)`
        var srcidx=0
        var bidx=0
        for (let index=0;index<bulletmap.length;index++)
        {
            if (bulletmap[index]==0){
                bidx=index
                break;
            }
            if (index==bulletmap.length-1){
                   bidx=bulletmap.length
                break;
             
                
            }
        }
        for (let index = 0; index < 2; index++) {
                      eyeballs[index].style.left=sx*0.1+"px"
    eyeballs[index].style.top=sy*0.1+"px"
            
        }

    bulletmove(mybullet,PlayerX+13,PlayerY-25,80*Math.cos((angle-90) * Math.PI / 180),80*Math.sin((angle-90) * Math.PI / 180),0,bidx)

}
}
document.addEventListener('touchstart',function(){
    if (tactil==false){
    mousedown=true
    Demo(event)
    }
})
document.addEventListener('touchmove',function(){
    if (tactil==false){
    mousedown=true
    Demo(event)
    }
})
document.addEventListener('touchend',function(){
    mousedown=false
})
function consolelog(something){
    const consola=document.getElementById("consola")
    consola.innerText=something
}
function checkmove(idx){
    setTimeout(function(){
        if (idx==moveidx && mousedown==true){
            moveplayer()
            moveidx++
            checkmove(moveidx)
        }
    },20)
}

function bulletmove(){
    if (home==false){
    for (let index = 0; index < bulletmap.length; index++) {
        var idx=index

        if (!(bulletmap[idx]==0)){
            

                var myArray=bulletmap[idx]
                var b=myArray[0]
                var x=myArray[1]
                var y=myArray[2]
                var mx=myArray[3]
                var my=myArray[4]
                var c=myArray[5]
                var type=myArray[6]
                var r=myArray[7]
                x=Math.round(x+mx)
                y=Math.round(y+my)
                c+=1000/fps
                var cmax
                if (type=="Riffleb"){
                    cmax=450

                }else if(type=="shotgunb"){
                    cmax=300
                }else if (type=="rocketb"){
                    cmax=200
                }
                b.style.left=x-15+"px"
                b.style.top=y-15+"px"

                
                if(c<cmax&&(x<bodyx && x>min)&&(y<bodyy && y>min)){
                    var myArray2=[b,x,y,mx,my,c,type,r]
                    bulletmap[idx]=myArray2
            }else{
                bulletmap.splice(index,1)
                b.remove()
                if (type=="rocketb"){
                    createExplosion(x,y,r)
                }
            }
    } 

}}
setTimeout(function(){bulletmove()},1000/fps)
}

function createEnemy(){
    if (home==false){
    let newEnemy=document.createElement("div")
    newEnemy.className="enemy"
    newEnemy=game.appendChild(newEnemy)
    newEnemy.innerHTML=`<div style="top:5px;left:1px;" class="eye"><div class="eyeball"></div></div><div style="top:5px;left:26px;"class="eye"><div class="eyeball"></div></div>`
    var myArray=[]
    myArray[0]=newEnemy
    myArray[1]=Math.floor(Math.random()*bodyx)
    myArray[2]=Math.floor(Math.random()*bodyy)
    myArray[3]=100
    enemys.push(myArray)

    setTimeout(function(){createEnemy()},5000-(playtime*50))
    }
}


function Enemymove(){
    if (home==false){
    for (let index = 0; index < enemys.length; index++) {
if (!(enemys[index]==0)){
    var myEnemyArray=enemys[index]
    var e=myEnemyArray[0]
    var x=myEnemyArray[1]
    var y=myEnemyArray[2]
    var l=myEnemyArray[3]
    

    var espeed=0.1*1000/fps
    var movex=0
    var movey=0
    if (x<PlayerX){
        movex=espeed
    }else{
        movex=-espeed
    }
       if (y<PlayerY){
        movey=espeed
    }else{
        movey=-espeed
    }


    for (let idx=0;idx< bulletmap.length;idx++){
if (!(bulletmap[idx]==undefined)){

        var myArray=bulletmap[idx]
        var b=myArray[0]
        var bx=myArray[1]
        var by=myArray[2]
        var type=myArray[6]
        var r=myArray[7]
        
        if((x-35<bx&& x+35>bx) && (y-35 <by  && y+35>by)){
            bulletmap.splice(idx,1)
            
            if (type=="rocketb"){
            createExplosion(bx,by,r)
            b.remove()
            }else{
            
            var damage=0
            if (type=="Riffleb"){
                damage=5
            }else if (type=="shotgunb"){
                damage=30
            }
            damage=damage+(r*5)
            l+=-damage
            b.remove()
            damageshow(bx,by,damage)
            if (l<0.1){

            break;
            }else{

                movex=0-movex*4
                movey=0-movey*4
                e.style.backgroundColor="rgb(240, 0, 0)"
                e.style.scale="1 1"
                  
                Hitanimation(e,0)

            }
        }
    
        }
    
    }}
    if (!(explosion==null)){
        var myExplosionArray=explosion
        var ex=myExplosionArray[0]
        var ey=myExplosionArray[1]
        var er=myExplosionArray[2]
        var explosioncollisions=150
        if ((x-explosioncollisions<ex&& x+explosioncollisions>ex) && (y-explosioncollisions <ey  && y+explosioncollisions>ey)){
            var edamage=80+(er*5)
            l+=-edamage
            damageshow(x,y,edamage)
        }
    }
        if (index==enemys.length-1){
            explosion=null
        }

if (l<0.1){
    e.remove()
    enemys.splice(index,1)
    continue;
}
    var epx=PlayerX-x
    var epy=PlayerY-y
    for (let idx2 = 0; idx2 < 2; idx2++) {

        e.getElementsByClassName("eyeball")[idx2].style.left=epx/120+"px"
        e.getElementsByClassName("eyeball")[idx2].style.top=epy/120+"px"
    }
    var pcolissions=35
if ((x<PlayerX+pcolissions && x>PlayerX-pcolissions) && (y<PlayerY+pcolissions && y>PlayerY-pcolissions))
    {   if (shield==false){
        health--
        ehealth.style.width=85/100*health+"px"
        if (health<0&&home==false){
            Gameover()
        }
    }
    } 
x+=movex
y+=movey
e.style.left=x-22.5+"px"
e.style.top=y-22.5+"px"
myEnemyArray=[e,x,y,l]
enemys[index]=myEnemyArray
}
}
setTimeout(function(){Enemymove()},1000/fps) 
} 
}

function Gameover(){
goHome()
}

var up=false
var left=false
var down=false
var right=false
var collect=false

document.addEventListener("keydown",function(){
    if (tactil==false){
let key=event.key
if (key=="w"||key=="ArrowUp"){
up=true
}
if (key=="s"||key=="ArrowDown"){
down=true
}
if (key=="a"||key=="ArrowLeft"){
left=true
}
if (key=="d"||key=="ArrowRight"){
right=true
}
if (key=="e"){
collect=true
}
if (key=="v"){
    if (!(guns[currentslot]==0)){
createPickgun(PlayerX,PlayerY,guns[currentslot][0],guns[currentslot][1],guns[currentslot][2],guns[currentslot][4])
guns[currentslot]=0
gun.src="empty.png"
gunimg[currentslot].src="empty.png"
gunslot[currentslot].style.background="none"
gunslot[currentslot].style.border="none"
bulletshow[currentslot].innerText=""
}
}
if (key=="r"){
    if(guns[currentslot][1]<guns[currentslot][2]){
reloadidx++
reload(currentslot,reloadidx)
}
}
var nkey=Number(key)
if (nkey>0&&nkey<nofslots+1){
if (!(nkey==currentslot+1))
changeslot(nkey-1)
}
if (key=="Escape"){
    deleteEverything()
}}
})

document.addEventListener("keyup",function(){
let key=event.key
if (key=="w"||key=="ArrowUp"){
up=false
}
if (key=="s"||key=="ArrowDown"){
down=false
}
if (key=="a"||key=="ArrowLeft"){
left=false
}
if (key=="d"||key=="ArrowRight"){
right=false
}
if (key=="e"){
collect=false
}
})



function Playermove(){
    if (home==false){
if(up==true){
    MoveY+=-movespeed
}
if(left==true){
    MoveX+=-movespeed
}
if(down==true){
    MoveY+=movespeed
}
if(right==true){
    MoveX+=movespeed
}


if ((PlayerX+MoveX*1000/fps<bodyx-75) && (PlayerX+MoveX*1000/fps>75)){

    PlayerX+=MoveX*1000/fps
    MoveX=MoveX*0.9
}else{
    MoveX=0
}
if ((PlayerY+MoveY*1000/fps<bodyy-75) && (PlayerY+MoveY*1000/fps>0)){

    PlayerY+=MoveY*1000/fps
    MoveY=MoveY*0.9
}else{
    MoveY=0
}

for (let index=0;index< pickguns.length;index++){
if (!(pickguns[index]==0)){
    var myArray=pickguns[index]
    var gx=myArray[1]
    var gy=myArray[2]
    var r=myArray[6]
    var gunhitbox=100
    if(((gx-gunhitbox < PlayerX) && (gx+gunhitbox > PlayerX)) && ((gy-gunhitbox < PlayerY) && (gy+gunhitbox > PlayerY))){

  
        myArray[0].style.background='radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,255,255,0) 70%)'

        if (collect==true){

Pickgun(index)
collect=false

}
                }else{
myArray[0].style.background=`radial-gradient(circle, ${raritysgradients2[r]} 0%, rgba(255,255,255,0) 70%)`
                }


      
     }}
     for (let index=0;index< shieldmap.length;index++){
        if (!(shieldmap[index]==0)){
            var mySplit=(shieldmap[index].style.left).split("p")
            var gx=Number(mySplit[0])+50
        
            mySplit=(shieldmap[index].style.top).split("p")
            var gy=Number(mySplit[0])+50
            var gunhitbox=75
            if(((gx-gunhitbox < PlayerX) && (gx+gunhitbox > PlayerX)) && ((gy-gunhitbox < PlayerY) && (gy+gunhitbox > PlayerY))){
            createShield(index,10)
            
            
            }
        }
    }

    window.scroll(PlayerX-windowx/2,PlayerY- windowy/2)
    for (let index = 0; index < bulletshow.length; index++) {
        if (!(guns[index]==0))
{        bulletshow[index].innerText=guns[index][1]+"/"+guns[index][2]
}
    }

    UI.style.left=scrollX+"px"
    UI.style.top=scrollY+"px"
    player.style.left=PlayerX-22.5+"px"
    player.style.top=PlayerY-22.5+"px"
    gun.style.left=PlayerX-25-(30*(angle<-90||angle>90))+"px"
    gun.style.top=PlayerY-25+"px"
        healthbar.style.left=PlayerX-40+"px"
    healthbar.style.top=PlayerY-40+"px"
            ehealth.style.left=PlayerX-37.5+"px"
    ehealth.style.top=PlayerY-37.5+"px"

    setTimeout(function(){
Playermove()
    },1000/fps)
}
}
document.addEventListener("mousemove",function(){
    if (home==false){
if (tactil==false){
    var addx=(scrollX)
    var addy=(scrollY)
 
    mousex=addx+event.clientX
mousey=addy+event.clientY
sx=(mousex-PlayerX)
sy=(mousey-PlayerY)
angle=Math.atan2(sy,sx)*180/ Math.PI

crosshair.style.left=mousex-20+"px"
crosshair.style.top=mousey-20+"px"
if (angle<-90||angle>90){
gun.style.scale="-1 1"
gun.style.transform=`rotateZ(${180-angle}deg)`
}else{
    gun.style.scale="1 1"    
gun.style.transform=`rotateZ(${angle}deg)`
}
for (let index = 0; index < 2; index++) {
eyeballs[index].style.left=sx/120+"px"
    eyeballs[index].style.top=sy/120+"px"
}}
}})
var mouse=false
document.addEventListener("mouseup",function(){
mouse=false


})
document.addEventListener("mousedown",function(){

    mouse=true
    if (home==false){
    if (tactil==false){
mouseclick()
    }
}
    })
function mouseclick(){
    if (guns[currentslot][3]==false && !(guns[currentslot]==0)){
    var currentbullets=guns[currentslot][1]

    if(currentbullets>0){

    if (cooldown==true){

        cooldown=false

var shotcooldown=0

guns[currentslot][1]--

        if (guns[currentslot][0]=="Riffle"){
     
            shotcooldown=150
            createBullet(angle,"Riffleb")
        }else if (guns[currentslot][0]=="shotgun"){

            shotcooldown=1500
            createBullet(angle,"shotgunb")
            createBullet(angle+15,"shotgunb")
            createBullet(angle-15,"shotgunb")
        }else if (guns[currentslot][0]=="rocket"){
            shotcooldown=500
            createBullet(angle,"rocketb")
        }
            for (let index = 0; index < 4; index++) {
    var spridx=0
    setTimeout(function(){
spridx++
if (spridx==4){
gun.src=`${guns[currentslot][0]}.png`
}else{
gun.src=`${guns[currentslot][0]}${spridx}.png`
}},250*index)
       
}
if (guns[currentslot][1]<1){
Rifflesound.pause()
Rifflesound.load()
reloadidx++
reload(currentslot,reloadidx)
}

shootidx++
shotcooldownmake(shootidx,shotcooldown)
    }
}
}}
function shotcooldownmake(myidx,shotcooldown){
    setTimeout(function(){
        if (myidx==shootidx)
     {    cooldown=true
        if (mouse==true){
            mouseclick()
        }else{
            if (guns[currentslot][0]=="Riffle"){
                Rifflesound.pause()
                Rifflesound.load()
            }
        }}
    
    },shotcooldown) 

}
function createBullet(a,type){

    if (home==false){
    mybullet=document.createElement("img")
    mybullet.className="bullet"
    mybullet.src=type+".png"
        game.appendChild(mybullet)
        mybullet.style.left=PlayerX+7+"px"
        mybullet.style.top=PlayerY-10+"px"
        mybullet.style.transform=`rotateZ(${a-270}deg)`
           bidx=null
        if (guns[currentslot][0]=="Riffle"){
        Rifflesound.play();
        }else if (guns[currentslot][0]=="shotgun"){
        shotgunsound.play();
        }else if (guns[currentslot][0]=="rocket"){

        }
        var myArray=[]
        myArray[0]=mybullet
        myArray[1]=PlayerX
        myArray[2]=PlayerY
        myArray[3]=Math.cos((a) * Math.PI / 180)*((80/3)*(1000/fps))*0.1
        myArray[4]=Math.sin((a) * Math.PI / 180)*((80/3)*(1000/fps))*0.1
        myArray[5]=0
        myArray[6]=type
        myArray[7]=guns[currentslot][4]
        bulletmap.push(myArray)

        }
    }
function Hitanimation(e,r){

    e.style.backgroundColor=`rgb(240, ${r*2}, ${r*2}`

    e.style.scale=((r/256)+0.75)+" "+((r/256)+0.75)
  
    if (r<64){
        setTimeout(function(){
            Hitanimation(e,r+2)
        },20)
    }
}
function createTree(x,y){
var newTree=document.createElement("img")
newTree.src="tree.png"
newTree.className="tree"
newTree=game.appendChild(newTree)
newTree.style.left=x+"px"
newTree.style.top=y+"px"
}

function Pickgun(idx)
{
    var oldArray=pickguns[idx]
    var g=oldArray[0]
    var x=oldArray[1]
    var y=oldArray[2]
    var type=oldArray[3]
    var b=oldArray[4]
    var mb=oldArray[5]
    var r=oldArray[6]
    var targetslot
    var myArray=0

    for (let index = 0; index < guns.length; index++) {
       if (guns[index]==0){
        g.remove()
        targetslot=index
        selectslot(currentslot,targetslot)
        break;
       }''
        if (index==guns.length-1){
            targetslot=currentslot
            var currentArray=guns[currentslot]
            g.src=currentArray[0]+".png"
            myArray=[g,x,y,currentArray[0],currentArray[1],currentArray[2],currentArray[4]]
    
        }
    }
currentslot=targetslot
gun.src=type+".png"
gunimg[currentslot].src=type+".png"
gunslot[currentslot].style.background=raritysgradients[r]
guns[currentslot]=[]
guns[currentslot][0]=type
guns[currentslot][1]=b
guns[currentslot][2]=mb
guns[currentslot][3]=false
guns[currentslot][4]=r
pickguns[idx]=myArray

}

function createPickgun(x,y,type,b,mb,r){

var newGun=document.createElement("img")
newGun=game.appendChild(newGun)
newGun.className="gun"
newGun.style.left=x-25+"px"
newGun.style.top=y-25+"px"
newGun.src=type+".png"
newGun.style.background=`radial-gradient(circle, ${raritysgradients2[r]} 0%, rgba(255,255,255,0) 70%)`
newGun.style.zIndex=-5
var myArray=[]
myArray[0]=newGun
myArray[1]=x
myArray[2]=y
myArray[3]=type
myArray[4]=b
myArray[5]=mb
myArray[6]=r
pickguns.push(myArray)


}


function createShield(idx,ws){
    if (shield==false){
        if (!(idx=="no")){
var s=shieldmap[idx]
s.remove()

shieldmap.splice(idx,1)
}
var newAura=document.createElement("img")
newAura=game.appendChild(newAura)
newAura.src="shield.png"
newAura.className="shield"
shield=true
Followplayer(3,0,newAura)

setTimeout(function(){
newAura.remove()
shield=false
},ws*1000)
    }
}
function Followplayer(s,c,e){
e.style.left=PlayerX-190+"px"
e.style.top=PlayerY-200+"px"
if (c<s){
setTimeout(function(){Followplayer(s,c+0.001,e)}
,1000/fps)
}
}
function reload(slot,myidx){
guns[slot][3]=true
if ((guns[slot][0]=="rocket")||(guns[slot][0]=="Riffle")){
normalreload(slot,guns[slot][0],myidx)
}else if(guns[slot][0]=="shotgun"){
reloadidx2++
reloadonebullet(slot,reloadidx2)
}
}
function reloadonebullet(slot,myidx){


if (myidx==reloadidx2){
    if (mouse==true&&guns[slot][1]>0){

        shotgunreloadfinish.play()
        shotgunreload.pause()
        shotgunreload.load()
        guns[slot][3]=false
        mouseclick()
    }else{


        
        if (guns[slot][1]<guns[slot][2]){
            shotgunreload.load()
            shotgunreload.play()
            guns[slot][1]++
            setTimeout(function(){reloadonebullet(slot,myidx)},600)
        }else{

            shotgunreloadfinish.load()
            shotgunreloadfinish.play()
            shotgunreload.pause()
            shotgunreload.load()
            guns[slot][3]=false
        }
 
            

  
}}}
function changeslot(slot){
Rifflesound.load()
var srcidx=slot+1
if (!(guns[slot]==0)){
selectslot(currentslot,slot)
currentslot=slot
gun.src=guns[currentslot][0]+".png"
}
}

function createShieldElement(x,y){
var newShield=document.createElement("img")
newShield=game.appendChild(newShield)
newShield.className="shielditem"
newShield.src="shielditem.png"
newShield.style.left=(x-50)+"px"
newShield.style.top=(y-50)+"px"
newShield.style.background='radial-gradient(circle, rgba(245,255,99,1) 0%, rgba(255,255,255,0) 70%)'




        shieldmap.push(newShield)
}
function playtimeadd(){
playtime++
    setTimeout(function(){playtimeadd()},1000)
}


window.addEventListener('resize', function() {
    var newwidth = window.innerWidth;
    var newheight = window.innerHeight;
    if ((newwidth !== windowx)||(newheight !== windowy)) {
        windowx = newwidth;  
        windowy = newheight;
       uiupdate()
    
    
    }
});
function uicreate(){




for (let index = 0; index < gunslot.length; index++) {
   gunslot[index].style.left=index*110+"px"
}

uiupdate()

}
function uiupdate(){

        UI.style.width=windowx+"px"
        UI.style.height=windowy+"px"
    gunslotcontainer.style.top=windowy+"px"
}
function creategunslotcontainer(){
    var newgunslotcontainer=document.createElement("div")
    newgunslotcontainer=UI.appendChild(newgunslotcontainer)
    newgunslotcontainer.id="gunslotcontainer"
    var containerHTML=""
    for (let index = 0; index < nofslots; index++) {

        containerHTML=containerHTML+creategunslot(index)
        
    }
    newgunslotcontainer.innerHTML=containerHTML

}
function creategunslot(idx){
    var htmlstring
    if (idx==0){
htmlstring=`
<div class="gunslot" style="border:3px solid white;z-index:1;">
<img class="gunimg" src="Riffle.png"></img>
<div class="bullets">36/36</div>
</div>
`

}else{
    htmlstring=`
    <div style="background:transparent;" class="gunslot">
    <img class="gunimg""></img>
    <div class="bullets"></div>
    </div>
    `

}
return htmlstring
}
function gunslotcreate(){
var myArray=[]

for (let index = 0; index < nofslots; index++) {
    var myArray2=[]
    if (index==0){
        myArray2=["Riffle",36,36,false,0]
    }else
{    myArray2=0

}
myArray.push(myArray2)
}
return myArray
}
function selectslot(oldslot,newslot){
    gunslot[newslot].style.border="3px solid white"
    gunslot[oldslot].style.border="none"
    gunslot[newslot].style.zIndex="1"
    gunslot[oldslot].style.zIndex="0"
}
function damageshow(x,y,damage){
    var newDamageshow=document.createElement("div")
    newDamageshow=game.appendChild(newDamageshow)
    newDamageshow.className="Damageshow"
    newDamageshow.innerText=damage
    newDamageshow.style.left=x+"px"
    newDamageshow.style.top=y+"px"


    setTimeout(function(){
        newDamageshow.remove()
    },500)
}
function createRandomPickgun(times){
    for (let index = 0; index < times; index++){
        var x=randomnumber(75,bodyx-75)
        var y=randomnumber(75,bodyy-75)
        var randomgun=(randomnumber(1,typesofgun.length+1)-1)
        var type=typesofgun[randomgun][0]
        var mb=typesofgun[randomgun][1]
        var r=randomnumber(0,5)
        consolelog(randomgun)
        createPickgun(x,y,type,mb,mb,r)
    }
}
function randomnumber(min, max) {
    if (min==0&&max==1){
    return Math.round(Math.random())
    }else{
    return Math.floor(Math.random() * (max - min) ) + min;
    }}

function normalreload(slot,type,myidx){
var reloadtime
    if (type=="Riffle"){
        Rifflereload.load()
        Rifflereload.play()
        reloadtime=3500
    }else if (type=="rocket"){
        rocketreload.load()
        rocketreload.play()
        reloadtime=2500
    }
    setTimeout(function(){
        if (myidx==reloadidx){
    guns[slot][1]=guns[slot][2]
    guns[slot][3]=false
    if (mouse==true){
    mouseclick()
    }
}
},reloadtime)
}

function createExplosion(x,y,r){
    rocketsound.load()
rocketsound.play()
var newExplosion=document.createElement("div")
newExplosion=game.appendChild(newExplosion)
newExplosion.className="explosion"
newExplosion.style.left=x+"px"
newExplosion.style.top=y+"px"
if (enemys.length>0){
explosion=[x,y,r]
}

setTimeout(function(){
newExplosion.remove()
},500)
}

