const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");
const stopBtn = document.getElementById("stopBtn");
const statusAuto = document.getElementById("statusAuto");

const beepSound = new Audio("beep.mp3");
const meoSound = new Audio("meo.mp3");

let autoSwap = null;

let demNguoc = 10;
let demNguocTg = null;
const timerDisplay = document.getElementById("timerDisplay");

function startCountdown() {
  if (demNguocTg) {
    clearInterval(demNguocTg);
    demNguocTg = null;
  }

  demNguoc = 5;
  timerDisplay.textContent = `Còn lại: ${demNguoc} giây`;

  demNguocTg = setInterval(() => {
    demNguoc--;
    timerDisplay.textContent = `Còn lại: ${demNguoc} giây`;
  }, 1000);
}

const Esp = "";
function setToEsp(path) {
  if (!Esp) {
    statusAuto.textContent = "Lỗi: Chưa cấu hình địa chỉ ESP";
    return;
  }
  statusAuto.textContent = "Trạng thái: Đang gửi lệnh...";
  fetch(`${Esp}/${path}`)
    .then((res) => {
      if (!res.ok) throw new Error("Không nhận được phản hồi từ ESP");
      return res.text();
    })
    .then(() => {
      statusAuto.textContent = `Trạng thái: Máy lạnh ${
        path === "on" ? "đã bật" : "đã tắt"
      }`;
      console.log("Đã gửi lệnh:", path);
    })
    .catch((error) => {
      statusAuto.textContent = `Lỗi: ${error.message}`;
      console.error("Lỗi gửi đến:", error);
    });
}
function setActive(button) {
  if (autoSwap) {
    clearTimeout(autoSwap);
    autoSwap = null;
  }

  if (button === "on") {
    onBtn.classList.add("active");
    offBtn.classList.remove("active");
    console.log("Bật");
    setToEsp("on");
  } else {
    offBtn.classList.add("active");
    onBtn.classList.remove("active");
    console.log("Tắt");
    setToEsp("off");
  }
  meoSound.play();
  autoSwap = setTimeout(() => {
    setActive(button === "on" ? "off" : "on");
  }, 5000);
  startCountdown(button === "on" ? "off" : "on");
}

onBtn.addEventListener("click", () => {
  setActive("on");
});
offBtn.addEventListener("click", () => {
  setActive("off");
});
stopBtn.addEventListener("click", () => {
  if (autoSwap) {
    clearTimeout(autoSwap);
    autoSwap = null;
    statusAuto.textContent = "Trạng thái: Đã dừng tự động";
    console.log("Đã dừng hoạt động");
  }
  if (demNguocTg) {
    clearInterval(demNguocTg);
    demNguocTg = null;
    timerDisplay.textContent = "Đã dừng bộ đếm";
  }
  beepSound.play();
  onBtn.classList.remove("active");
  offBtn.classList.remove("active");
});
//
function sendCommand(state) {
  const statusElement = document.getElementById("status");
  statusElement.textContent = "Trạng thái: Đang gửi lệnh...";
  meoSound.play();
  if (!Esp) {
    statusElement.textContent = "Lỗi: Chưa cấu hình địa chỉ ESP";
    return;
  }
  fetch(`${Esp}/${state}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Không nhận được phản hồi từ ESP");
      return response.text();
    })
    .then(() => {
      statusElement.textContent = `Trạng thái: Máy lạnh ${
        state === "on" ? "đã bật" : "đã tắt"
      }`;
    })
    .catch((error) => {
      statusElement.textContent = `Lỗi: ${error.message}`;
      console.error("Lỗi gửi đến:", error);
    });
}
