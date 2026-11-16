let tab;
let url;
let videoID;
const track=document.getElementById("track");
const apiKey=document.getElementById("apiKey");
const submit=document.getElementById("submit");
const display=document.getElementById("display");
const clear=document.getElementById("clear");
main();

async function main(){
    await initialize();
    submit.addEventListener("click",async ()=>{
        await chrome.storage.local.set({apiKey:key.value});
    })

    display.addEventListener("click",async ()=>{
        const cont=await chrome.storage.local.get("statistic");
        console.log(JSON.stringify(cont));
    })

    track.addEventListener("input",async ()=>{
        const state=track.checked;
        await chrome.storage.local.set({[videoID]: {isEnabled:state}});
        let videoList=await chrome.storage.local.get("videoList") ?? "";
        videoList.push(videoID);
        await chrome.storage.local.set({videoList: videoList});
    })

    clear.addEventListener("click",async ()=>{
        await chrome.storage.local.clear();
    })
}


async function initialize(){
    try{
        tab=await chrome.tabs.query({currentWindow:true,active:true});
        console.log(tab[0].url);
        url=new URL(tab[0].url);
        videoID=url.searchParams.get("v");
        if (url.hostname!="www.youtube.com"){
            track.disabled=true;
            return;
        }
        track.checked=await chrome.storage.local.get(videoID).isEnabled ?? false;
        key.value=await chrome.chrome.storage.local.get("apiKey") ?? "";
    }
    catch(e){
        console.error(e);
    }
    
}