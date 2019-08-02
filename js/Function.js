function startNotificationListLoop() {
    var api = new CybozuAPI();
    let timer = new CybozuTimer();

    var start = new Date(Date.now().valueOf() - 30 * Constants.DAY_MILLISECOND);
    var end = new Date(Date.now().valueOf());

    timer.startTimer(function () {
        api.notificationList(start, end, function (resp) {
            if (resp.success) {
                for (let element of resp.schedule) {
                    let notificationID = "scheudle" + element.id;
                    CybozuNotifier.notify(notificationID, element.title, element.body, function (nid) {
                        if (nid == notificationID) {
                            chrome.tabs.create({ url: element.url });
                        }
                    });
                }
            }

            api.scheduleEventList(start, end, function (resp) {
            });
        });
        start = new Date(Date.now().valueOf() - storage.updateInterval * Constants.MINUTE_MILLISECOND);
        end = new Date(Date.now().valueOf());

    }, storage.updateInterval * Constants.MINUTE_MILLISECOND);
}
