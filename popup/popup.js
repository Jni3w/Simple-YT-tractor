const [cTab]=await chrome.tabs.query({currentWindow:true,active:true});
const url=new URL(cTab.url);
const videoID=url.searchParams.get("v");
const checkBox=document.getElementById("track");
const key=document.getElementById("apiKey");
const bttn=document.getElementById("submit");
const display=document.getElementById("display");
initialize();

bttn.addEventListener("click",async ()=>{
    await chrome.storage.local.set({apiKey:key.value});
})

display.addEventListener("click",async ()=>{
    const cont=await chrome.storage.local.get("statistic");
    console.log(JSON.stringify(cont));
})

checkBox.addEventListener("input",async ()=>{
    const state=checkBox.checked;
    await chrome.storage.local.set({[videoID]: {isEnabled:state}});
})

async function initialize(){
    if (url.hostname !== "www.youtube.com"){
        checkBox.disabled=true;
        return;
    }
    checkBox.checked=await chrome.storage.local.get(videoID).isEnabled ?? false;
    key.value=await chrome.chrome.storage.local.get("apiKey") ?? "";
}