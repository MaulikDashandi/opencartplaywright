/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let envConfig: TestConfig;

//Hooks
test.beforeEach(async ({ page }) => {

    //Object of TestConfig --> Navigate to application URL
    envConfig = new TestConfig();
    await page.goto(envConfig.appUrl);

    //Objects also we need 
    //Object of HomePage --> Go to 'My Account' and click 'Register'
    homePage = new HomePage(page);
    //Object of Registration Page --> Fill in registration details with random data
    registrationPage = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close(); //Not mandatory as in playwright it will by default close the page    
})

//Test
test('Velidate Account Registration',{tag:['@master,@sanity','@regression']}, async () => {



    await homePage.clickMyAccount();
    await homePage.clickRegister();

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message

    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');



})

test.skip('Velidate Account Registration-My Details', async () => {



    await homePage.clickMyAccount();
    await homePage.clickRegister();

    await registrationPage.setFirstName('Maulik');
    await registrationPage.setLastName('D');
    await registrationPage.setEmail('maulik.d@avdevs.com');
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = 'test@123';
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message

    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');



})