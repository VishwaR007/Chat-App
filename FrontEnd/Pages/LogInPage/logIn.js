let mainContainer = document.querySelector(".mainContainer");

// Login Page :
function loginPage() {
  // leftObject = 0;
  // rightObject = 0;

  if (document.getElementById("pokLoginMainMainContainerID")) {
    const abc = document.getElementById("pokLoginMainMainContainerID");
    abc.remove();
  }

  const pokLoginMainMainContainer = document.createElement("div");
  pokLoginMainMainContainer.classList.add("pokLoginMainMainContainer");
  pokLoginMainMainContainer.setAttribute("id", "pokLoginMainMainContainerID");
  mainContainer.appendChild(pokLoginMainMainContainer);

  const pokLoginMainContainer = document.createElement("div");
  pokLoginMainContainer.classList.add("pokLoginMainContainer");
  pokLoginMainMainContainer.appendChild(pokLoginMainContainer);

  // Childs of main :
  const pokLoginMainNav = document.createElement("div");
  pokLoginMainNav.classList.add("pokLoginMainNav");
  pokLoginMainContainer.appendChild(pokLoginMainNav);
  const pokLoginMainBody = document.createElement("div");
  pokLoginMainBody.classList.add("pokLoginMainBody");
  pokLoginMainContainer.appendChild(pokLoginMainBody);
  const pokLoginMainFooter = document.createElement("div");
  pokLoginMainFooter.classList.add("pokLoginMainFooter");
  pokLoginMainContainer.appendChild(pokLoginMainFooter);

  // pokLoginMainNav :
  const pokLoginMainNavHeading = document.createElement("h1");
  pokLoginMainNavHeading.classList.add("pokLoginMainNavHeading");
  pokLoginMainNavHeading.innerText = "Login Page";
  pokLoginMainNav.appendChild(pokLoginMainNavHeading);
  const pokLoginMainNavError = document.createElement("p");
  pokLoginMainNavError.classList.add("pokLoginMainNavError");
  pokLoginMainNavError.innerText = "Something went wrong, Please Try again!";
  pokLoginMainNav.appendChild(pokLoginMainNavError);

  // pokLoginMainBody :
  const pokLoginMainBodyForm = document.createElement("form");
  pokLoginMainBodyForm.classList.add("pokLoginMainBodyForm");
  pokLoginMainBody.appendChild(pokLoginMainBodyForm);

  // pokLoginMainBodyForm :
  const pokLoginFormEmailLabel = document.createElement("label");
  pokLoginFormEmailLabel.classList.add("pokLoginFormEmailLabel");
  pokLoginFormEmailLabel.innerText = "Email";
  pokLoginMainBodyForm.appendChild(pokLoginFormEmailLabel);
  const pokLoginFormEmailImput = document.createElement("input");
  pokLoginFormEmailImput.classList.add("pokLoginFormEmailImput");
  pokLoginFormEmailImput.placeholder = "Email";
  pokLoginFormEmailImput.type = "email";
  pokLoginFormEmailImput.addEventListener("input", () => {
    pokLoginMainNavError.style.display = "none";
  });
  pokLoginMainBodyForm.appendChild(pokLoginFormEmailImput);
  const pokLoginFormPassLabel = document.createElement("label");
  pokLoginFormPassLabel.classList.add("pokLoginFormPassLabel");
  pokLoginFormPassLabel.innerText = "Password";
  pokLoginMainBodyForm.appendChild(pokLoginFormPassLabel);
  const pokLoginFormPassInput = document.createElement("input");
  pokLoginFormPassInput.classList.add("pokLoginFormPassInput");
  pokLoginFormPassInput.type = "password";
  pokLoginFormPassInput.placeholder = "Password";
  pokLoginFormPassInput.addEventListener("input", () => {
    pokLoginMainNavError.style.display = "none";
  });
  pokLoginMainBodyForm.appendChild(pokLoginFormPassInput);

  // pokLoginMainFooter :
  const pokLoginLoginBtn = document.createElement("button");
  pokLoginLoginBtn.classList.add("pokLoginLoginBtn");
  pokLoginLoginBtn.innerText = "Login";
  pokLoginLoginBtn.addEventListener("click", logInFunction);
  pokLoginMainFooter.appendChild(pokLoginLoginBtn);

  const pokLoginSignUpDiv = document.createElement("div");
  pokLoginSignUpDiv.classList.add("pokLoginSignUpDiv");
  pokLoginMainFooter.appendChild(pokLoginSignUpDiv);
  const pokLoginForgotPasswordDiv = document.createElement("div");
  pokLoginForgotPasswordDiv.classList.add("pokLoginForgotPasswordDiv");
  pokLoginMainFooter.appendChild(pokLoginForgotPasswordDiv);

  // pokLoginSignUpDiv :
  const pokLoginSignUpDivText = document.createElement("p");
  pokLoginSignUpDivText.classList.add("pokLoginSignUpDivText");
  pokLoginSignUpDivText.innerText = "Don't have an account.";
  pokLoginSignUpDiv.appendChild(pokLoginSignUpDivText);
  const pokLoginSignUpDivLink = document.createElement("a");
  pokLoginSignUpDivLink.classList.add("pokLoginSignUpDivLink");
  pokLoginSignUpDivLink.href = "signUp";
  pokLoginSignUpDivLink.innerText = "Sign Up";
  pokLoginSignUpDivLink.addEventListener("click", () => {
    pokLoginMainMainContainer.style.display = "none";
    signupPage();
  });
  pokLoginSignUpDiv.appendChild(pokLoginSignUpDivLink);

  function logInFunction() {
    console.log("LogIn Clicked");

    let obj = {
      email: pokLoginFormEmailImput.value,
      password: pokLoginFormPassInput.value,
    };

    fetch(`/userLogIn/${JSON.stringify(obj)}`)
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
        if (message.resFromBackEndLogIn == "OK") {
          localStorage.setItem("Access", "Given");
          window.location.href = "/homePage";

          pokLoginMainNavError.style.display = "none";
        } else {
          pokLoginMainNavError.style.display = "block";
        }
      });
  }
}
loginPage();

// Setting Some Local Storage :
localStorage.setItem("ForgotPasswordFirstStageAccess", "Not Given");
localStorage.setItem("ForgotPasswordSecondStageAccess", "Not Given");
