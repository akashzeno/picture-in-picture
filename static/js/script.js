const videoElement = document.getElementById("video");
const buttonStart = document.getElementById("buttonStart");
const buttonSelect = document.getElementById("buttonSelect");

// Prompt to select media stream , pass to video element, then play
async function selectMediaStream() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    }
    catch(error){
        //Catch Error Here
    }
}

buttonStart.addEventListener("click", async ()=>{
    try{
    // Disable Button
    buttonStart.disable = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Enable Button
    buttonStart.disable = false;
    }
    catch(error){
        //Catch Error Here
        if (error.message.search("not a function") > -1){
        alert("Your browser does not support Picture in Picture, Please use Chrome or Safari");
        }
        else if (error.message.search("not loaded yet") > -1){
        alert("Please select a media stream first");
        }
    }
});

buttonSelect.addEventListener("click", selectMediaStream);
