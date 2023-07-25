console.log("Welcome to Spotify")

//variable initialisation
songIndex=0;
let audioElement= new Audio('song1.mp3');
let masterPlay=document.getElementById('masterPlay');
let MyProgressBar=document.getElementById('MyProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Perfect", filePath:"song1.mp3",coverPath: "1.jpeg"},
    {songName:"Pal Pal Dill", filePath:"song2.mp3",coverPath: "2.jpg"},
    {songName:"Rozana", filePath:"song3.mp3",coverPath: "3.jpg"},
    {songName:"Pehli Nazar Mein", filePath:"song4.mp3",coverPath: "4.jpeg"},
    {songName:"Timber", filePath:"song5.mp3",coverPath: "5.jpeg"},
    {songName:"Candy Shop", filePath:"song6.mp3",coverPath: "6.jpeg"},
]

songItems.forEach((element, i )=> {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;   
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

});

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();  
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})
    
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    MyProgressBar.value=progress;

})
MyProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=MyProgressBar.value*audioElement.duration/100;
})

const makeAllPlay=()=>{                //will make all songs into play/pause icon
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0)
        {
            makeAllPlay();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src=`song${songIndex+1}.mp3`;
            masterSongName.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            makeAllPlay();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.src=`song${songIndex+1}.mp3`;
            masterSongName.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.pause();
            gif.style.opacity=0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }

    })
}) 

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})