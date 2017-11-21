const {Builder, By, Key} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Browser logs', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
        yield driver.get('http://localhost:8080/litecart/admin/');
        yield driver.findElement(By.name('username')).sendKeys('admin');
        yield driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
    });

    try {
        test.it('check if there is no log in browser', function* () {
            yield driver.get('http://localhost:8080/litecart/admin/?app=catalog&doc=catalog&category_id=1');
            let products = yield driver.findElements(By.css('#content td:nth-child(3) a')).then();
                for (let i = 4; i < products.length; i++) { //i=4 to skip categories folders
                    yield driver.findElements(By.css('#content td:nth-child(3) a')).then(function(products) {
                        products[i].click().then();
                    });

                    yield driver.manage().logs().get("browser").then(function (logsEntries) {
                        logsEntries.forEach(function (l) {
                            console.log(l);
                            throw new Error('There is something in the console!') //not sure if we need this throw to fail the test, task was unclear
                        });
                    });

                    yield driver.navigate().back();
                }
        })
    }

    catch (e) {
        console.log(e)
    }

    test.after(() => driver.quit());

});