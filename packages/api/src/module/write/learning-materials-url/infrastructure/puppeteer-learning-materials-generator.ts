import puppeteer from 'puppeteer';

import {
  LearningMaterialsUrl,
  LearningMaterialsUrlGenerator,
  UserFullname,
} from '../application/learning-materials-url-generator';

// todo: try-finally to clean resources on error
const generateProcessStChecklist = async (name: string) => {
  const urlBase = 'https://app.process.st/workflows/CodersCamp-Test-Checklist-kTrxJoZgP-9IabhRbohIrw/run-link';
  const url = `${urlBase}?checklist_name=${encodeURIComponent(name)}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.steps-header');

  const generatedUrl = page.url();
  const generatedId = url.split('/')[4];

  await browser.close();

  return { url: generatedUrl, id: generatedId };
};

export class PuppeteerLearningMaterialsGenerator implements LearningMaterialsUrlGenerator {
  async generateUrlFor(userFullname: UserFullname): Promise<{ id: string; url: LearningMaterialsUrl }> {
    return generateProcessStChecklist(userFullname);
  }
}
