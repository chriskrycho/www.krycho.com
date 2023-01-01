let intervals = {
  hi: null,
  li: null,
  di: null,

  clear() {
    clearInterval(this.hi);
    clearInterval(this.li);
    clearInterval(this.di);
  },
};

let themeColorMetaTags = document.querySelectorAll('meta[name="theme-color"]');

let mq = window.matchMedia("(prefers-reduced-motion)");
if (!mq.matches) {
  changeColors();
}

mq.addEventListener("change", ({ matches }) => {
  intervals.clear();
  if (matches) changeColors();
});

let r = document.querySelector(":root");

function changeColors() {
  let lDir = -0.1;
  let dDir = +0.1;
  intervals.hi = setInterval(() => {
    let h = +getComputedStyle(r).getPropertyValue("--h");
    r.style.setProperty("--h", (h + 1) % 360);
    setThemeColor();
  }, 200);

  setTimeout(() => {
    intervals.li = setInterval(() => {
      let l = +getComputedStyle(r).getPropertyValue("--l").replace("%", "");
      let nextL = l + lDir;
      lDir = nextL < 85 ? 0.1 : nextL > 95 ? -0.1 : lDir;
      r.style.setProperty("--l", nextL + "%");
      setThemeColor(r);
    }, 400);
  }, 100);

  setTimeout(() => {
    intervals.di = setInterval(() => {
      let d = +getComputedStyle(r).getPropertyValue("--d").replace("%", "");
      let nextD = d + dDir;
      dDir = nextD < 10 ? 0.1 : nextD > 20 ? -0.1 : dDir;

      r.style.setProperty("--d", nextD + "%");
      setThemeColor(r);
    }, 400);
  }, 300);
}

function setThemeColor() {
  let newStyle = getComputedStyle(r).backgroundColor;
  themeColorMetaTags.forEach((tag) => tag.setAttribute("content", newStyle));
}
