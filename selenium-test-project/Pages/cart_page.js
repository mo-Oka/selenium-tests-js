const {By, until, driver} = require('selenium-webdriver');

class CartPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get('http://localhost:8080/litecart/en/');
        return this;
    }

    findProduct() {
        //click on the first product from most popular section
        this.driver.findElement(By.css('#box-most-popular  li:first-child')).click();
        return this;
    }

    checkQuantity() {
        return this.driver.findElement(By.css('#cart span.quantity')).getAttribute("textContent").then();
    }

    async setSize() {
        //specify size if presented
        let size = await this.driver.findElements(By.css('[name="options[Size]"]'));
        if (size.length > 0) {
            size[0].click();
            await this.driver.executeScript("arguments[0].selectedIndex = 1", size[0]).then();
        }
        return this;
    }

    addToCart() {
        this.driver.findElement(By.css('[name="add_cart_product"]')).click().then();
        return this;
    }
    checkQuantityAgain() {
        return this.driver.findElement(By.css('#cart span.quantity')).getAttribute("textContent").then();
    }

    async checkout() {
        await this.driver.findElement(By.linkText('Checkout »')).click();
        return this;
    }

    async summaryLength() {
        return await this.driver.findElements(By.css('td.item'));
    }

    async removeItem() {
        await this.driver.findElement(By.css('button[name="remove_cart_item"]')).click();
        let product = await this.driver.findElement(By.css('td.item'));
        return await this.driver.wait(until.stalenessOf(product), 2000);
    }

    async verifyCartIsEmpty() {
        return await this.driver.findElement(By.xpath("//*[contains(., 'There are no items in your cart.')]"));
    }
}

exports.CartPage = CartPage;