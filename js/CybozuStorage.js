class CybozuStorage {

    constructor(){
        this.alreadyLogin = false;
        this.updateInterval = 10; //minutes
        this.alarmTime = 5; //minutes
        this.storage = Chrome.storage.local;
    }

    static sharedInstance() {
        if(!this.instance) {
            this.instance = new CybozuStorage();
            self._loadAll();
        }
        return this.instance;
    }

    static save() {
        this.storage.set({
            "alreadyLogin": this.alreadyLogin,
            "updateInterval": this.updateInterval,
            "alarmTime": this.alarmTime
        });
    }

    // private ===========================
    _loadAll() {
        this._loadProperty("alreadyLogin", false);
        this._loadProperty("updateInterval", 10);
        this._loadProperty("alarmTime", 5);
    }

    _loadProperty(name, defaultValue) {
        this.storage.get(name, function(results) {
            if (results[name]) {
                this[name] = results[name];
            }
            else {
                this[name] = defaultValue;
            }
        });
    }

    // _saveProperty(name, value) {
    //     this.

    // }

}