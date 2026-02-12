document.addEventListener('DOMContentLoaded', () => {
    // Music Setup
    const loveSong = document.getElementById('love-song');
    const bgMusic = document.getElementById('bg-music');
    const disk = document.querySelector('.disk');

    // Ensure bgMusic volume is set
    bgMusic.volume = 0.3;

    window.toggleMusic = function () {
        if (loveSong.paused) {
            // User wants to play the dedicated song
            bgMusic.pause(); // Stop background music
            loveSong.volume = 0.8;
            loveSong.play();
            if (disk) disk.classList.add('playing');
        } else {
            // User wants to pause the dedicated song
            loveSong.pause();
            bgMusic.play(); // Resume background music
            if (disk) disk.classList.remove('playing');
        }
    };

    // Create Floating Hearts
    const heartsContainer = document.querySelector('.floating-hearts');
    for (let i = 0; i < 20; i++) {
        createHeart();
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heartsContainer.appendChild(heart);
    }

    // No Button Logic
    const noBtn = document.getElementById('no-btn');

    const moveNoButton = (e) => {
        if (e.type === 'touchstart') e.preventDefault();

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Calculate available space on screen
        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;

        // Generate random position
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // Move to body to avoid transform issues
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed'; // Must be fixed relative to viewport
        noBtn.style.left = Math.max(10, newX) + 'px';
        noBtn.style.top = Math.max(10, newY) + 'px';
        noBtn.style.zIndex = '9999'; // Ensure it's on top of everything
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

    // Global Functions for HTML
    window.nextSection = function (sectionId) {
        // Hide all active screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });

        // Show target screen
        const target = document.getElementById(sectionId);
        target.classList.remove('hidden');
        setTimeout(() => {
            target.classList.add('active');
        }, 10);

        // Attempt to play music on first interaction (Landing -> Proposal)
        // Only if loveSong is NOT playing, we try to play bgMusic
        if (sectionId === 'proposal' && bgMusic.paused && loveSong.paused) {
            bgMusic.play().catch(e => console.log("Audio autoplay prevented"));
        }
    };

    window.handleYesClick = function () {
        // Hide the moved no-button if it exists on body
        if (noBtn && noBtn.parentNode === document.body) {
            noBtn.style.display = 'none';
        }

        nextSection('gifts');
    };

    window.showGift = function (giftId) {
        nextSection(giftId);
    };
});
