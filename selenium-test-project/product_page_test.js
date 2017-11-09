const {Builder, By} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

//function allows to split rgba format to separate values
function split_rgba_to_colors(colorString) {
    let colorsOnly = colorString.split(")")[0].split("(")[1].split(","),
        red = parseInt(colorsOnly[0]),
        green = parseInt(colorsOnly[1]),
        blue = parseInt(colorsOnly[2]),
        opacity = parseFloat(colorsOnly[3]);

    return [red, green, blue, opacity];
}

test.describe('Product page tests', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    try {
        test.it('checks if every product has only one label', function* () {
            //go to main page
            yield driver.get('http://localhost:8080/litecart/');

            //find all products array
            var products = yield driver.findElements(By.css('div.middle > div.content li.product')).then();

            for (var i = 0; i < products.length; i++) {
                //find amounts of stickers for each product
                var stickerAmount = yield products[i].findElements(By.css('div.image-wrapper > div.sticker')).then();
                if (stickerAmount.length !== 1) {
                    throw new Error('Unexpected amount of stickers!');
                }
             }
        });

        test.it('checks if product information is the same on the main and product pages', function* () {
            yield driver.get('http://localhost:8080/litecart/en/').then();
            //take the first product from campaigns section
            var  product = yield driver.findElement(By.css('#box-campaigns  li:first-child')).then();

            var productNameMain = yield driver.findElement(By.css('#box-campaigns li:first-child div.name')).getAttribute("textContent").then();
            //find prices attributes
            var productPriceMain = yield driver.findElement(By.css('#box-campaigns li:first-child s.regular-price')).getAttribute("textContent").then();
            var regularPriceColorMain = yield driver.findElement(By.css('#box-campaigns li:first-child s.regular-price')).getCssValue("color").then();
            var regularPriceShapeMain = yield driver.findElement(By.css('#box-campaigns li:first-child s.regular-price')).getCssValue("text-decoration").then();
            var regularPriceSizeMain = yield driver.findElement(By.css('#box-campaigns li:first-child s.regular-price')).getCssValue("font-size").then();

            var salePriceMain = yield driver.findElement(By.css('#box-campaigns li:first-child strong.campaign-price')).getAttribute("textContent").then();
            var salePriceColorMain = yield driver.findElement(By.css('#box-campaigns li:first-child strong.campaign-price')).getCssValue("color").then();
            var salePriceShapeMain = yield driver.findElement(By.css('#box-campaigns li:first-child strong.campaign-price')).getCssValue("font-weight").then();
            var salePriceSizeMain = yield driver.findElement(By.css('#box-campaigns li:first-child strong.campaign-price')).getCssValue("font-size").then();

            //find particular colors from rgb
            var colorsRegular = split_rgba_to_colors(regularPriceColorMain);
            var colorsSale = split_rgba_to_colors(salePriceColorMain);

            //verify prise style
            if (salePriceMain >= productPriceMain) {
                throw new Error('Regular price should be less!');
            }
            if (regularPriceSizeMain >= salePriceSizeMain) {
                throw new Error('Regular price size should be less!');
            }
            //check r=g=b as gray; have to slice text decoration in chrome
            if (colorsRegular[0] !== colorsRegular[1] || colorsRegular[1] !== colorsRegular[2]  || regularPriceShapeMain.slice(0, 12) !== 'line-through') {
                throw new Error('Regular price style is wrong!');
            }
            //check g=b=0 as red; bold is a number in ie and ff (900 in this case)
            if (colorsSale[1] !== 0 || colorsSale[2] !== 0 || (salePriceShapeMain !== 'bold' && salePriceShapeMain !== ('900'))) {
                throw new Error('Sale price style is wrong!');
            }
            //open product page
            product.click().then();

            //find the same attributes
            var productName = yield driver.findElement(By.css('#box-product h1')).getAttribute("textContent").then();

            var productPrice = yield driver.findElement(By.css('#box-product s.regular-price')).getAttribute("textContent").then();
            var regularPriceColor = yield driver.findElement(By.css('#box-product s.regular-price')).getCssValue("color").then();
            var regularPriceShape = yield driver.findElement(By.css('#box-product s.regular-price')).getCssValue("text-decoration").then();
            var regularPriceSize = yield driver.findElement(By.css('#box-product s.regular-price')).getCssValue("font-size").then();

            var salePrice = yield driver.findElement(By.css('#box-product strong.campaign-price')).getAttribute("textContent").then();
            var salePriceColor = yield driver.findElement(By.css('#box-product strong.campaign-price')).getCssValue("color").then();
            var salePriceShape = yield driver.findElement(By.css('#box-product strong.campaign-price')).getCssValue("font-weight").then();
            var salePriceSize = yield driver.findElement(By.css('#box-product strong.campaign-price')).getCssValue("font-size").then();

            //find particular colors from rgb
            colorsRegular = split_rgba_to_colors(regularPriceColor);
            colorsSale = split_rgba_to_colors(salePriceColor);

            if (productName !== productNameMain){
                throw new Error('Product name on main page and on product page are different!')
            }
            if (salePrice >= productPrice) {
                throw new Error('Regular price should be less!')
            }
            if (regularPriceSize >= salePriceSize) {
                throw new Error('Regular price size should be less!')
            }
            //check r=g=b as gray
            if (colorsRegular[0] !== colorsRegular[1] || colorsRegular[1] !== colorsRegular[2] || regularPriceShape.slice(0, 12) !== 'line-through') {
                throw new Error('Regular price style is wrong!')
            }
            //check g=b=0 as red
            if (colorsSale[1] !== 0 || colorsSale[2] !== 0 || (salePriceShape !== 'bold' && salePriceShape !== ('900'))) {
                throw new Error('Sale price style is wrong!')
            }
        });


    }
    catch (e) {
        console.log(e)
    }

test.after(() => driver.quit());

});
