let mainContainer = document.querySelector(".mainContainer");

// Sign Up Page :
function signupPage() {
  if (document.getElementById("pokSignupMainMainContainerID")) {
    const abc = document.getElementById("pokSignupMainMainContainerID");
    abc.remove();
  }

  const pokSignupMainMainContainer = document.createElement("div");
  pokSignupMainMainContainer.classList.add("pokSignupMainMainContainer");
  pokSignupMainMainContainer.setAttribute("id", "pokSignupMainMainContainerID");
  mainContainer.appendChild(pokSignupMainMainContainer);

  const pokSignupMainContainer = document.createElement("div");
  pokSignupMainContainer.classList.add("pokSignupMainContainer");
  pokSignupMainMainContainer.appendChild(pokSignupMainContainer);

  // Childs of main :
  const pokSignupMainNav = document.createElement("div");
  pokSignupMainNav.classList.add("pokSignupMainNav");
  pokSignupMainContainer.appendChild(pokSignupMainNav);
  const pokSignupMainBody = document.createElement("div");
  pokSignupMainBody.classList.add("pokSignupMainBody");
  pokSignupMainContainer.appendChild(pokSignupMainBody);
  const pokSignupMainFooter = document.createElement("div");
  pokSignupMainFooter.classList.add("pokSignupMainFooter");
  pokSignupMainContainer.appendChild(pokSignupMainFooter);

  // pokSignupMainNav :
  const pokSignupMainNavHeading = document.createElement("h1");
  pokSignupMainNavHeading.classList.add("pokSignupMainNavHeading");
  pokSignupMainNavHeading.innerText = "SignUp Page";
  pokSignupMainNav.appendChild(pokSignupMainNavHeading);
  const pokSignupMainNavHeadingErrorMsg = document.createElement("p");
  pokSignupMainNavHeadingErrorMsg.classList.add(
    "pokSignupMainNavHeadingErrorMsg"
  );
  pokSignupMainNavHeadingErrorMsg.innerText =
    "Email already exist, Please try with different e-mail";
  pokSignupMainNav.appendChild(pokSignupMainNavHeadingErrorMsg);

  // pokSignupMainBody :
  const pokSignupMainBodyForm = document.createElement("form");
  pokSignupMainBodyForm.classList.add("pokSignupMainBodyForm");
  pokSignupMainBody.appendChild(pokSignupMainBodyForm);

  // pokSignupMainBodyForm :
  const pokSignupFNameLabel = document.createElement("label");
  pokSignupFNameLabel.classList.add("pokSignupFNameLabel");
  pokSignupFNameLabel.innerText = "First Name";
  pokSignupMainBodyForm.appendChild(pokSignupFNameLabel);
  const pokSignupFNameImput = document.createElement("input");
  pokSignupFNameImput.classList.add("pokSignupFNameImput");
  pokSignupFNameImput.placeholder = "First Name";
  pokSignupMainBodyForm.appendChild(pokSignupFNameImput);
  const pokSignupFNameImputValidationText = document.createElement("p");
  pokSignupFNameImputValidationText.classList.add(
    "pokSignupFNameImputValidationText"
  );
  pokSignupFNameImputValidationText.innerText = "Please Enter the First name.";
  pokSignupMainBodyForm.appendChild(pokSignupFNameImputValidationText);
  pokSignupFNameImput.addEventListener("input", () => {
    pokSignupFNameImputValidationText.style.display = "none";
  });

  const pokSignupLNameLabel = document.createElement("label");
  pokSignupLNameLabel.classList.add("pokSignupLNameLabel");
  pokSignupLNameLabel.innerText = "Last Name";
  pokSignupMainBodyForm.appendChild(pokSignupLNameLabel);
  const pokSignupLNameImput = document.createElement("input");
  pokSignupLNameImput.classList.add("pokSignupLNameImput");
  pokSignupLNameImput.placeholder = "Last Name";
  pokSignupMainBodyForm.appendChild(pokSignupLNameImput);

  const pokSignupEmailLabel = document.createElement("label");
  pokSignupEmailLabel.classList.add("pokSignupEmailLabel");
  pokSignupEmailLabel.innerText = "Email";
  pokSignupMainBodyForm.appendChild(pokSignupEmailLabel);
  const pokSignupEmailImput = document.createElement("input");
  pokSignupEmailImput.classList.add("pokSignupEmailImput");
  pokSignupEmailImput.placeholder = "Email";
  pokSignupEmailImput.type = "email";
  pokSignupMainBodyForm.appendChild(pokSignupEmailImput);
  const pokSignupEmailImputValidationText = document.createElement("p");
  pokSignupEmailImputValidationText.classList.add(
    "pokSignupEmailImputValidationText"
  );
  pokSignupEmailImputValidationText.innerText =
    "Email is not in a right format";
  pokSignupMainBodyForm.appendChild(pokSignupEmailImputValidationText);
  pokSignupEmailImput.addEventListener("input", () => {
    pokSignupEmailImputValidationText.style.display = "none";
  });

  const pokSignupPasswordLabel = document.createElement("label");
  pokSignupPasswordLabel.classList.add("pokSignupPasswordLabel");
  pokSignupPasswordLabel.innerText = "Password";
  pokSignupMainBodyForm.appendChild(pokSignupPasswordLabel);
  const pokSignupPasswordImput = document.createElement("input");
  pokSignupPasswordImput.classList.add("pokSignupPasswordImput");
  pokSignupPasswordImput.placeholder = "Password";
  pokSignupPasswordImput.type = "password";
  pokSignupMainBodyForm.appendChild(pokSignupPasswordImput);
  const pokSignupPasswordImputValidationText = document.createElement("p");
  pokSignupPasswordImputValidationText.classList.add(
    "pokSignupPasswordImputValidationText"
  );
  pokSignupPasswordImputValidationText.innerText =
    "Password length should be more than 6";
  pokSignupMainBodyForm.appendChild(pokSignupPasswordImputValidationText);
  pokSignupPasswordImput.addEventListener("input", () => {
    pokSignupPasswordImputValidationText.style.display = "none";
  });

  // pokSignupMainFooter :
  const pokSignupSignupBtn = document.createElement("button");
  pokSignupSignupBtn.classList.add("pokSignupSignupBtn");
  pokSignupSignupBtn.innerText = "SignUp";
  pokSignupSignupBtn.type = "submit";
  pokSignupSignupBtn.addEventListener("click", (e) => {
    signUpFunction(e);
  });
  pokSignupMainFooter.appendChild(pokSignupSignupBtn);
  const pokSignupLoginDiv = document.createElement("div");
  pokSignupLoginDiv.classList.add("pokSignupLoginDiv");
  pokSignupMainFooter.appendChild(pokSignupLoginDiv);

  // pokSignupLoginDiv :
  const pokSignupLoginDivText = document.createElement("p");
  pokSignupLoginDivText.classList.add("pokSignupLoginDivText");
  pokSignupLoginDivText.innerText = "Already have an account.";
  pokSignupLoginDiv.appendChild(pokSignupLoginDivText);
  const pokSignupLoginDivLink = document.createElement("a");
  pokSignupLoginDivLink.classList.add("pokSignupLoginDivLink");
  pokSignupLoginDivLink.href = "logIn";
  pokSignupLoginDivLink.innerText = "Log In";
  pokSignupLoginDivLink.addEventListener("click", () => {
    pokSignupMainMainContainer.style.display = "none";
    loginPage();
  });
  pokSignupLoginDiv.appendChild(pokSignupLoginDivLink);

  function signUpFunction(e) {
    e.preventDefault();

    console.log("SignUp Clicked");
    let obj = {
      fname: pokSignupFNameImput.value,
      lname: pokSignupLNameImput.value,
      email: pokSignupEmailImput.value,
      password: pokSignupPasswordImput.value,
    };

    let regxForEmail =
      /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

    if (pokSignupFNameImput.value.length > 1) {
      pokSignupFNameImputValidationText.style.display = "none";
      if (regxForEmail.test(obj.email)) {
        pokSignupEmailImputValidationText.style.display = "none";
        let strongnessOfPassword = 0;
        if (obj.password.match(/[a-z]+/)) {
          strongnessOfPassword += 1;
        } else {
          pokSignupPasswordImputValidationText.innerText =
            "Password Should contain at least one lower-case letter.";
          pokSignupPasswordImputValidationText.style.display = "block";
        }
        if (obj.password.match(/[A-Z]+/)) {
          strongnessOfPassword += 1;
        } else {
          pokSignupPasswordImputValidationText.innerText =
            "Password Should contain at least one upper-case letter.";
          pokSignupPasswordImputValidationText.style.display = "block";
        }
        if (obj.password.match(/[0-9]+/)) {
          strongnessOfPassword += 1;
        } else {
          pokSignupPasswordImputValidationText.innerText =
            "Password Should contain at least one Number b/w 0-9.";
          pokSignupPasswordImputValidationText.style.display = "block";
        }
        if (obj.password.match(/[@#$%&!?]+/)) {
          strongnessOfPassword += 1;
        } else {
          pokSignupPasswordImputValidationText.innerText =
            "Password Should contain at least one special character from [@, #, $, %, !, ?].";
          pokSignupPasswordImputValidationText.style.display = "block";
        }

        if (strongnessOfPassword >= 4) {
          console.log("obj obj Obj : ", obj);
          pokSignupPasswordImputValidationText.style.display = "none";
          fetch("/userSignUp", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
          })
            .then((res) => res.json())
            .then((msg) => {
              console.log("msg msg msg msg", msg);
              console.log("msg msg msg msg type", typeof msg);
              if (msg.statusFromBackEnd == "OK") {
                localStorage.setItem("Access", "Given");
                window.location.href = "/homePage";
              } else {
                pokSignupMainNavHeadingErrorMsg.style.display = "block";
              }
            });
        } else {
          pokSignupPasswordImputValidationText.style.display = "block";
        }
      } else {
        pokSignupEmailImputValidationText.style.display = "block";
      }
    } else {
      pokSignupFNameImputValidationText.style.display = "block";
    }
  }
}

signupPage();
