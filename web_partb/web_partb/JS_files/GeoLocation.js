var widthLine;
var heightLine;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        console.log("location is supported");

    } else {
        console.log("location not support");
    }
}

function showPosition(position) {
    widthLine = position.coords.latitude;
    heightLine = position.coords.longitude;
    console.log("location- width: " + widthLine + " height: " + heightLine);
}

function showError(error) {
    if (error.code == error.PERMISSION_DENIED) {
        alert("If you want to find house worker close to your location,\nPlease Refresh the page and allow location");
        console.log("location request denied");
    }
}

getLocation()
