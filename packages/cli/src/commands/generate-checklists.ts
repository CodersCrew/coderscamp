import { Command } from 'commander';
import puppeteer from 'puppeteer';

import { getUsersByRole, updateUserById } from '../shared/db';
import { env, validateEnv } from '../shared/env';
import { createLogger } from '../shared/logger';
import { userRoles } from '../shared/models';

const logger = createLogger('generate-checklists');

export const generateProcessStChecklist = async (name: string) => {
  logger.debug(`Generating new checklist for the user ${name}`);

  const urlBase = env.PROCESS_ST_CHECKLIST_URL;
  const url = `${urlBase}?checklist_name=${encodeURIComponent(name)}`;

  logger.debug('Launching the Puppeteer browser');

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    logger.debug('Opening provided URL', { url });
    await page.goto(url);

    logger.debug('Waiting for checklist to be generated');
    await page.waitForSelector('.steps-header');

    const checklistUrl = page.url();

    logger.debug('Page url retrieved. Closing the browser');
    await browser.close();

    return checklistUrl;
  } catch (ex) {
    logger.debug(`An error ocurred when generating the checklist for user ${name}`, ex);
    await browser.close();
    throw ex;
  }
};

export const generateChecklists = (program: Command) => {
  program
    .command('generate-checklists')
    .description('Cerates checklists on Process.st for all participants')
    .action(async () => {
      try {
        await validateEnv();

        const participants = await getUsersByRole(userRoles.participant);

        logger.debug('Iterating through fetched participants');

        for (const participant of participants) {
          const checklist = await generateProcessStChecklist(participant.name);

          await updateUserById(participant.id, { checklist });
        }

        logger.debug('Iteration through fetched participants finished');
      } catch (ex) {
        logger.error(ex);
      }
    });
};
