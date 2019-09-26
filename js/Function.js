
function startNotificationListLoop() {
    var api = new CybozuAPI();
    let timer = new CybozuTimer();

    var start = new Date(Date.now().valueOf() - 30 * Constants.DAY_MILLISECOND);
    var end = new Date(Date.now().valueOf());

    timer.startTimer(function () {
        api.notificationList(start, end, function (resp) {
            if (resp.success) {

                let dataKeys = []; //有数据的Key
                let notificationCount = 0;
                for (let key of Object.keys(resp)) {
                    let value = resp[key];
                    if (Array.isArray(value) && 0 < value.length) {
                        notificationCount += value.length;
                        dataKeys.push(key);
                    }
                }

                bugout.log("background -- startNotificationListLoop -- notificationCount: " + notificationCount);
                if (Constants.MAX_NOTIFICATION_COUNT < notificationCount) {
                    let notificationID = "To_Much_Notification";
                    CybozuNotifier.notify(notificationID, "Notifications", "You got " + notificationCount + " notifications", function(nid) {
                        if (nid == notificationID) {
                            chrome.tabs.create({url: storage.url + "notification/"});
                        }
                    });
                }
                else {
                    for(let key of dataKeys) {
                        let values = resp[key];
                        if (Array.isArray(values)) {
                            setupNotifier(key, resp[key]);
                        }
                    }
                }
                
            }
        });
        start = new Date(Date.now().valueOf() - storage.updateInterval * Constants.MINUTE_MILLISECOND);
        end = new Date(Date.now().valueOf());

    }, storage.updateInterval * Constants.MINUTE_MILLISECOND);
}

function setupNotifier(key, value) {

    if (0 < value.length) {
        bugout.log("background -- setupNotifier - " + key + " count: " + value.length);
    }
    
    for (let element of value) {
        let notificationID = key + "-" + element.id + "-" + element.receivedAt;
        bugout.log("     -- setupNotifier - notificationID: " + notificationID);
        CybozuNotifier.notify(notificationID, element.title, element.body, function (nid) {
            if (nid == notificationID) {
                chrome.tabs.create({ url: element.url });
            }
        });
    }
}

