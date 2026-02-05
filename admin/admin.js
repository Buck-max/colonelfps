const GITHUB_TOKEN = "";
const REPO_OWNER = "Buck-max";
const REPO_NAME = "colonelfps";
const FILE_PATH = "data/videos.json";

function convertShortsToEmbed(shortsLink) {
  const id = shortsLink.split("/shorts/")[1];
  return `https://www.youtube.com/embed/${id}`;
}

async function addVideo() {

  const shortsLink = document.getElementById("shorts").value;

  const newVideo = {
    title: document.getElementById("title").value,
    embed: convertShortsToEmbed(shortsLink),
    link: shortsLink,
    summary: document.getElementById("summary").value
  };

  const fileData = await fetchFile();

  const decoded = atob(fileData.content.replace(/\n/g, ""));
  const videos = JSON.parse(decoded);

  videos.unshift(newVideo);

  await updateFile(videos, fileData.sha);

  alert("Video Added!");
}

async function fetchFile() {

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    }
  );

  return res.json();
}

async function updateFile(videos, sha) {

  const content = btoa(JSON.stringify(videos, null, 2));

  await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update videos",
        content,
        sha
      })
    }
  );
}
