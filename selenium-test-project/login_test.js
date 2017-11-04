const {Builder, By, logging, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

// logging.installConsoleHandler();
// logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL);

test.describe('Admin Login', function() {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });
    it('works with promises', function () {
        return driver.get('http://localhost:8080/litecart/admin/')
            .then(_ =>
                driver.findElement(By.name('username')).sendKeys('admin'))
            // .then(_ =>
            //     driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN)) //test implemented with enter button
            .then(_ =>
                driver.findElement(By.name('password')).sendKeys('admin')) //test implemented with a click on the UI button
            .then(_ =>
                driver.findElement(By.name('login')).click())
            .then(_ =>
                driver.wait(until.elementLocated(By.xpath("//*[contains(., 'You are now logged in as admin')]")), 1000)); // assert by notice "You are now logged in as admin"
    });

    test.after(() => driver.quit());

});


