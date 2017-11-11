const {Builder, By, Key, until, Select} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');


test.describe('User registration', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    try {
        test.it('checks user registration', function* () {
            //go registration page from the main page
            yield driver.get('http://localhost:8080/litecart/');
            yield driver.findElement(By.css('#box-account-login a')).click();

            //fill fields
            yield driver.findElement(By.css('[name=firstname]')).sendKeys('First name');
            yield driver.findElement(By.css('[name=lastname]')).sendKeys('Last name');
            yield driver.findElement(By.css('[name=address1]')).sendKeys('24 Chauncy St');
            yield driver.findElement(By.css('[name=postcode]')).sendKeys('01234');
            yield driver.findElement(By.css('[name=city]')).sendKeys('Boston');
            //choose country US
            yield driver.findElement(By.css('span.select2-selection')).click();
            yield driver.findElement(By.css('input.select2-search__field')).sendKeys('United States', Key.RETURN);
            //choose state MA
            yield driver.findElement(By.css('[name="zone_code"]')).sendKeys('Mass');
            //generate email
            yield driver.findElement(By.css('[name="email"]')).sendKeys('user_test'+ Math.floor(Math.random()*1000) +'@abc.com').then();

            var email = yield driver.findElement(By.css('[name="email"]')).getAttribute("value").then();

            yield driver.findElement(By.css('[name="phone"]')).sendKeys('1112223344');
            yield driver.findElement(By.css('[name="password"]')).sendKeys('password').then();
            yield driver.findElement(By.css('[name="confirmed_password"]')).sendKeys('password');
            yield driver.findElement(By.css('[name="create_account"]')).click();
            //assert by success notice
            yield driver.wait(until.elementLocated(By.xpath("//*[contains(., 'Your customer account has been created.')]")), 1000);
            //logout
            yield driver.findElement(By.linkText('Logout')).click();
            yield driver.wait(until.elementLocated(By.xpath("//*[contains(., 'You are now logged out.')]")), 1000);
            //login again
            yield driver.findElement(By.css('[name="email"]')).sendKeys(email);
            yield driver.findElement(By.css('[name="password"]')).sendKeys('password', Key.RETURN);
            //logout again
            yield driver.findElement(By.linkText('Logout')).click();
        })}

    catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());

    });