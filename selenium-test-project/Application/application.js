const {Builder, driver} = require('selenium-webdriver'),
    registration_page = require('../Pages/registration_page'),
    admin_login_page = require('../Pages/admin_login_page'),
    user_list_page = require('../Pages/user_list_page');
    cart_page = require('../Pages/cart_page');

class Application {

    constructor() {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
        this.registrationPage = new registration_page.RegistrationPage(this.driver);
        this.adminPanelLoginPage = new admin_login_page.AdminPanelLoginPage(this.driver);
        this.userListPage = new user_list_page.UserListPage(this.driver);
        this.cartPage = new cart_page.CartPage(this.driver);
    }

    quit() {
        this.driver.quit();
    }

    registerNewUser(user) {
        this.registrationPage.open();
        this.registrationPage.firstnameInput().sendKeys(user.firstname);
        this.registrationPage.lastnameInput().sendKeys(user.lastname);
        this.registrationPage.address1Input().sendKeys(user.address);
        this.registrationPage.postcodeInput().sendKeys(user.postcode);
        this.registrationPage.cityInput().sendKeys(user.city);
        this.registrationPage.selectCountry(user.country);
        this.registrationPage.selectZone(user.zone);
        this.registrationPage.emailInput().sendKeys(user.email);
        this.registrationPage.phoneInput().sendKeys(user.phone);
        this.registrationPage.passwordInput().sendKeys(user.password);
        this.registrationPage.confirmedPasswordInput().sendKeys(user.password);
        this.registrationPage.createAccountButton().click();
    }

    getUserIds() {
        let ap = this.adminPanelLoginPage;
        ap.open().onThisPageDo(function () {
            ap.enterUsername("admin").enterPassword("admin").submitLogin();
        });
        return this.userListPage.open().getUserIds();
    }

    async addProduct() {
        this.cartPage.open();
        this.cartPage.findProduct();
        this.cartPage.checkQuantity();
       await this.cartPage.setSize();
       await this.cartPage.addToCart();
       await this.cartPage.checkQuantityAgain();
    }

    verifyQuantity() {
        if ((this.cartPage.checkQuantityAgain() - this.cartPage.checkQuantity()) !== 1) {
            this.driver.sleep(2000).then(); //temporally solution, probably need to update with ajax completeness waiting
        }
        return this;
    }

    getCartPage(){
        return this.cartPage;
    }


}

exports.Application = Application;
