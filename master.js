const themeIcon = document.querySelector(".theme-icon");
const extensionsList = document.querySelectorAll(".extensions-list button");
const noExtensionsMsg = document.querySelector(".no-extensions-msg");
const allExtensions = document.getElementsByClassName("box");
const extensionsImgs = document.querySelectorAll(".box .logo-extension");
const extensionsName = document.querySelectorAll(".box .name");
const extensionsDesc = document.querySelectorAll(".box .desc");
const removeBtn = document.querySelectorAll(".box .remove-btn");
const activeBtn = document.querySelectorAll(".box .active-btn");
const activeBtnActivation = document.getElementsByClassName("active-btn active");

// Get Extensions Data
fetch("data.json")
  .then((res) => res.json())
  .then((extensionsData) => {
    for (let i = 0; i < extensionsData.length; i++) {
      extensionsImgs[i].src = extensionsData[i].logo;
      extensionsName[i].textContent = extensionsData[i].name;
      extensionsDesc[i].textContent = extensionsData[i].description;

      extensionsData[i].isActive ? activeBtn[i].classList.add("active") : "";
    }
  });

themeIcon.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

removeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".box").remove();

    if (allExtensions.length === 0) {
      noExtensionsMsg.classList.remove("hidden");

      if (
        document
          .querySelector(".extensions-list button.activation")
          .classList.contains("active")
      ) {
        noExtensionsMsg.textContent = "No Active Extensions";
      } else if (
        document
          .querySelector(".extensions-list button.inactive")
          .classList.contains("active")
      ) {
        noExtensionsMsg.textContent = "No Inactive Extensions";
      }
    }
  });
});

activeBtn.forEach((btn) => {
  btn.addEventListener("click", () => btn.classList.toggle("active"));
});

extensionsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    extensionsList.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");

    // show active only
    if (e.target.classList.contains("activation")) {
      activeBtn.forEach((btn) => {
        btn.closest(".box").classList.remove("hidden");
        !btn.classList.contains("active")
          ? btn.closest(".box").classList.add("hidden")
          : "";
      });

      if (activeBtnActivation.length === 0) {
        noExtensionsMsg.classList.remove("hidden");
        noExtensionsMsg.textContent = "No Active Extensions";
      } else {
        noExtensionsMsg.classList.add("hidden");
      }
    }

    // show inactive only
    else if (e.target.classList.contains("inactive")) {
      activeBtn.forEach((btn) => {
        btn.closest(".box").classList.remove("hidden");
        btn.classList.contains("active")
          ? btn.closest(".box").classList.add("hidden")
          : "";
      });

      noExtensionsMsg.classList.add("hidden");
      if (document.querySelectorAll(".active-btn:not(.active)").length === 0) {
        noExtensionsMsg.classList.remove("hidden");
        noExtensionsMsg.textContent = "No Inactive Extensions";
      }
    }
    //show all
    else {
      //
      if (allExtensions.length === 0) {
        noExtensionsMsg.classList.remove("hidden");
        noExtensionsMsg.textContent = "No Extensions Yet";
      } else {
        noExtensionsMsg.classList.add("hidden");
      }
      activeBtn.forEach((btn) =>
        btn.closest(".box").classList.remove("hidden")
      );
    }
  });
});

// Interactivity
/*
[4] elements:
  1- theme mode dark/light
  2- extensions list active/inactive
  3- remove exten btn
  4- activation exten btn
*/
