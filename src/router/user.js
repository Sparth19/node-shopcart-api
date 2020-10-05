const express = require("express");
const User = require("../model/Users");
const router = new express.Router();
const auth = require("../middleware/auth");

const nodemailer = require('nodemailer');

//post req for sign up
router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //auth token
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});


router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send("Logout Success");
  } catch (e) {
    res.status(500).send(e);
  }
});

//update user profile
router.patch("/users/updateProfile/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "address"];
  const isValid = updates.every((update) => allowUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "No such property to update" });
  }

  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

//User Forget Password
router.post("/users/forgetPass", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(404).send();
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayushbhaisha@gmail.com',
        pass: 'Facebook7575' // Temp password for gmail
      }
    });

    const mailOptions = {
      from: 'ayushbhaisha@gmail.com',
      to: user.email,
      subject: 'Verification Code For Reset Password',
      text: `Hey ${user.name},


                We've received a request to reset your password for Shopcart Account.
                If you didn't make this request ignore this mail. Ohterwise here is the
                Verfication Code : ${otp} 
                

                Thanks,
                The Shopcart Team.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(201).send({ user, otp });

  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});


//update user password
router.patch("/users/updatePassword/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["password"];
  const isValid = updates.every((update) => allowUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "No such property to update" });
  }

  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

module.exports = router;
