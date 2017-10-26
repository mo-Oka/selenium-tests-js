var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function () {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    test.it('should append query to title', function () {
        driver.get('http://google.com');
        driver.findElement(By.name('q')).sendKeys('webdriver');
        driver.findElement(By.name('btnK')).click();
        driver.wait(until.titleIs('webdriver - Поиск в Google'), 1000);
    });

    test.after(function () {
        driver.quit();
    });
});
