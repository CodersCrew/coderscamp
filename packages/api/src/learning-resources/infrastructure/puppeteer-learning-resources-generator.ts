import {LearningResourcesGenerator} from "../core/learning-resources-generator";
import {UserId} from "../../shared/user-id";
import {LearningResources} from "../core/learning.resources";
import puppeteer from 'puppeteer';
import {TimeProvider} from "../core/time-provider";
import {UsersFullNames} from "../core/usersFullNames";

export class PuppeteerLearningResourcesGenerator implements LearningResourcesGenerator {

  constructor(
    private readonly timeProvider: TimeProvider,
    private readonly usersFullNames: UsersFullNames
  ) {
  }

  async generateFor(userId: UserId): Promise<LearningResources> {
    const user = await this.usersFullNames.findUserById(userId)
    if(!user){
      throw new Error("Cannot generate learning resources for not existing user!")
    }
    const resourcesUrl = await generateProcessStChecklist(user.fullName);
    return new LearningResources(userId, resourcesUrl, this.timeProvider.currentTime());
  }

}

/**
 * todo: Do tego kodu z puppeteer doadajcie try-finally, aby wyczyścić resourcy w przypadku błędu
 * @param name
 */
const generateProcessStChecklist = async (name: string) => {
  const urlBase = 'https://app.process.st/workflows/CodersCamp-Test-Checklist-kTrxJoZgP-9IabhRbohIrw/run-link';
  const url = `${urlBase}?checklist_name=${encodeURIComponent(name)}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.steps-header');

  const result = page.url();

  await browser.close();

  return result;
}
