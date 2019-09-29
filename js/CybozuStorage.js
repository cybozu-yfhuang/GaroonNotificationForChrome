class CybozuStorage {

    constructor(){
        this.url = "";
        this.userName = "";
        this.password = "";

        this.alreadyLogin = false;
        this.updateInterval = 10; //minutes
        this.alarmTime = 5; //minutes
        this.storage = localStorage;
    }

    static sharedInstance() {
        if(!this.instance) {
            this.instance = new CybozuStorage();
            this.instance._loadAll();
        }
        return this.instance;
    }

    save() {
        this.storage.setItem("url", this.url);
        this.storage.setItem("userName", this.userName);
        this.storage.setItem("password", this.password);

        this.storage.setItem("alreadyLogin", this.alreadyLogin);
        this.storage.setItem("updateInterval", this.updateInterval);
        this.storage.setItem("alarmTime", this.alarmTime);
    }

    // private ===========================
    _loadAll() {
        this._loadProperty("url", "");
        this._loadProperty("userName", "");
        this._loadProperty("password", "");

        this._loadProperty("alreadyLogin", false);
        // this._loadProperty("updateInterval", 20);
        this._loadProperty("updateInterval", 2);
        this._loadProperty("alarmTime", 5);
    }

    _loadProperty(name, defaultValue) {
        let value = this.storage.getItem(name);
        if (!value) {
            this[name] = defaultValue;
        }
        else {
            this[name] = value;
        }
    }
}