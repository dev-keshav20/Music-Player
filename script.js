
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");
    const audioPlayer = document.getElementById("audioPlayer");
    const historyDiv = document.getElementById("history");

    const nowPlayingCard = document.getElementById("nowPlayingCard");
    const nowPlayingImg = document.getElementById("nowPlayingImg");
    const nowPlayingTitle = document.getElementById("nowPlayingTitle");
    const nowPlayingArtist = document.getElementById("nowPlayingArtist");

    searchInput.addEventListener("input", async function () {
      const query = this.value;
      if (query.length < 3) {
        resultsDiv.innerHTML = "";
        return;
      }

      const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aa3f5ea17amsh48340c3eadc51f5p12b1cfjsncb91abdf0ea5',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      });

      const data = await res.json();
      resultsDiv.innerHTML = "";

      data.data.slice(0, 5).forEach(track => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerHTML = `
          <img src="${track.album.cover_small}" alt="cover">
          <div>
            <div><strong>${track.title}</strong></div>
            <div>${track.artist.name}</div>
          </div>
        `;
        div.onclick = () => {
          playSong(track);
        };
        resultsDiv.appendChild(div);
      });
    });

    function playSong(track) {
      audioPlayer.src = track.preview;
      audioPlayer.play();

      nowPlayingImg.src = track.album.cover_medium;
      nowPlayingTitle.textContent = track.title;
      nowPlayingArtist.textContent = track.artist.name;
      nowPlayingCard.style.display = "flex";

      addToHistory(track);
    }

    function addToHistory(track) {
      const div = document.createElement("div");
      div.className = "history-item";
      div.innerHTML = `
        <img src="${track.album.cover_small}" alt="cover">
        <div>
          <strong>${track.title}</strong><br>
          <span>${track.artist.name}</span>
        </div>
      `;
      div.onclick = () => playSong(track);
      historyDiv.prepend(div);
    }
 