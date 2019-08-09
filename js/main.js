let storage = CybozuStorage.sharedInstance();
let api = new CybozuAPI();
var bugout = new debugout()

if (0 < storage.url.length) {
    bugout.log("background -- Setting Already OK");

    api.login(storage.userName, storage.password, function(resp) {
        startNotificationListLoop();
    });
} else {
    bugout.log("background -- Setting Not OK");

    let timer = new CybozuTimer();
    timer.startTimer(function() {
        storage._loadProperty("url", "");
        if (0 < storage.url.length) {
            timer.stopTimer();
            bugout.log("background -- Setting OK");
            startNotificationListLoop();
        }
    }, storage.updateInterval * Constants.MINUTE_MILLISECOND);
}
