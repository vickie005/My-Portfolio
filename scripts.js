const projectCards = document.querySelectorAll(".project-grid .card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.boxShadow = "0 0 25px #00ffffaa";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.2)";
  });
});

const secretCard = document.querySelector(".project-grid .card.secret a");

if (secretCard) {
  secretCard.addEventListener("click", (e) => {
    e.preventDefault();

    // overlay message
    const message = document.createElement("div");
    message.textContent = "🎉 Secret Unlocked! Redirecting...";
    message.style.position = "fixed";
    message.style.top = "40%";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.background = "#0ff";
    message.style.color = "#000";
    message.style.padding = "1rem 2rem";
    message.style.borderRadius = "15px";
    message.style.fontSize = "1.5rem";
    message.style.fontWeight = "bold";
    message.style.zIndex = "1000";
    message.style.opacity = "0";
    message.style.textAlign = "center";
    message.style.boxShadow = "0 0 20px #0ff";
    message.style.animation = "flashGlow 1.5s infinite";

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      message.style.opacity = "1";
      message.style.transform = "translateX(-50%) translateY(0)";
    }, 50);

    // Floating sparkles
    const sparkleInterval = setInterval(() => {
      const sparkle = document.createElement("div");
      sparkle.textContent = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = Math.random() * window.innerWidth + "px";
      sparkle.style.top = Math.random() * window.innerHeight + "px";
      sparkle.style.fontSize = Math.random() * 25 + 10 + "px";
      sparkle.style.opacity = 0.8;
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "999";
      document.body.appendChild(sparkle);

      // Animate sparkle falling
      let top = parseFloat(sparkle.style.top);
      const fall = setInterval(() => {
        top += 1 + Math.random() * 2;
        sparkle.style.top = top + "px";
        if (top > window.innerHeight) {
          sparkle.remove();
          clearInterval(fall);
        }
      }, 20);
    }, 150);

    setTimeout(() => {
      clearInterval(sparkleInterval); 
      window.location.href = secretCard.href;
    }, 1500);
  });
}

const style = document.createElement("style");
style.textContent = `
@keyframes flashGlow {
  0%, 100% { color: #0ff; text-shadow: 0 0 5px #0ff, 0 0 10px #0ff; transform: translateY(0); }
  25% { color: #fff; text-shadow: 0 0 10px #0ff, 0 0 20px #0ff; transform: translateY(-5px); }
  50% { color: #0ff; text-shadow: 0 0 15px #0ff, 0 0 25px #0ff; transform: translateY(0); }
  75% { color: #fff; text-shadow: 0 0 10px #0ff, 0 0 20px #0ff; transform: translateY(-5px); }
}`;
document.head.appendChild(style);

const contactForm = document.querySelector(".contact form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm
      .querySelector('textarea[name="message"]')
      .value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields before submitting!");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("⚠️ Please enter a valid email address!");
      return;
    }

    alert("✅ Thank you for contacting me! I will respond soon.");

    contactForm.reset();
  });
}
