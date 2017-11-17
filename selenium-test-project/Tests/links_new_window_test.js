const {Builder, By, Key} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Links open in new window', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
        yield driver.get('http://localhost:8080/litecart/admin/?app=countries&doc=countries');
        yield driver.findElement(By.name('username')).sendKeys('admin');
        yield driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
    });

    try {
        test.it('On country page all links must be opened in a new window', function* () {
            //Edit the first country
            yield driver.findElement(By.css('i.fa-pencil')).click();
            let originalWindow = yield driver.getWindowHandle();
            let externalLinks = yield driver.findElements(By.css('#content table a[target="_blank"]'));
                for (let i = 0; i < externalLinks.length; i++) {
                    yield driver.findElements(By.css('#content table a[target="_blank"]')).then(function() {
                    externalLinks[i].click().then();
                    });
                    //find new window id
                    driver.sleep(1000); //need to use method like anyWindowOtherThan when it's ready
                    let existingWindows = yield driver.getAllWindowHandles();
                        for (let j = 0; j < existingWindows.length; j++) {
                            if (existingWindows[j] === originalWindow) {
                                existingWindows.splice([j], 1);
                            }
                        }
                    let newWindow = existingWindows[0];
                    //let newWindow = yield driver.wait(until.anyWindowOtherThan(existingWindows), 2000);
                    driver.switchTo().window(newWindow);
                    driver.close();
                    driver.switchTo().window(originalWindow);
            }
        })
    }
    catch (e) {
        console.log(e)
    }

    test.after(() => driver.quit());

});