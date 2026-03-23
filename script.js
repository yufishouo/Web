let timeLeft = 15;
const totalTime = 15;
const statusTextElement = document.querySelector('.status-box p');
const progressElement = document.getElementById('progress');

function startTimer() {
    timeLeft = totalTime;
    statusTextElement.innerHTML = `將在 <span id="countdown">${timeLeft}</span> 秒後自動重試`;
    
    progressElement.style.transition = 'none';
    progressElement.style.width = '0%';
    
    // 強制重繪以套用 0% (避免動畫回彈)
    void progressElement.offsetWidth;
    progressElement.style.transition = 'width 1s linear';

    const timer = setInterval(() => {
        timeLeft--;
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.textContent = timeLeft;
        }
        
        const percentage = ((totalTime - Math.max(0, timeLeft)) / totalTime) * 100;
        progressElement.style.width = percentage + '%';

        if (timeLeft <= 0) {
            clearInterval(timer);
            statusTextElement.innerHTML = "正在為您連線至 Berriz 伺服器...";
            
            // 模擬連線失敗等待，隨後無縫重新倒數
            setTimeout(() => {
                startTimer();
            }, 2000);
        }
    }, 1000);
}

startTimer();

// 音效控制邏輯
const unmuteBtn = document.getElementById('unmute-btn');
const bgVideo = document.querySelector('.fullscreen-bg-video');

if (unmuteBtn && bgVideo) {
    unmuteBtn.addEventListener('click', () => {
        if (bgVideo.muted) {
            bgVideo.muted = false;
            unmuteBtn.textContent = '🔊 關閉音效';
            unmuteBtn.title = '關閉聲音';
        } else {
            bgVideo.muted = true;
            unmuteBtn.textContent = '🔇 點擊開啟音效';
            unmuteBtn.title = '開啟聲音';
        }
    });
}