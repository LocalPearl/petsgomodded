document.addEventListener("DOMContentLoaded", function() {
    const debugMode = false;
    let debugCounter = 3000;

    const countdownInterval = setInterval(updateCountdown, 1000);

    const colors = ['#9142ff', '#2aff54', '#ffde37', '#ff3737', '#4385ff'];
    const confettiContainer = document.querySelector('.confetti-container');

    const targetDate = new Date(Date.UTC(2025, 4, 4, 4, 0, 0));

    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }

    function createConfetti(animationDelay) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = animationDelay ? 0 : Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);

        confetti.addEventListener('animationiteration', () => {
            confetti.remove();
        });
    }

    function updateSiteTitle(countdown) {
        document.title = `${countdown} | PETS GO!`;
    }

    function updateCountdown() {
        let initialTimeRemaining = debugMode ? debugCounter : targetDate.getTime() - new Date().getTime();
        if (debugMode) {
            debugCounter -= 1000;
        }

        if (initialTimeRemaining <= 0) {
            go();
        } else {
            const days = padNumber(Math.floor(initialTimeRemaining / (1000 * 60 * 60 * 24)));
            const hours = padNumber(Math.floor((initialTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const minutes = padNumber(Math.floor((initialTimeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
            const seconds = padNumber(Math.floor((initialTimeRemaining % (1000 * 60)) / 1000));

            let countdown = '';
            if (days > 0) {
                countdown += `${days}d `;
            }
            if (hours > 0 || days > 0) {
                countdown += `${hours}h `;
            }
            if (minutes > 0 || hours > 0 || days > 0) {
                countdown += `${minutes}m `;
            }
            countdown += `${seconds}s`;

            document.getElementById('ddhhmmss').textContent = `${countdown}`;
            updateSiteTitle(countdown);
        }
    }

    // for all you script kiddies out there
    window.go = function() {
        if (countdownInterval)
            clearInterval(countdownInterval);
        document.getElementById('ddhhmmss').style.display = 'none';
        document.getElementById('play-now').style.display = 'block';
        document.querySelector("#favorite > a").textContent = "🎉 Play! 🎉";
        document.querySelector("#favorite > a").style.color = '#2B2B2B';
        for (let i = 0; i < 150; i++) {
            createConfetti(0);
        }
        setInterval(createConfetti, 20);
    }

    updateCountdown();

    const catImage = document.getElementById('cat-image');
    setInterval(function() {
        catImage.classList.add('bob');
        setTimeout(function() {
            catImage.classList.remove('bob');
        }, 1000);
    }, 3000);
});

// Safari hack
const resizer = () => {
    document.querySelector('body').style.height = window.innerHeight + "px";
}
window.addEventListener("resize", (_e) => resizer());
document.addEventListener("DOMContentLoaded", (_e) => resizer());
