var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function () {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .withCapabilities({'marionette': true})
            .forBrowser('firefox')
            .build();
        driver.getCapabilities().then(function(caps) {
            console.log(caps);
        });
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


/*            module.exports = {
                'Iterate over elements and click them': function(browser) {

                    function iterate(elements) {
                        elements.value.forEach(function(el) {
                            browser.click(el.ELEMENT, function(r) {
                                browser.assert.ok(r.status === 0);
                            });
                        });
                    }

                    browser
                        .url('..')
                        .elements('css selector', 'div#box-apps-menu a', iterate)
                        .end();
                }
            };

            exports();*/

/*            yield driver.findElement(By.css('#box-apps-menu')).getAttribute("innerHTML").then(function(menu) {
                console.log(menu);
            });*/

//
//
// var x = document.getElementsByTagName("h1")[0].getAttribute("class");


