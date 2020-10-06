//const sgMail = require('@sendgrid/mail')

//sgMail.setApiKey(process.env.SENDGRID_API)
const nodemailer = require('nodemailer');

const sendForgetPasswordEmail = (email, name, otp) => {

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'infoshopcart.lanet@gmail.com',
            pass: 'lanetteam@1' //Temp pass
        }
    });
    const message = {
        to: email,
        from: 'ayushbhaisha@gmail.com',
        subject: 'Verification Code For Reset Password.',
        text: `Hey ${name},

                We've received a request to reset your password for Shopcart Account.
                If you didn't make this request ignore this mail. Ohterwise here is the
                Verfication Code : ${otp}
                

                Thanks,
                The Shopcart Team.`
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    sendForgetPasswordEmail
}