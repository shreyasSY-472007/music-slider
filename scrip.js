let songs=["Song1","Song2","Song3","Song4"];

let current=0;

let songName=document.getElementById("songName");
let playBtn=document.getElementById("playBtn");

function updateSong(){
songName.innerText=songs[current];
}

function nextSong(){

if(current<songs.length-1){
current++;
}else{
current=0;
}

updateSong();
}

function prevSong(){

if(current>0){
current--;
}else{
current=songs.length-1;
}

updateSong();
}

function playPause(){

if(playBtn.innerText=="▶"){
playBtn.innerText="⏸";
}else{
playBtn.innerText="▶";
}

}
