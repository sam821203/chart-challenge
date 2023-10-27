// const success = (pos) => {
//   const lat = pos.coords.latitude;
//   const long = pos.coords.longitude;
//   const data = { lat, long };

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   document.getElementById("latitude").textContent = lat.toFixed(2);
//   document.getElementById("longitude").textContent = long.toFixed(2);

//   fetch("/api", options);
// };

// const error = (err) => {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// };

function setup() {
  noCanvas();
  const video = createCapture();
  video.size(240, 180);

  if ("geolocation" in navigator) {
    const myBtn = document.querySelector("button");

    myBtn.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        const mood = document.querySelector("input").value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { lat, long, mood, image64 };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        document.getElementById("latitude").textContent = lat.toFixed(2);
        document.getElementById("longitude").textContent = long.toFixed(2);

        const response = await fetch("/api", options);
        const responseData = await response.json();
        console.log(responseData);
      });
    });
  } else {
    console.log("geolocation not available");
  }
}
