//const sgMail = require('@sendgrid/mail')

//sgMail.setApiKey(process.env.SENDGRID_API)
const nodemailer = require("nodemailer");

const sendForgetPasswordEmail = (email, name, otp) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "infoshopcart.lanet@gmail.com",
      pass: "lanetteam@1", //Temp pass
    },
  });
  const message = {
    to: email,
    subject: "Verification Code For Reset Password.",
    text: `Hey ${name},

                We've received a request to reset your password for Shopcart Account.
                If you didn't make this request ignore this mail. Ohterwise here is the
                Verfication Code : ${otp}
                

                Thanks,
                The Shopcart Team.`,
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const sendFeedbackMail = (
  owner_email,
  owner_name,
  customer_email,
  product_title,
  product_price,
  msg
) => {
  //owner_email | owner_name | customer_email | product_title | product_price | msg

  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "infoshopcart.lanet@gmail.com",
      pass: "lanetteam@1", //Temp pass
    },
  });
  const message = {
    to: owner_email,
    subject: "A new Feedback for your Product.",
    text: `Hey ${owner_name},

                We've received a feedback for your product [ ${product_title} ] with price [ ₹${product_price} ] from ${customer_email}
                and the feedback message is : ${msg}
                
                Thanks,
                The Shopcart Team.`,
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = {
  sendForgetPasswordEmail,
  sendFeedbackMail,
};
