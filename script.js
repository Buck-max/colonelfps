async function loadVideos() {

  const response = await fetch("./data/videos.json");
  const videos = await response.json();

  const grid = document.getElementById("videoGrid");
  grid.innerHTML = "";

  videos.forEach(video => {

    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <iframe src="${video.embed}" allowfullscreen></iframe>
      <div class="video-content">
        <b>${video.title}</b>
        <p>${video.summary}</p>
      </div>
    `;

    grid.appendChild(card);
  });

  if (videos.length > 0) {
    document.getElementById("latestVideoBtn").href = videos[0].link;
  }

}

loadVideos();
