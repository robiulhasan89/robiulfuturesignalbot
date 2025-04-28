// script.js

// Login System
const loginForm = document.getElementById('login-form');
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const loader = document.getElementById('loader');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "UDTROBIUL" && password === "UDT89R") {
        loginPage.style.display = "none";
        loader.style.display = "flex";

        setTimeout(() => {
            loader.style.display = "none";
            mainPage.style.display = "block";
        }, 2000);

        playClickSound();
    } else {
        alert("Invalid Username or Password!");
    }
});

// Play sound when clicking
const clickSound = document.getElementById('click-sound');

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

// Signal Generator
const generateBtn = document.getElementById('generate-signals');
const signalList = document.getElementById('signal-list');
const animationMessage = document.querySelector('.animation-message');

const assets = [
    "EUR/JPY", "EUR/USD", "USD/JPY", "EUR/GBP",
    "USD/EGP (OTC)", "BRL/USD (OTC)", "USD/TRY (OTC)",
    "USD/PKR (OTC)", "USD/PHP (OTC)", "USD/INR (OTC)",
    "USD/ARS (OTC)", "USD/MXN (OTC)", "NZD/JPY (OTC)",
    "USD/DZD (OTC)", "USD/BDT (OTC)", "Bitcoin (OTC)",
    "FACEBOOK INC (OTC)", "Microsoft (OTC)"
];

generateBtn.addEventListener('click', function () {
    playClickSound();
    
    const asset = document.getElementById('asset-select').value;
    const signalCount = parseInt(document.getElementById('signal-count').value);
    const filter = document.getElementById('filter-select').value;
    const backtestFilter = document.getElementById('backtest-filter').checked;

    signalList.innerHTML = "";

    let currentTime = new Date();
    
    // Adjust to UTC+6 (Bangladesh Time)
    currentTime.setHours(currentTime.getUTCHours() + 6);

    for (let i = 0; i < signalCount; i++) {
        let time = formatTime(currentTime);
        let direction = Math.random() > 0.5 ? "UP" : "DOWN";

        if (filter !== "ALL") {
            direction = filter;
        }

        let signalText = `${asset} ➔ ${direction} ➔ ${time}`;

        const li = document.createElement('div');
        li.className = "signal-item";
        li.textContent = signalText;
        signalList.appendChild(li);

        // Add 5 minutes for next signal
        currentTime.setMinutes(currentTime.getMinutes() + 5);
    }

    showSuccessAnimation();
});

// Updated 24-hour format Time Function
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function showSuccessAnimation() {
    animationMessage.classList.add('show');
    setTimeout(() => {
        animationMessage.classList.remove('show');
    }, 2000);
}

// Live Clock
function updateClock() {
    const clock = document.getElementById('live-clock');
    if (clock) {
        const now = new Date();
        now.setHours(now.getUTCHours() + 6); // BD Time UTC+6
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

setInterval(updateClock, 1000);
