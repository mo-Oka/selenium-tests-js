const webdriver = require('selenium-webdriver');

const By = webdriver.By,
    until = webdriver.until;

class UserListPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get("http://localhost:8080/litecart/admin/?app=customers&doc=customers");
        return this;
    }

    userRows() {
        return this.driver.findElements(By.css("table.dataTable tr.row"));
    }

    getUserIds() {
        let ids = [];
        return this.userRows().then(function(rows) {
            for (let i=0; i < rows.length; i++) {
                rows[i].findElements(By.css("td")).then(function(cells) {
                    cells[2].getText().then(function(txt) {
                        ids.push(txt);
                    });
                });
            }
        });
        return ids;
    }

}

exports.UserListPage = UserListPage;

