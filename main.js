// Hiệu ứng hoa gốc + các bước tương tác của món quà
window.addEventListener("load", () => {
  setTimeout(() => document.body.classList.remove("not-loaded"), 700);
});
const screens = ["welcomeScreen", "surpriseScreen", "letterScreen", "inviteScreen"];
function showScreen(id) {
  screens.forEach(screenId => {
    document.getElementById(screenId).classList.toggle("is-active", screenId === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.getElementById("startBtn").addEventListener("click", () => showScreen("surpriseScreen"));
const giftTiles = [...document.querySelectorAll(".gift-tile")];
const progressHint = document.getElementById("progressHint");
const toLetterBtn = document.getElementById("toLetterBtn");
giftTiles.forEach(tile => {
  tile.addEventListener("click", () => {
    tile.classList.add("is-open");
    tile.setAttribute("aria-expanded", "true");
    const opened = giftTiles.filter(item => item.classList.contains("is-open")).length;
    progressHint.textContent = opened === 3
      ? "Chị đã mở hết quà rồi. Có một điều em muốn nói riêng với chị ♡"
      : `Chị đã mở ${opened}/3 món quà. Còn một chút bất ngờ nữa nha ♡`;
    toLetterBtn.disabled = opened !== 3;
  });
});
toLetterBtn.addEventListener("click", () => showScreen("letterScreen"));
document.getElementById("openLetterBtn").addEventListener("click", () => {
  document.getElementById("letterPaper").hidden = false;
  document.getElementById("openLetterBtn").hidden = true;
  document.getElementById("toInviteBtn").hidden = false;
});
document.getElementById("toInviteBtn").addEventListener("click", () => showScreen("inviteScreen"));
document.getElementById("yesBtn").addEventListener("click", () => {
  document.getElementById("finalMessage").textContent = "Vậy chủ nhật mình có hẹn nhé! Em mong đến ngày ấy quá. ♡";
  document.getElementById("yesBtn").textContent = "Đã nhận lời hẹn 💗";
});
document.getElementById("thinkBtn").addEventListener("click", () => {
  document.getElementById("finalMessage").textContent = "Hong sao đâu. Chỉ cần là chị, thì dù ngày nào, em cũng luôn sẵn lòng. 🌷";
});
document.getElementById("restartBtn").addEventListener("click", () => {
  giftTiles.forEach(tile => { tile.classList.remove("is-open"); tile.setAttribute("aria-expanded", "false"); });
  progressHint.textContent = "Chị mở cả 3 món quà nha ♡";
  toLetterBtn.disabled = true;
  document.getElementById("letterPaper").hidden = true;
  document.getElementById("openLetterBtn").hidden = false;
  document.getElementById("toInviteBtn").hidden = true;
  document.getElementById("finalMessage").textContent = "";
  document.getElementById("yesBtn").textContent = "Chị đồng ý";
  showScreen("welcomeScreen");
});
