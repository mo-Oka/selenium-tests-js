const {Builder, By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Admin Login', function() {
    let driver;

    test.before(function *() {
        driver = yield new Builder().forBrowser('firefox').build();
    });

    // You can write tests either using traditional promises.
    it('works with promises', function() {
        return driver.get('http://localhost:8080/litecart/admin/')
            .then(_ =>
                driver.findElement(By.name('username')).sendKeys('admin'))
            .then(_ =>
                driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN))
            .then(_ => driver.wait(until.titleIs('My Store'), 1000));
    });

    test.after(() => driver.quit());
});
