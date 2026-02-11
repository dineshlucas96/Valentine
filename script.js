document.addEventListener('DOMContentLoaded', () => {
    // Music Setup
    const music = document.getElementById('bg-music');
    const disk = document.querySelector('.disk');
    let isPlaying = false;

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
    noBtn.addEventListener('click', moveNoButton); // Just in case they catch it

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
        // Small timeout to allow CSS transition if needed, but 'active' class triggers animation
        setTimeout(() => {
            target.classList.add('active');
        }, 10);

        // Attempt to play music on first interaction (Landing -> Proposal)
        if (sectionId === 'proposal' && music.paused) {
            music.volume = 0.3;
            music.play().catch(e => console.log("Audio autoplay prevented"));
            isPlaying = true;
            if (disk) disk.classList.add('playing');
        }
    };

    window.handleYesClick = function () {
        // Hide the moved no-button if it exists on body
        if (noBtn && noBtn.parentNode === document.body) {
            noBtn.style.display = 'none';
        }

        nextSection('gifts');
        // Optional: Trigger confetti here if desired
    };

    window.showGift = function (giftId) {
        nextSection(giftId);
    };

    window.toggleMusic = function () {
        if (isPlaying) {
            music.pause();
            disk.classList.remove('playing');
        } else {
            music.play();
            disk.classList.add('playing');
        }
        isPlaying = !isPlaying;
    };
});
