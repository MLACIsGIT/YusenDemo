import { createTransport } from 'nodemailer';
import Token from '../repository/Token';

export default class Email {
    constructor(user) {
      this.user = user;
    }

  async send(mailOptions) {
    const transporter = createTransport({
        host: process.env.REG_EMAIL_HOST,
        port: process.env.REG_EMAIL_PORT,
        auth: {
          user: process.env.REG_EMAIL_USER,
          pass: process.env.REG_EMAIL_PASS,
        },
      });

      const promiseOfSendMail = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info.response);
          }
        });
      });

      try {
        await promiseOfSendMail;
        return {
          message: 'validation-email-sent',
        };
      } catch (error) {
        return {
          message: 'Validation-email-error',
          error: error,
        };
      }    
  }

  async sendRegistrationEmail() {
    const token = Token.get('REGISTRATION', this.user._id, this.user.userLevel);

    const mailOptions = {
        from: process.env.REG_EMAIL_FROM,
        to: this.user.email,
        subject: 'YUSEN CUSTOMER PORTAL regisztráció',
        text:
          `Köszönjük, hogy regisztrált!\n\nKérjük erősítse meg szándékát erre a linkre kattintva: ${process.env.REG_EMAIL_LINK_ACCEPTED}/${token}.\n\nHa Ön nem szeretné ezt a szolgáltatást igénybe venni, akkor kérjük kattintson erre a link-re: ${process.env.REG_EMAIL_LINK_DISMISSED}/${token}\n\n\nA YUSEN (Hungary) csapata`,
        html: `<b>Tisztelt ${this.user.name}!</b><br><br>Szeretettel köszöntjük online ügyfélkapu szolgáltatásunk felhasználói között!<br><br>Kérjük erősítse meg e-mail címét <a href="${process.env.REG_EMAIL_LINK_ACCEPTED}/${token}">erre a linkre kattintással.</a>
        <br><br>Köszönjük!<br><br>Ha Ön nem szeretné ezt a szolgáltatást igénybe venni, akkor kérjük <a href="${process.env.REG_EMAIL_LINK_DISMISSED}/${token}">kattintson ide.</a><br><br><br>A YUSEN (Hungary) csapata`,
      };
  
      try {
        await this.send(mailOptions);
        return {
          message: 'validation-email-sent',
        };
      } catch (error) {
        return {
          message: 'Validation-email-error',
          error: error,
        };
      }  
  }
}
