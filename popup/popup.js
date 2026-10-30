const [cTab]=await chrome.tabs.query({currentWindow:true,active:true});
const url=new URL(cTab.url);
const videoID=url.searchParams.get("v");
initialize();
const checkBox=document.getElementById("track");

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
}