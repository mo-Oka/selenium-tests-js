const {Builder, By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Load music list from VK', function () {
    let driver;
    this.timeout(10000000);

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    test.it('Add new product on admin page', function* () {
        yield driver.get('PutHereLinkToYourAudioVK!!!!<---!!!!');
        let email = yield driver.findElement(By.css('#email'));
        email.click();
        email.sendKeys('PutHereYourLogin!!!!<---!!!!', Key.TAB).then();

        yield driver.findElement(By.css('#pass')).sendKeys('PutHereYourPassword!!!!<---!!!!', Key.ENTER).then();

        yield driver.wait(until.titleIs('Моя музыка'), 15000); //or change to you language title

        for (let i = 0 ; i < 50; i++){ //specify i < your amount of songs/10
            yield driver.executeScript("window.scrollBy(0,950)", "");
            driver.sleep(500);
        }

        let list = yield driver.findElements(By.css('.audio_row__performer_title')).then();
        for (let i = 0; i < list.length; i++) {
            let performersList = yield driver.findElements(By.css('.audio_row__performer'));
            let titlesList = yield driver.findElements(By.css('.audio_row__title_inner'));

            let performer = yield performersList[i].getAttribute("textContent").then();
            let title = yield titlesList[i].getAttribute("textContent").then();

            console.log(performer + '  ' + title);
        }
    });

    test.after(() => driver.quit());

});