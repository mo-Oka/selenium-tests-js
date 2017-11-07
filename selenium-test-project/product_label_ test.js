const {Builder, By} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Product label check', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    try {
        test.it('checks if every product has not more than one label', function* () {
            //go to main page
            yield driver.get('http://localhost:8080/litecart/');

            //find all products array
            var products = yield driver.findElements(By.css('div.middle > div.content li.product')).then();

            for (var i = 0; i < products.length; i++) {
                //find amounts of stickers for each product
                var stickerAmount = yield products[i].findElements(By.css('div.image-wrapper > div.sticker')).then();
                if (stickerAmount.length !== 1) {
                    throw new Error('Unexpected amount of stickers!')
                }
             }
        })
    }
    catch (e) {
        console.log(e)
    }

test.after(() => driver.quit());

});
