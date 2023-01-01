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

let mq = window.matchMedia("(prefers-reduced-motion)");
if (!mq.matches) {
  changeColors();
}

mq.addEventListener("change", ({ matches }) => {
  intervals.clear();
  if (matches) changeColors();
});

function changeColors() {
  let r = document.querySelector(":root");
  let lDir = -0.1;
  let dDir = +0.1;
  intervals.hi = setInterval(() => {
    let h = +getComputedStyle(r).getPropertyValue("--h");
    r.style.setProperty("--h", (h + 1) % 360);
  }, 200);

  setTimeout(() => {
    intervals.li = setInterval(() => {
      let l = +getComputedStyle(r).getPropertyValue("--l").replace("%", "");
      let nextL = l + lDir;
      lDir = nextL < 85 ? 0.1 : nextL > 95 ? -0.1 : lDir;
      r.style.setProperty("--l", nextL + "%");
    }, 400);
  }, 100);

  setTimeout(() => {
    intervals.di = setInterval(() => {
      let d = +getComputedStyle(r).getPropertyValue("--d").replace("%", "");
      let nextD = d + dDir;
      dDir = nextD < 10 ? 0.1 : nextD > 20 ? -0.1 : dDir;

      r.style.setProperty("--d", nextD + "%");
    }, 400);
  }, 300);
}
