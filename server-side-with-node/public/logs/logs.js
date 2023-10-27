const getData = async () => {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);
  for (item of data) {
    const root = document.createElement("div");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");
    const dateString = new Date(item.timestamp).toLocaleDateString();

    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `geo: ${item.lat}, ${item.long}`;
    date.textContent = dateString;
    image.src = item.image64;
    image.alt = item.mood;

    root.append(mood, geo, date, image);
    document.body.append(root);
  }
};

getData();
