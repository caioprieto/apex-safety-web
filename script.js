document.addEventListener("DOMContentLoaded", () => {
  console.log("Landing Apex Safety carregada com sucesso.");
});

function copyEmail() {
  const email = document.getElementById("email-text").innerText;

  navigator.clipboard.writeText(email);

  const feedback = document.getElementById("copy-feedback");
  feedback.style.opacity = "1";

  setTimeout(() => {
    feedback.style.opacity = "0";
  }, 2000);
}