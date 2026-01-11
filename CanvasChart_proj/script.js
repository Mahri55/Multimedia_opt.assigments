const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');
let dataPoints = [];
let isPaused = false;
let updateInterval = 1000;
let timer;


let dataPoints2 = []; 

function init() {
  
    for (let i = 0; i < 45; i++) {
        dataPoints.push(Math.random() * canvas.height);
        dataPoints2.push(Math.random() * canvas.height);
    }
    startTimer();
}

function drawGrid() {
    if (!document.getElementById('gridToggle').checked) return;
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    
    for (let x = 0; x <= canvas.width; x += 150) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

   
    for (let y = 0; y <= canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawLine(data, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4; 
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    
    if (data.length < 2) return;

  
    ctx.moveTo(0, canvas.height - data[0]);

    for (let i = 0; i < data.length - 1; i++) {
        const x1 = i * 20;
        const y1 = canvas.height - data[i];
        const x2 = (i + 1) * 20;
        const y2 = canvas.height - data[i + 1];

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;


        ctx.quadraticCurveTo(x1, y1, midX, midY);
    }
    
    ctx.stroke();
}

function updateData() {
    if (isPaused) return;

    dataPoints.shift();
    dataPoints.push(Math.random() * canvas.height);
    
    dataPoints2.shift();
    dataPoints2.push(Math.random() * canvas.height);

    render();
    updateStats();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawLine(dataPoints, 'green'); 
    drawLine(dataPoints2, 'blue'); 
}


document.getElementById('toggleAnim').onclick = (e) => {
    isPaused = !isPaused;
    e.target.innerText = isPaused ? 'Resume' : 'Pause';
};

document.getElementById('downloadBtn').onclick = () => {
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
};

document.getElementById('speedRange').oninput = (e) => {
    updateInterval = e.target.value;
    clearInterval(timer);
    startTimer();
};

function startTimer() {
    timer = setInterval(updateData, updateInterval);
}

function updateStats() {
    const avg = dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length;
    document.getElementById('avgVal').innerText = avg.toFixed(2);
    
    const trend = dataPoints[dataPoints.length - 1] > dataPoints[dataPoints.length - 2] ? 'Rising ↑' : 'Falling ↓';
    document.getElementById('trendInd').innerText = trend;
}

init();