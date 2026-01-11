let albums = [];


async function loadLibrary() {
    try {
        const response = await fetch('library.json');
        albums = await response.json();
        displayAlbums(albums);
    } catch (error) {
        console.error("Error loading JSON. Make sure you use Live Server!", error);
    }
}


function displayAlbums(data) {
    const grid = document.getElementById('albumGrid');
    grid.innerHTML = data.map((album, index) => {
       
        const originalIndex = albums.indexOf(album);
        return `
        <div class="col-12 col-sm-6 col-md-3 col-xl-2">
            <div class="card bg-dark text-white">
                <img src="${album.thumbnail}" class="card-img-top" alt="${album.album}">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title text-info">${album.artist}</h6>
                    <p class="card-text small flex-grow-1">${album.album}</p>
                    <button class="btn btn-outline-light btn-sm mt-auto" 
                            onclick="showTracks(${originalIndex})" 
                            data-bs-toggle="modal" 
                            data-bs-target="#tracklistModal">
                        View Tracklist
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}


document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = albums.filter(a => 
        a.artist.toLowerCase().includes(term) || a.album.toLowerCase().includes(term)
    );
    displayAlbums(filtered);
});


function sortAlbums(criteria) {
    if (criteria === 'artist') albums.sort((a, b) => a.artist.localeCompare(b.artist));
    else if (criteria === 'album') albums.sort((a, b) => a.album.localeCompare(b.album));
    else if (criteria === 'tracks') albums.sort((a, b) => b.tracks.length - a.tracks.length);
    displayAlbums(albums);
}


function showTracks(index) {
    const album = albums[index];
    document.getElementById('modalTitle').innerText = `${album.artist} - ${album.album}`;
    
   
    let totalMins = 0, totalSecs = 0;
    album.tracks.forEach(t => {
        const [m, s] = t.length.split(':').map(Number);
        totalMins += m; totalSecs += s;
    });
    totalMins += Math.floor(totalSecs / 60);
    totalSecs = totalSecs % 60;

    document.getElementById('modalStats').innerHTML = `
        <strong>Tracks:</strong> ${album.tracks.length} | 
        <strong>Total Length:</strong> ${totalMins}:${totalSecs.toString().padStart(2, '0')}
    `;

    const trackList = document.getElementById('trackList');
    trackList.innerHTML = album.tracks.map(track => `
        <li class="list-group-item bg-dark text-white d-flex justify-content-between">
            <a href="${track.url}" target="_blank" class="track-link">${track.title}</a>
            <span class="text-secondary">${track.length}</span>
        </li>
    `).join('');
}

loadLibrary();