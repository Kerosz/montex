// helpers
import { sendEmail } from "../transporter";
// types
import type { MailDataRequired } from "@sendgrid/mail";

export interface SalesDispatchParams {
  from?: string;
  body: {
    first_name: string;
    last_name: string;
    company_name: string;
    company_size: number | string;
    job_title: string;
    work_email: string;
    additional_info: string;
  };
}

export async function sendSalesEmail({ from, body }: SalesDispatchParams) {
  const message = {
    to: process.env.SALES_CONTACT_EMAIL,
    from: process.env.SYSTEM_CONTACT_EMAIL,
    replyTo: from,
    templateId: "d-c4bc2a43b91840d8bde3d0289e87a873",
    dynamicTemplateData: {
      subject: "Sales Contact",
      WORK_EMAIL: body.work_email,
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
