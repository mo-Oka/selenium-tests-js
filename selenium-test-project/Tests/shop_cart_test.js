const {Builder, By, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
//const assert = require('assert');


test.describe('Cart tests', function () {
    let driver;
    this.timeout(20000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    try {
        test.it('Add 3 products to cart and delete all', function* () {
            //add 3 products to cart
            for (let i = 0; i < 3; i++) {
                yield driver.get('http://localhost:8080/litecart/en/').then();
                //click on the first product from most popular section
                yield driver.findElement(By.css('#box-most-popular  li:first-child')).click();
                let quantityNumber = yield driver.findElement(By.css('#cart span.quantity')).getAttribute("textContent").then();

                //specify size if presented
                let size = yield driver.findElements(By.css('[name="options[Size]"]'));
                if (size.length > 0) {
                    size[0].click();
                    yield driver.executeScript("arguments[0].selectedIndex = 1", size[0]).then();
                }

                //add to cart
                yield driver.findElement(By.css('[name="add_cart_product"]')).click();
                //check if counter is updated and delay if not
                let quantityNumberNew = yield driver.findElement(By.css('#cart span.quantity')).getAttribute("textContent").then();
                if ((quantityNumberNew - quantityNumber) !== 1) {
                    driver.sleep(2000); //temporally solution, probably need to update with ajax completeness waiting
                }
            }

            //delete all products one by one
            yield driver.findElement(By.linkText('Checkout »')).click();
            let summaryLength = yield driver.findElements(By.css('td.item'));
            for (let j = 0; j < summaryLength.length; j++) {
                yield driver.findElement(By.css('button[name="remove_cart_item"]')).click();
                let product = yield driver.findElement(By.css('td.item'));
                yield driver.wait(until.stalenessOf(product), 2000).then();
            }
            //check if cart is empty
            yield driver.findElement(By.xpath("//*[contains(., 'There are no items in your cart.')]"));
        });
    }
    catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());
    });
