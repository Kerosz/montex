// packages
import sgMail from "@sendgrid/mail";
// types
import type { MailDataRequired } from "@sendgrid/mail";

/**
 * Sets the global API Key for send grid mail client
 */
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmail(message: MailDataRequired | MailDataRequired[]) {
  try {
    await sgMail.send(message);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    return error;
  }
}
