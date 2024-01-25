const express = require("express");
const path = require("path");
const connectDb = require("./DataBase/dbConnectionFile");
const Users = require("./DataBase/Models/user");
const Msgs = require("./DataBase/Models/msgs");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = "adnan-tech-programming-computers";
const iv = crypto.randomBytes(16);

const http = require("http"); // socket
const { Server } = require("socket.io"); // socket

const app = express();
const server = http.createServer(app); // socket
const io = new Server(server); // socket

// Global Variables :
let fnameGlobal;
let emailGlobal;

// Middlewares :
app.use(express.static(path.join(__dirname, "../FrontEnd/Pages/SignUpPage")));
app.use(express.static(path.join(__dirname, "../FrontEnd/Pages/LogInPage")));
app.use(express.static(path.join(__dirname, "../FrontEnd/Pages/HomePage")));
app.use(express.json());

// Routes :
app.get("/signUp", async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../FrontEnd/Pages/SignUpPage/signUp.html")
  );
});
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage/logIn.html"));
});
app.get("/logIn", async (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage/logIn.html"));
});
app.get("/homePage", async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../FrontEnd/Pages/HomePage/homePage.html")
  );
});
app.post("/userSignUp", async (req, res) => {
  console.log("req.body : ", req.body);
  const { fname, lname, email, password } = req.body;

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(password, "utf-8", "hex");
  encryptedPassword += cipher.final("hex");
  const base64data = Buffer.from(iv, "binary").toString("base64");

  const checkUser = await Users.find({ email: email });
  if (checkUser.length > 0) {
    console.log("Old One checkUser : ", userSignUpVar);
    res.send({ statusFromBackEnd: "NOT OK" });
  } else {
    let userSignUpVar = await Users.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      base64data,
      socketID: "",
    });

    fnameGlobal = fname;
    emailGlobal = email;

    res.send({
      statusFromBackEnd: "OK",
    });
    console.log("New User : ", userSignUpVar);
  }
});
app.get("/userLogIn/:userObj", async (req, res) => {
  try {
    console.log("Inside try login");
    const { userObj } = req.params;
    const user = await Users.find({ email: JSON.parse(userObj).email });
    if (user.length > 0) {
      console.log("Inside try login", user[0].base64data);
      const base64data = Buffer.from(user[0].base64data, "base64");
      const decipher = crypto.createDecipheriv(algorithm, key, base64data);
      let decryptedPassword = decipher.update(user[0].password, "hex", "utf-8");
      decryptedPassword += decipher.final("utf8");

      console.log("decryptedPassword :------ ", decryptedPassword);

      if (decryptedPassword == JSON.parse(userObj).password) {
        fnameGlobal = user[0].fname;
        emailGlobal = user[0].email;
        res.send({
          resFromBackEndLogIn: "OK",
          presentUserName: user[0].fname,
          presentUserEmail: user[0].email,
        });
      } else {
        res.send({ resFromBackEndLogIn: "NOT OK" });
      }
    } else {
      res.send({ resFromBackEndLogIn: "NOT OK" });
    }
    // res.status(200).json({ message: user });
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
});

// Msgs Routes :
app.post("/allMsgs", async (req, res) => {
  const { from, msg, to, seen } = req.body;

  let chatMsgCreate = await Msgs.create({
    from,
    msg,
    to,
    seen,
  });

  let chatMsgGet = await Msgs.find();

  res.send({
    statusFromBackEnd: "OK",
    chatMsgGet: chatMsgGet,
    // presentUserName: fname,
    // presentUserEmail: email,
  });
});
app.get("/onSelectOfUserToChat", async (req, res) => {
  let chatMsgGet = await Msgs.find();
  res.send({
    statusFromBackEnd: "OK",
    chatMsgGet: chatMsgGet,
    // presentUserName: fname,
    // presentUserEmail: email,
  });
});
app.post("/offcanvasToChatPageNotSeenContacts", async (req, res) => {
  const { to, seen } = req.body;
  let chatMsgGet = await Msgs.find({ to: to, seen: seen });
  res.send({
    statusFromBackEnd: "OK",
    chatMsgGet: chatMsgGet,
    // presentUserName: fname,
    // presentUserEmail: email,
  });
});
app.post("/chatSearchUser", async (req, res) => {
  const { objVal } = req.body;
  const allUsersObjectArr = await Users.find();

  let resultArrOfNames = [];

  allUsersObjectArr.forEach((obj) => {
    if (obj.email.startsWith(objVal)) {
      resultArrOfNames.push(obj.email);
    }
  });
  console.log(resultArrOfNames);

  res.send({
    statusFromBackEnd: "OK",
    allUsersObjectArr: resultArrOfNames,
    // presentUserName: fname,
    // presentUserEmail: email,
  });
});

// New msg routes :
app.get("/user", async (req, res) => {
  const user = await Users.find({ email: emailGlobal });
  console.log("emailGlobal : ", emailGlobal);
  res.send({ fnameGlobal, emailGlobal });
});
app.get("/allUsers", async (req, res) => {
  const allUsersArr = await Users.find();
  res.send({ allUsersArr });
});
app.post("/allMyMsgs", async (req, res) => {
  const { presentEmail } = req.body;
  console.log("presentEmail : : : : ", presentEmail);
  let iAmSenderHere = await Msgs.find({ from: presentEmail });
  let iAmReciverHere = await Msgs.find({ to: presentEmail });

  console.log(iAmSenderHere);
  console.log(iAmReciverHere);

  let allMsgsOfThisUser = iAmSenderHere.concat(iAmReciverHere);

  res.send({ iAmSenderHere, iAmReciverHere, allMsgsOfThisUser });
});
app.post("/previousMsgs", async (req, res) => {
  const { name1, name2 } = req.body;
  let previousMsgsArr = [];

  const allMsgs = await Msgs.find();

  allMsgs.forEach((obj) => {
    if (
      (obj.from == name1 && obj.to == name2) ||
      (obj.from == name2 && obj.to == name1)
    ) {
      previousMsgsArr.push(obj);
    }
  });

  res.send({ previousMsgsArr });
});
app.post("/updateSeenInChat", async (req, res) => {
  const { from, to, seen } = req.body;

  const findAndUpdate = await Msgs.updateMany(
    { from: from, to: to },
    { $set: { seen: seen } }
  );

  res.send({ statusFromBackEnd: "OK" });
});
app.post("/addMsgs", async (req, res) => {
  const { from, msg, to, seen } = req.body;

  let chatMsgCreate = Msgs.create({
    from,
    msg,
    to,
    seen,
  });

  res.send({
    statusFromBackEnd: "OK",
  });
});

// Sockets :
io.on("connection", async (socket) => {
  console.log("A new user is connected : ", socket.id);

  const user = await Users.findOneAndUpdate(
    { email: emailGlobal },
    { $set: { socketID: socket.id } }
  );

  socket.on("user-message", async (msgObj) => {
    console.log("A new user message : ", msgObj);
    const user = await Users.find({ email: msgObj.to });
    io.to(user[0].socketID).emit("message", msgObj);

    // io.emit(`${msgObj.from}-message`, msgObj.message);
    // io.emit(`${msgObj.to}-message`, msgObj.message);
    // io.emit(`message`, msgObj.message);
    // io.emit(`message`, msgObj);
    // io.emit(`message`, message);
  });
});

// DB Connection :
connectDb();

// Listen to port 8080 :
server.listen(8080, () => {
  console.log("Server is running at port 8080.");
});
