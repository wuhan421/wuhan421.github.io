const clock = document.querySelector("#clock");
const dateLabel = document.querySelector("#date");
const focusToggle = document.querySelector("#focus-toggle");
const navLinks = [...document.querySelectorAll(".desktop-nav a")];

function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" })
    .format(now)
    .toUpperCase();
  const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .map((value, index) => index === 0 ? value : String(value).padStart(2, "0"))
    .join(".");
  dateLabel.textContent = `${date} // ${weekday}`;
}

updateClock();
setInterval(updateClock, 1000);

focusToggle.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("focus-mode");
  focusToggle.textContent = enabled ? "返回界面" : "聚焦背景";
  focusToggle.setAttribute("aria-pressed", String(enabled));
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
  });
}, { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.35, 0.7] });

sections.forEach((section) => sectionObserver.observe(section));
