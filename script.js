document.addEventListener("DOMContentLoaded", () => {
  console.log("Landing Apex Safety carregada com sucesso.");
});

function copyEmail() {
  const email = document.getElementById("email-text").innerText;
  const feedback = document.getElementById("copy-feedback");

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  feedback.style.opacity = "1";

  setTimeout(() => {
    feedback.style.opacity = "0";
  }, 2000);
}