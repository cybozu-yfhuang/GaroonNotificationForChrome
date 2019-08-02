let storage = CybozuStorage.sharedInstance();
let api = new CybozuAPI();

if (0 < storage.url.length) {
    api.login(storage.userName, storage.password, function(resp) {
        startNotificationListLoop();
    });
} else {
    let timer = new CybozuTimer();
    timer.startTimer(function() {
        storage._loadProperty("url", "");
        if (0 < storage.url.length) {
            timer.stopTimer();
            console.log("Setting OK");
            startNotificationListLoop();
        }
    }, storage.updateInterval * Constants.MINUTE_MILLISECOND);
}
