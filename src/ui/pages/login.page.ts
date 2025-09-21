import { expect, Page } from '@playwright/test';
import { BasePage, LocatorMap } from './base.page';
import { Environment } from '../../env';
import { Endpoints } from '../../utils/constants/endpoints';
import { UIDataHelper } from '../../utils/ui.utils/ui.data.helper';
import { UITextErrors } from '../../utils/constants/ui.constants/ui.text.errors';

export class LoginPage extends BasePage {
    private urlLoginPage: string;
    private errorElementPassword = '#error-element-password';

    private fields = {
        usernameField: this.page.locator('#username'),
        passwordField: this.page.locator('#password')
    };

    private errors = {
        messageTextUnknownCredentials: this.page.locator('#error-element-password')
    };

    private buttons = {
        continueBtn: this.page.locator('button[type=submit][name=action]', {
            hasText: 'Continue'
        })
    };

    constructor(page: Page) {
        super(page);
        this.urlLoginPage = `${Environment.BASE_UI_URL}${Endpoints.LOGIN}`;
    }

    async goto() {
        await this.gotoByUrl(this.urlLoginPage);
    }

    async enterLoginCredentialsAndClickContinue(flag: string) {
        if (flag === 'positive') {
            await this.fields.usernameField.pressSequentially(`${Environment.USER_NAME}`);
            await this.fields.passwordField.pressSequentially(`${Environment.USER_PASSWORD}`);
            await this.buttons.continueBtn.click();
        } else if (flag === 'negative') {
            await this.fields.usernameField.pressSequentially(
                UIDataHelper.generateUnknownCredentials().username
            );
            await this.fields.passwordField.pressSequentially(
                UIDataHelper.generateUnknownCredentials().password
            );
            await this.buttons.continueBtn.click();
        } else {
            console.log('Invalid flag');
        }
    }

    async checkErrorMessage() {
        await this.page.waitForSelector(this.errorElementPassword, {
            timeout: 5000
        });
        expect(this.errors.messageTextUnknownCredentials).toBeVisible();
        expect(this.errors.messageTextUnknownCredentials).toHaveText(
            UITextErrors.UNKNOWN_CREDENTIALS
        );
    }
}
