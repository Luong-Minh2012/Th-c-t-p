const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");
const stopBtn = document.getElementById("stopBtn");

let autoSwap = null;
// const Esp = "";
// function setToEsp(path) {
//   fetch(`${Esp}/${path}`)
//     .then((res) => console.log("Đã gửi lệnh: ", path))
//     .catch((error) => console.error("Lỗi gửi đến: ", error));
// }
function setActive(button) {
  if (autoSwap) {
    clearTimeout(autoSwap);
    autoSwap = null;
  }

  if (button === "on") {
    onBtn.classList.add("active");
    offBtn.classList.remove("active");
    console.log("Bật");
    // setToEsp("on");
  } else {
    offBtn.classList.add("active");
    onBtn.classList.remove("active");
    console.log("Tắt");
    // setToEsp("off");
  }
  autoSwap = setTimeout(() => {
    setActive(button === "on" ? "off" : "on");
  }, 5000);
}

onBtn.addEventListener("click", () => setActive("on"));
offBtn.addEventListener("click", () => setActive("off"));
stopBtn.addEventListener("click", () => {
  if (autoSwap) {
    clearTimeout(autoSwap);
    autoSwap = null;
    console.log("Đã dừng hoạt động");
  }
  onBtn.classList.remove("active");
  offBtn.classList.remove("active");
});
