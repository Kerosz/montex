// helpers
import { sendEmail } from "../transporter";
// types
import type { MailDataRequired } from "@sendgrid/mail";

export interface PartnerDispatchParams {
  from?: string;
  body: {
    partner_type: string;
    first_name: string;
    last_name: string;
    company_name: string;
    company_size: number | string;
    job_title: string;
    work_email: string;
    additional_info: string;
  };
}

export async function sendPartnerEmail({ from, body }: PartnerDispatchParams) {
  const message = {
    to: process.env.PARTNER_CONTACT_EMAIL,
    from: process.env.SYSTEM_CONTACT_EMAIL,
    replyTo: from,
    templateId: "d-2b5f2c59573e470294b6caf127636a83",
    dynamicTemplateData: {
      subject: "New partner request",
      WORK_EMAIL: body.work_email,
      PARTNER_TYPE: body.partner_type,
      FIRST_NAME: body.first_name,
      LAST_NAME: body.last_name,
      JOB_TITLE: body.job_title,
      COMPANY_NAME: body.company_name,
      COMPANY_SIZE: body.company_size,
      ADDITIONAL_INFORMATION: body.additional_info,
    },
  } as MailDataRequired;

  await sendEmail(message);
}
