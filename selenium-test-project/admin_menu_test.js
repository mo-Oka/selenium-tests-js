const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
// logging.installConsoleHandler();
// logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL);

    test.describe('Admin Menu', function () {
        let driver;
        this.timeout(30000);

        test.before(function *() {
            driver = yield new Builder().forBrowser('chrome').build();
        });

            test.it('login by admin - promises', function () {
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

        try {
            test.it('checks if there h1 in every menu option', function* () {
                //find menu elements as array
                var links = yield driver.findElements(By.css('#box-apps-menu > li > a')).then();
                for (var i = 0; i < links.length; i++) {

                    //click on selected option in menu
                    yield driver.findElements(By.css('#box-apps-menu > li > a')).then(function(links) {
                        links[i].click().then();
                    });
                    //find child menu elements as array
                    var underLinks =  yield driver.findElements(By.css('.docs a')).then();
                        for (var j = 0; j < underLinks.length; j++) {

                            //click on selected option in child menu
                            yield driver.findElements(By.css('.docs a')).then(function(underLinks) {
                                underLinks[j].click().then();

                            });
                            //assert by finding h1 on the page
                            driver.wait(until.elementLocated(By.css('h1')));
                    }
                }
            });
            }
        catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());

    });
