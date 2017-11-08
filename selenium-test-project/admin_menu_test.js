const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
// logging.installConsoleHandler();
// logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL);

    test.describe('Admin Menu', function () {
        let driver;
        this.timeout(100000);

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

            test.it('checks if countries are sorted ASC', function* () {
                yield driver.get('http://localhost:8080/litecart/admin/?app=countries&doc=countries');

                //find amount of countries
                var  countriesTable = yield driver.findElements(By.css('#content tr.row')).then();
                for (var i = 0; i < countriesTable.length - 1; i++) { // 'length - 1' is a temporary solution to avoid 'out of array index' problem

                    //have to refresh countriesTable array on next cycle iteration
                    countriesTable = yield driver.findElements(By.css('#content tr.row')).then();

                    //check if countries are ordered correctly
                    var countryName = yield countriesTable[i].findElement(By.css('#content tr.row a')).getAttribute("textContent").then();
                    var nextCountryName = yield countriesTable[i+1].findElement(By.css('#content tr.row a')).getAttribute("textContent").then();

                    if(countryName > nextCountryName){
                        throw new Error('Countries order is wrong!')
                    }

                    else {
                        //check amount of zones and open country with != 0 zones
                        var countryLink = yield countriesTable[i].findElement(By.css('#content tr.row a')).then();
                        var countryZones = yield countriesTable[i].findElement(By.css('#content tr.row td:nth-child(6)')).getAttribute("textContent").then();

                        if (countryZones > 0) {
                            countryLink.click().then();

                            //find list of zones
                            var ZonesList = yield driver.findElements(By.css('#table-zones tr')).then();
                            for (var j = 1; j < ZonesList.length - 2; j++) { // 'length - 2' is a solution to cut off the footer row in the table

                                //check if zones are ordered correctly
                                var zoneName = yield ZonesList[j].findElement(By.css('#table-zones td:nth-child(3)')).getAttribute("textContent").then();
                                var nextZoneName = yield ZonesList[j+1].findElement(By.css('#table-zones td:nth-child(3)')).getAttribute("textContent").then();

                                if (zoneName > nextZoneName) {
                                    throw new Error('Zones order is wrong!')
                                }
                            }
                            yield driver.navigate().back();
                        }
                    }
                }
            });


            }
        catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());

    });
