//const {Builder, By, Key, logging, until} = require('selenium-webdriver');
//const test = require('selenium-webdriver/testing');

module.exports = (function(settings) {
    settings.test_workers = false;
    return settings;
})(require('./nightwatch.json'));


let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function () {
    let driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .usingServer("http://192.168.1.15:4444/wd/hub")
            .withCapabilities({ browserName: 'chrome' })
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



/*var ele=document.getElementById("productcontainer");
if(ele)
{
    tags=ele.getElementsByTagName("a");
    for(i=0;i<tags.length;i++)
    {
        if(tags[i])
        {
            tags[i].click();
        }
    }
}*/

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
                        .url('..') //'file:///home/user/test.html'
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


