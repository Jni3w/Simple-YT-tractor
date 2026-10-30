const APIKEY=await chrome.storage.local.get("apiKey");
chrome.runtime.onInstalled.addListener(async()=>{
    console.log("Installed");
    await chrome.alarms.create("update",{
        periodInMinutes: 24 * 60
    })
})

chrome.alarms.onAlarm.addListener(()=>{
    console.log("Updated");
    getData();
})

async function getData(videoID){
    const api="https://www.googleapis.com/youtube/v3/videos?id="+videoID+"&key="+APIKEY+"?part=statistics"
    try{
        const date=new Date().toISOString().split(T)[0];
        const response=await fetch(api);
        const data=response.json();
        const stat=data.items[0].statistics.viewCount;
        await chrome.storage.local.set({[videoID]: {statistic:{
            [date]:stat
        }}});
    }
    catch(e){
        console.error(e);
    }

}