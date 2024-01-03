const express = require("express");
const app = express();
const Controller = require("./Helper");
const middlewareFn = require("./middleware");
const path=require("path")
app.use(express.json());
app.post("/createUser", (req, resp) => {
  const { email, phone, firstName, lastName,password } = req.body;
  Controller.createUserFn(
    email,
    phone,
    firstName, 
    lastName,
    password,
    resp,
    req
  );
});
app.use( middlewareFn.customMiddlewareForToken)
app.get("/listOfUser", (req, resp) => {
  const { email, phone, firstName, lastName } = req.query;
  Controller.listOfData(email, phone, firstName, lastName, resp);
});

app.put("/updateUser/:id", (req, resp) => {
  const { email, phone, firstName, lastName,password } = req.body;
  const id = req.params.id;
  Controller.updateUserData(id, email, phone, firstName, lastName, password,resp, req);
});

app.delete("/removeUser/:id", (req, resp) => {
  const id = req.params.id;
  Controller.deleteUserData(id, resp);
});
app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  Controller.loginUserFn(email,password,resp)
});
app.post("/logout",  (req, resp) => {
  const { token } = req.headers;
  Controller.logoutUserfn(req,resp,token)
});
app.listen(4000);