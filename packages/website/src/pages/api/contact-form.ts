import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SendMailOptions } from 'nodemailer';

import type { FormValues } from '@/components/Contact/Form';
import { CONTACT_EMAIL } from '@/constants';

async function sendContactForm(req: NextApiRequest, res: NextApiResponse) {
  const port = Number(process.env.NODEMAILER_PORT);
  const host = process.env.NODEMAILER_HOST;
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;

  if (!port || Number.isNaN(port) || !host || !user || !pass) {
    return res.status(500).json({ message: 'Environment not configured for sending emails' });
  }

  if (req.method === 'POST') {
    const values: FormValues = req.body;

    const transporter = nodemailer.createTransport({ port, host, auth: { user, pass } });

    const mailOptions: SendMailOptions = {
      from: `${values.fullName} ${values.email}`,
      to: CONTACT_EMAIL,
      subject: values.subject,
      text: values.message,
      html: `<div>${values.message}</div>`,
    };

    try {
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'E-mail sent successfully' });
    } catch (ex) {
      return res.status(500).json({ message: 'Error when sending e-mail' });
    }
  }

  return res.status(400).json({ message: `Unsupported request type - ${req.method}` });
}

// eslint-disable-next-line import/no-default-export
export default sendContactForm;
