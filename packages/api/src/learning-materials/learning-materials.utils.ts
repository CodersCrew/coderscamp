import puppeteer from 'puppeteer';

import { env } from '@/common/env';

export const generateProcessStChecklist = async (name: string) => {
  const url = `${env.PROCESS_ST_CHECKLIST_URL}?checklist_name=${encodeURIComponent(name)}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.steps-header');

  const result = page.url();

  await browser.close();

  return result;
};
