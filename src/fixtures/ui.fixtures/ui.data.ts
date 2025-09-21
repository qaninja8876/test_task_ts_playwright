import { test as base } from '@playwright/test';
import { Environment } from '../../env';
import { PageManager } from '../../ui/pages/page.manager';
import { UIFixtures } from '../fixtures'

export const test = base.extend<UIFixtures>({
    
    pageManager: async ({page}, use) => {
        const pages = new PageManager(page);
        await use(pages)
    },

    uiUserName: async ({}, use) => {
        await use(`${Environment.USER_NAME}`);
    },

});

export const expect = test.expect;
