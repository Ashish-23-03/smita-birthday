const PASSWORD = "smitaashish";

/* ---------------- 🔐 UNLOCK FLOW ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    const unlockBtn = document.getElementById("unlockBtn");

    unlockBtn.addEventListener("click", () => {
        const input = document.getElementById("passwordInput").value.trim();

        if (input === PASSWORD) {

            // play music after user interaction (mobile safe)
            const music = document.getElementById("bgMusic");
            music.play().catch(() => {});

            // go to intro
            document.getElementById("passwordScreen").classList.remove("active");
            document.getElementById("introScreen").classList.add("active");

            // then go to main
            setTimeout(() => {
                document.getElementById("introScreen").classList.remove("active");
                document.getElementById("mainContent").classList.add("active");

                startTyping();
                startSlideshow();
                startHearts();

            }, 2500);

        } else {
            document.getElementById("error").innerText = "Wrong password 😢";
        }
    });
});

/* ---------------- 💬 TYPING TEXT ---------------- */

const texts = [
    "Today is all about you Smita 💖",
    "You are the most beautiful girl ❤️",
    "You make my life magical ✨",
    "Happy Birthday My Love 🎂💖",
    "I Love You Forever ❤️💍"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function startTyping() {
    const el = document.getElementById("message");

    function typeLoop() {
        const current = texts[textIndex];

        if (!deleting) {
            el.innerText = current.substring(0, charIndex++);
            if (charIndex > current.length + 10) deleting = true;
        } else {
            el.innerText = current.substring(0, charIndex--);
            if (charIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(typeLoop, 50);
    }

    typeLoop();
}

/* ---------------- 📸 SLIDESHOW ---------------- */

const photos = [
    "photos/smita1.jpeg","photos/smita2.jpeg","photos/smita3.jpeg",
    "photos/smita4.jpeg","photos/smita5.jpeg","photos/smita6.jpeg",
    "photos/smita7.jpeg","photos/smita8.jpeg","photos/smita9.jpeg",
    "photos/smita10.jpeg","photos/smita11.jpeg","photos/smita12.jpeg",
    "photos/smita13.jpeg","photos/smita14.jpeg","photos/smita15.jpeg",
    "photos/smita16.jpeg","photos/smita17.jpeg"
];

let slideIndex = 0;

function startSlideshow() {
    const img = document.getElementById("slide");
    const bg = document.getElementById("photoBg");

    bg.style.backgroundImage = `url(${photos[0]})`;

    setInterval(() => {
        img.style.opacity = 0;

        setTimeout(() => {
            slideIndex = (slideIndex + 1) % photos.length;

            img.src = photos[slideIndex];
            bg.style.backgroundImage = `url(${photos[slideIndex]})`;

            img.style.opacity = 1;
        }, 400);

    }, 2500);
}

/* ---------------- 💌 LOVE LETTER ---------------- */

const letterText = `Smita...

You are the best thing that ever happened to me.
Every smile of yours is my happiness.
Every moment with you is magical.

I promise to stand with you in every situation,
to support you, to love you, forever.

Happy Birthday My Love ❤️
— Yours, Ashish 💖`;

function openLetter() {
    document.getElementById("mainContent").classList.remove("active");
    document.getElementById("letterPage").classList.add("active");

    const el = document.getElementById("letterText");
    let i = 0;

    function type() {
        el.innerText = letterText.substring(0, i++);
        if (i <= letterText.length) setTimeout(type, 30);
    }

    type();
}

function backToMain() {
    document.getElementById("letterPage").classList.remove("active");
    document.getElementById("proposalPage").classList.remove("active");
    document.getElementById("mainContent").classList.add("active");
}

/* ---------------- 💍 PROPOSAL ---------------- */

function openProposal() {
    document.getElementById("mainContent").classList.remove("active");
    document.getElementById("proposalPage").classList.add("active");
}

function yesForever() {
    document.getElementById("proposalPage").classList.remove("active");
    document.getElementById("surprisePage").classList.add("active");
    startFireworks();
}

/* ---------------- 🎆 FIREWORKS ---------------- */

function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function burst() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height / 2;

        for (let i = 0; i < 60; i++) {
            particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                life: 100
            });
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.dx;
            p.y += p.dy;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "pink";
            ctx.fill();

            if (p.life <= 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    setInterval(burst, 1200);
    animate();
}

/* ---------------- 💖 FLOATING HEARTS ---------------- */

function startHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.setProperty("--dur", (6 + Math.random() * 3) + "s");

        document.getElementById("hearts").appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }, 300);
}

/* ---------------- 🌙 THEME TOGGLE ---------------- */

let darkMode = true;

document.getElementById("themeToggle").addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.style.background = darkMode ? "#000" : "#ffe6f0";
});

/* ---------------- 🥚 EASTER EGG ---------------- */

let taps = 0;

document.body.addEventListener("click", () => {
    taps++;
    if (taps >= 5) {
        alert("I LOVE YOU SMITA ❤️ FOREVER");
        taps = 0;
    }
});
