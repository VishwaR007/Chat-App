const socket = io();
const mainContainer = document.querySelector(".mainContainer");

// Global Vars :
let presentEmail = "";
let contactsForThisUserArr = [];
let contactsNotSeenArr = [];
let allUsersArr = [];
let previousMsgs = [];

// Fetch The User mail and name :
async function fetchDetails() {
  allUsers();
  await useruser();
  await msgmsg("Chat Section");
}
fetchDetails();

async function useruser() {
  await fetch("/user")
    .then((res) => res.json())
    .then((msg) => {
      presentEmail = msg.emailGlobal;

      // document.querySelector(".mainHeadingOfThePage").innerText += presentEmail;
    });
}

async function allUsers() {
  allUsersArr = [];
  await fetch("/allUsers")
    .then((res) => res.json())
    .then((msg) => {
      allUsersArr = msg.allUsersArr;
      console.log("allUsersArr : ", allUsersArr);
    });
}

async function msgmsg(contactName) {
  contactsForThisUserArr = [];
  contactsNotSeenArr = [];
  previousMsgs = [];

  let obj = {
    presentEmail,
  };

  await fetch("/allMyMsgs", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((msg) => {
      msg.allMsgsOfThisUser.forEach((obj) => {
        if (obj.from == presentEmail) {
          if (!contactsForThisUserArr.includes(obj.to)) {
            contactsForThisUserArr.push(obj.to);
          }
        } else if (obj.to == presentEmail) {
          if (!contactsForThisUserArr.includes(obj.from)) {
            contactsForThisUserArr.push(obj.from);
          }
        }
      });

      msg.iAmReciverHere.forEach((obj) => {
        if (obj.seen != "True") {
          if (!contactsNotSeenArr.includes(obj.from)) {
            contactsNotSeenArr.push(obj.from);
          }
        }
      });

      mainFunc(contactName);
    });
}

// Socket :
socket.on("message", (msgObj) => {
  leftContentsDisplayFunc();
  if (document.querySelector(".rightNavName").innerText == msgObj.from) {
    msgmsg(msgObj.from);
    previousMsgsFunc(document.querySelector(".rightNavName").innerText);
  } else {
    msgmsg(document.querySelector(".rightNavName").innerText);
  }
});

// Display Function :
function mainFunc(contactName) {
  if (document.getElementById("leftMainContainerID")) {
    const abc = document.getElementById("leftMainContainerID");
    abc.remove();
  }
  if (document.getElementById("rightMainContainerID")) {
    const abc = document.getElementById("rightMainContainerID");
    abc.remove();
  }

  const leftMainContainer = document.createElement("div");
  leftMainContainer.classList.add("leftMainContainer");
  leftMainContainer.setAttribute("id", "leftMainContainerID");
  mainContainer.appendChild(leftMainContainer);
  const rightMainContainer = document.createElement("div");
  rightMainContainer.classList.add("rightMainContainer");
  rightMainContainer.setAttribute("id", "rightMainContainerID");
  mainContainer.appendChild(rightMainContainer);

  leftContentsDisplayFunc();
  rightContentsDisplayFunc(contactName);
}

async function leftContentsDisplayFunc() {
  if (document.getElementById("contactsMainContainerID")) {
    const abc = document.getElementById("contactsMainContainerID");
    abc.remove();
  }

  const contactsMainContainer = document.createElement("div");
  contactsMainContainer.classList.add("contactsMainContainer");
  contactsMainContainer.setAttribute("id", "contactsMainContainerID");
  document
    .querySelector(".leftMainContainer")
    .appendChild(contactsMainContainer);

  const contactsSectionZeroMain = document.createElement("div");
  contactsSectionZeroMain.classList.add("contactsSectionZeroMain");
  contactsMainContainer.appendChild(contactsSectionZeroMain);
  const contactsHeadingZero = document.createElement("h1");
  contactsHeadingZero.classList.add("contactsHeadingZero");
  contactsHeadingZero.innerText = presentEmail;
  contactsSectionZeroMain.appendChild(contactsHeadingZero);

  const contactsSectionOneMain = document.createElement("div");
  contactsSectionOneMain.classList.add("contactsSectionOneMain");
  contactsMainContainer.appendChild(contactsSectionOneMain);
  const contactsHeadingOne = document.createElement("h1");
  contactsHeadingOne.classList.add("contactsHeadingOne");
  contactsHeadingOne.innerText = "My Chats";
  contactsSectionOneMain.appendChild(contactsHeadingOne);
  const contactsSectionOne = document.createElement("div");
  contactsSectionOne.classList.add("contactsSectionOne");
  contactsSectionOneMain.appendChild(contactsSectionOne);

  contactsForThisUserArr.forEach((item) => {
    singleContactsDisplayFunc(contactsSectionOne, item);
  });

  console.log("allUsersArr 2 : ", allUsersArr);

  const contactsSectionTwoMain = document.createElement("div");
  contactsSectionTwoMain.classList.add("contactsSectionTwoMain");
  contactsMainContainer.appendChild(contactsSectionTwoMain);
  const contactsHeadingTwo = document.createElement("h1");
  contactsHeadingTwo.classList.add("contactsHeadingTwo");
  contactsHeadingTwo.innerText = "All Users";
  contactsSectionTwoMain.appendChild(contactsHeadingTwo);
  const contactsSectionTwo = document.createElement("div");
  contactsSectionTwo.classList.add("contactsSectionTwo");
  contactsSectionTwoMain.appendChild(contactsSectionTwo);

  allUsersArr.forEach((item) => {
    singleContactsDisplayFunc(contactsSectionTwo, item.email);
  });

  function singleContactsDisplayFunc(parentContaier, item) {
    const contactsNameSection = document.createElement("div");
    contactsNameSection.classList.add("contactsNameSection");
    contactsNameSection.setAttribute("id", item);
    parentContaier.appendChild(contactsNameSection);
    const contactsFirstLetter = document.createElement("p");
    contactsFirstLetter.classList.add("contactsFirstLetter");
    contactsFirstLetter.innerText = item[0];
    contactsFirstLetter.setAttribute("id", item);
    contactsNameSection.appendChild(contactsFirstLetter);
    const contactsName = document.createElement("p");
    contactsName.classList.add("contactsName");
    contactsName.innerText = item;
    contactsName.setAttribute("id", item);
    contactsNameSection.appendChild(contactsName);

    // if (contactsNotSeenArr.includes(item)) {
    //   if (document.querySelector(".rightNavName")) {
    //     if (document.querySelector(".rightNavName").innerText == item) {
    //       updateSeen(
    //         document.querySelector(".rightNavName").innerText,
    //         presentEmail,
    //         "True"
    //       );
    //     } else {
    //       contactsNameSection.style.backgroundColor = "red";
    //     }
    //   } else {
    //     contactsNameSection.style.backgroundColor = "red";
    //   }
    // } else {
    //   contactsNameSection.style.backgroundColor = "none";
    // }

    if (contactsNotSeenArr.includes(item)) {
      contactsNameSection.style.backgroundColor = "red";
    } else {
      contactsNameSection.style.backgroundColor = "none";
    }

    contactsNameSection.addEventListener("click", (e) => {
      onClickOfContacts(e);
    });
  }
}

function onClickOfContacts(e) {
  document.querySelector(".rightMainContainer").innerHTML = "";

  previousMsgsFunc(e.target.id);
  updateSeen(e.target.id, presentEmail, "True");
}

function previousMsgsFunc(otherPersonOnChat) {
  let obj = {
    name1: presentEmail,
    name2: otherPersonOnChat,
  };

  fetch("/previousMsgs", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((msg) => {
      previousMsgs = msg.previousMsgsArr;

      rightContentsDisplayFunc(otherPersonOnChat);
    });
}

function updateSeen(from, to, seen) {
  let objUpdate = {
    from,
    to,
    seen,
  };

  fetch("/updateSeenInChat", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(objUpdate),
  })
    .then((res) => res.json())
    .then((msg) => {
      if (msg.statusFromBackEnd == "OK") {
        contactsNotSeenArr.splice(contactsNotSeenArr.indexOf(from), 1);
        leftContentsDisplayFunc();
      }
    });
}

function rightContentsDisplayFunc(contactName) {
  rightNavFunc(contactName);
  rightBodyFunc();
  rightFooterFunc();
}

function rightNavFunc(contactName) {
  if (document.getElementById("rightNavMainContainerID")) {
    const abc = document.getElementById("rightNavMainContainerID");
    abc.remove();
  }
  const rightNavMainContainer = document.createElement("div");
  rightNavMainContainer.classList.add("rightNavMainContainer");
  rightNavMainContainer.setAttribute("id", "rightNavMainContainerID");
  document
    .querySelector(".rightMainContainer")
    .appendChild(rightNavMainContainer);

  const rightNavNameSection = document.createElement("div");
  rightNavNameSection.classList.add("rightNavNameSection");
  rightNavMainContainer.appendChild(rightNavNameSection);
  const rightNavNameFirstLetter = document.createElement("p");
  rightNavNameFirstLetter.classList.add("rightNavNameFirstLetter");
  rightNavNameFirstLetter.innerText = contactName[0];
  rightNavNameSection.appendChild(rightNavNameFirstLetter);
  const rightNavName = document.createElement("p");
  rightNavName.classList.add("rightNavName");
  rightNavName.innerText = contactName;
  rightNavNameSection.appendChild(rightNavName);
}

function rightBodyFunc() {
  if (document.getElementById("rightBodyMainContainerID")) {
    const abc = document.getElementById("rightBodyMainContainerID");
    abc.remove();
  }
  const rightBodyMainContainer = document.createElement("div");
  rightBodyMainContainer.classList.add("rightBodyMainContainer");
  rightBodyMainContainer.setAttribute("id", "rightBodyMainContainerID");
  document
    .querySelector(".rightMainContainer")
    .appendChild(rightBodyMainContainer);

  if (previousMsgs.length > 0) {
    previousMsgs.forEach((obj) => {
      const msgContainer = document.createElement("div");
      msgContainer.classList.add("msgContainer");
      rightBodyMainContainer.appendChild(msgContainer);
      const msg = document.createElement("p");
      msg.classList.add("msg");
      msg.innerText = obj.msg;
      msgContainer.appendChild(msg);

      if (obj.from == presentEmail) {
        msgContainer.style.justifyContent = "flex-end";
        msg.style.borderRadius = "10px 10px 0px 10px";
      }
    });
  }
}

function rightFooterFunc() {
  if (document.getElementById("rightFooterMainContainerID")) {
    const abc = document.getElementById("rightFooterMainContainerID");
    abc.remove();
  }
  const rightFooterMainContainer = document.createElement("form");
  rightFooterMainContainer.classList.add("rightFooterMainContainer");
  rightFooterMainContainer.setAttribute("id", "rightFooterMainContainerID");
  document
    .querySelector(".rightMainContainer")
    .appendChild(rightFooterMainContainer);

  const rightFooterInput = document.createElement("input");
  rightFooterInput.classList.add("rightFooterInput");
  rightFooterInput.placeholder = "Enter the Message";
  rightFooterMainContainer.appendChild(rightFooterInput);
  const rightFooterSubmitBtn = document.createElement("button");
  rightFooterSubmitBtn.classList.add("rightFooterSubmitBtn");
  rightFooterSubmitBtn.innerText = "Send";
  rightFooterMainContainer.appendChild(rightFooterSubmitBtn);

  // Send Msg On-Click :
  rightFooterSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = rightFooterInput.value;

    let newMsgObj = {
      from: presentEmail,
      msg: message,
      to: document.querySelector(".rightNavName").innerText,
      seen: "False",
    };

    fetch("/addMsgs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMsgObj),
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg.statusFromBackEnd == "OK") {
          previousMsgsFunc(document.querySelector(".rightNavName").innerText);
        }
      });

    let msgObj = {
      from: presentEmail,
      message: message,
      to: document.querySelector(".rightNavName").innerText,
    };
    socket.emit("user-message", msgObj);
  });
}
