const target = require('../Application/application'),
    test = require('selenium-webdriver/testing');


test.describe('User registration', function () {
    let app;
    this.timeout(10000);

    test.before(function *() {
        app = new target.Application();
    });

    try {
        test.it('Add 3 products to cart and delete all', function* () {

            for (let i = 0; i < 3; i++) {
                yield app.addProduct();
                yield app.verifyQuantity();
            }

            yield app.cartPage.checkout();
            let size = yield app.cartPage.summaryLength();
            for (let j = 0; j < size.length; j++) {
                yield app.cartPage.removeItem();
            }

            yield app.cartPage.verifyCartIsEmpty();
        });
    }
    catch (e) {
            console.log(e)
        }

    test.after(() => app.quit());

});
