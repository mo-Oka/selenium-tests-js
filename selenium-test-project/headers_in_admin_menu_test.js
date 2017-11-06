const {Builder, By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');



    test.describe('Admin Menu', function () {
        let driver;
        this.timeout(10000);
        let selectedMenuElement;

        test.before(function *() {
            driver = yield new Builder().forBrowser('chrome').build();
        });

        try {
            test.it('checks if there h1 in every menu option', function* () {
                //login by admin
                yield driver.get('http://localhost:8080/litecart/admin');
                yield driver.findElement(By.name('username')).sendKeys('admin');
                yield driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
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
                        yield driver.findElement(By.css('h1'));
                    }
                }
            });
        }
        catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());

    });
