const body = document.body;
const themeIcon = document.querySelector(".theme-icon");
const logoImgLight = document.querySelector(".logo .logo-light");
const logoImgDark = document.querySelector(".logo .logo-dark");
const extensionsList = document.querySelectorAll(".extensions-list button");
const emptyExtensionsMsg = document.querySelector(".empty-extensions-msg");
const extensions = document.getElementsByClassName("extension");
const extensionsImgs = document.querySelectorAll(".extension .logo-extension");
const extensionsName = document.querySelectorAll(".extension .name");
const extensionsDesc = document.querySelectorAll(".extension .desc");
const runBtns = document.querySelectorAll(".extension .run-btn");
const runBtnsActive = document.getElementsByClassName("run-btn active");
const runBtnsNotActive = document.getElementsByClassName("run-btn not-active");
const removeBtns = document.querySelectorAll(".extension .remove-btn");

// Get Extensions Data
fetch("data.json")
  .then((res) => res.json())
  .then((extensionsData) => {
    for (let i = 0; i < extensionsData.length; i++) {
      extensionsImgs[i].src = extensionsData[i].logo;
      extensionsName[i].textContent = extensionsData[i].name;
      extensionsDesc[i].textContent = extensionsData[i].description;

      extensionsData[i].isActive
        ? runBtns[i].classList.add("active")
        : runBtns[i].classList.add("not-active");
    }
  });

setTimeout(() => {
  for (let e of extensions)
    e.style.cssText = `opacity: 1; transform: translateY(0)`;
}, 150);

themeIcon.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    logoImgLight.classList.remove("hidden");
    logoImgDark.classList.add("hidden");
  } else {
    logoImgDark.classList.remove("hidden");
    logoImgLight.classList.add("hidden");
  }
});

function showAndChangeEmptyMsg(newText) {
  emptyExtensionsMsg.classList.remove("hidden");
  emptyExtensionsMsg.textContent = newText;
}

function filterExtensions(statusExtensions) {
  for (let e of extensions) e.classList.remove("hidden");
  function loopOnRunBtns(element) {
    for (let btn of element) btn.closest(".extension").classList.add("hidden");
  }
  if (statusExtensions === "active") loopOnRunBtns(runBtnsNotActive);
  else if (statusExtensions === "inactive") loopOnRunBtns(runBtnsActive);
}

removeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".extension").remove();

    extensionsList.forEach((e) => {
      if (
        e.classList.contains("activation") &&
        e.classList.contains("active") &&
        runBtnsActive.length === 0
      ) {
        showAndChangeEmptyMsg("No Active Extensions");
      } else if (
        e.classList.contains("inactive") &&
        e.classList.contains("active") &&
        runBtnsNotActive.length === 0
      ) {
        showAndChangeEmptyMsg("No Inactive Extensions");
      } else {
        extensions.length === 0
          ? showAndChangeEmptyMsg("No Extensions Yet")
          : "";
      }
    });
  });
});

runBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      btn.classList.add("not-active");
    } else {
      btn.classList.remove("not-active");
      btn.classList.add("active");
    }
  })
);

extensionsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    extensionsList.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");

    if (e.target.classList.contains("activation")) {
      emptyExtensionsMsg.classList.add("hidden");
      filterExtensions("active");
      runBtnsActive.length === 0
        ? showAndChangeEmptyMsg("No Active Extensions")
        : "";
    } else if (e.target.classList.contains("inactive")) {
      emptyExtensionsMsg.classList.add("hidden");
      filterExtensions("inactive");
      runBtnsNotActive.length === 0
        ? showAndChangeEmptyMsg("No Inactive Extensions")
        : "";
    } else {
      for (let e of extensions) e.classList.remove("hidden");
      extensions.length === 0
        ? showAndChangeEmptyMsg("No Extensions Yet")
        : emptyExtensionsMsg.classList.add("hidden");
    }
  });
});
