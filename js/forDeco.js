const search_start = document.querySelector(".search_start");
const search_space = document.querySelector(".search_space");
const material_icons = document.querySelector(".material-icons");
const header_contents = document.querySelector(".header_contents");

header_contents.addEventListener("click", function () {
  location.reload();
});

search_start.addEventListener("click", function () {
  material_icons.className = "material-icons fadeOut";
  setTimeout(function () {
    material_icons.style.display = "none";
    search_space.className = "flex search_space";
  }, 800); // 1000 밀리초 = 1초
});
