// 데이터 가져오기
import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// header dropdown (장바구니)
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", (e) => {
  e.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (e) => {
  e.stopPropagation();
});
window.addEventListener("click", () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

// header dropdown (검색)
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll(".menu > li")];
const serchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = serchWrapEl.querySelector(".search-closer");
const searchShadowEl = serchWrapEl.querySelector(".shadow");
const searchInputEl = serchWrapEl.querySelector("input");
const searchDelayEls = [...serchWrapEl.querySelectorAll("li")];
searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

// 요소가 화면에 보이는지 확인하는 코드
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
const infoEl = document.querySelectorAll(".info");
infoEl.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생
// play, pause 메소드는 비디오 태그에서 사용할 수 있는 자바스크립트 메소드
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".controller--play");
const pauseBtn = document.querySelector(".controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// compare section html렌더링

const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  let colorList = ``;
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color:${color};"></li>`;
  });
  itemEl.innerHTML = /* html */ `
  <div class=tunmbnail>
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">
  ₩${ipad.price.toLocaleString("en-US")}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>

  `;

  itemsEl.append(itemEl);
});

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /*html */ `
    <li>
    <a href="${map.url}"">${map.name}</a>
    </li>`;
  });
  mapEl.innerHTML = /*html*/ `
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `;

  navigationsEl.append(mapEl);
});

// footer
const thisYearEl = document.querySelector("span.this-year");
console.log(thisYearEl);
thisYearEl.textContent = new Date().getFullYear();
