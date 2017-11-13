const {Builder, By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Add new product', function () {
    let driver;
    this.timeout(10000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
        yield driver.get('http://localhost:8080/litecart/admin/?app=catalog&doc=catalog');
        yield driver.findElement(By.name('username')).sendKeys('admin');
        yield driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
    });

    try {
        test.it('Add new product on admin page', function* () {
            yield driver.findElement(By.linkText('Add New Product')).click();
            //enable product
            yield driver.findElement(By.css('input[name="status"][value="1"]')).click();
            //fill name
            yield driver.findElement(By.css('input[name="name[en]"]')).sendKeys('Super Duck');
            //fill product code
            yield driver.findElement(By.css('[name="code"]')).sendKeys('123asd');
            //check 'Rubber Ducks' checkbox category
            yield driver.findElement(By.css('input[type="checkbox"][value="1"]')).click();
            //select 'Rubber Ducks' default category in dropdown
            var category = yield driver.findElement(By.css('[name="default_category_id"]'));
            category.click();
            yield driver.executeScript("arguments[0].selectedIndex = 1", category);
            //check 'Unisex' checkbox product group gender
            yield driver.findElement(By.css('input[name="product_groups[]"][value="1-3"]')).click();
            //add quantity
            yield driver.findElement(By.css('input[name="quantity"]')).sendKeys('5');
            //upload pic with absolute path
            var path = process.cwd()+'\\selenium-test-project\\Img\\super_duck.jpg'; //function takes project path and add it to relative path
            yield driver.findElement(By.css('input[name="new_images[]"]')).sendKeys(path);
            //add data valid from
            yield driver.findElement(By.css('input[name="date_valid_from"]')).sendKeys('11112017');
            //add data valid to
            yield driver.findElement(By.css('input[name="date_valid_to"]')).sendKeys('11112018');

            //Move to information tab
            yield driver.findElement(By.linkText('Information')).click();
            yield driver.wait(until.elementLocated((By.css('[name="manufacturer_id"]')), 1000)).then();
            //select manufacturer in dropdown menu
            var manufacturer = yield driver.findElement(By.css('[name="manufacturer_id"]'));
            manufacturer.click();
            yield driver.executeScript("arguments[0].selectedIndex = 1", manufacturer);
            //fill Keywords
            yield driver.findElement(By.css('input[name="keywords"]')).sendKeys('Super, Duck, Kitty');
            //fill Short Description
            yield driver.findElement(By.css('input[name="short_description[en]"]')).sendKeys('Super Kitty Duck');
            //fill Description
            yield driver.findElement(By.css('div.trumbowyg-editor')).sendKeys('This duck looks like Hello Kitty! Super!');
            //fill Head Title
            yield driver.findElement(By.css('input[name="head_title[en]"]')).sendKeys('Super Kitty');
            //fill Meta Description
            yield driver.findElement(By.css('input[name="meta_description[en]"]')).sendKeys('Super Duck');

            //Move to price tab
            yield driver.findElement(By.linkText('Prices')).click();
            yield driver.wait(until.elementLocated((By.css('[name="purchase_price"]')), 2000));
            //select currency in dropdown menu
            var currency = yield driver.findElement(By.css('[name="purchase_price_currency_code"]'));
            currency.click();
            yield driver.executeScript("arguments[0].selectedIndex = 1", currency);
            //fill Purchase Price
            yield driver.findElement(By.css('input[name="purchase_price"]')).sendKeys('666');
            //fill Price
            yield driver.findElement(By.css('input[name="prices[USD]"]')).sendKeys('999');

            //save product
            yield driver.findElement(By.css('button[name="save"]')).click();
            //check by assert notice  Changes saved
            let notice = yield driver.findElement(By.xpath("//*[contains(., 'Changes saved')]"));
            yield driver.wait(until.elementIsVisible(notice), 10000/*ms*/).then();
            //assert Super Duck
            yield driver.findElement(By.linkText('Super Duck')).then();

        })
    }
    catch (e) {
            console.log(e)
        }

        test.after(() => driver.quit());

    });