class CybozuNotifier {
    static notify(id, title, message, callback) {
        if (chrome.notifications) {
            chrome.notifications.getAll(function (nids) {

                if (!nids[id]) {
                    var opt = {
                        type: "basic",
                        iconUrl: '/images/Glogo.png',
                        title: title,
                        message: message
                    };
                    chrome.notifications.create(id, opt);
                    chrome.notifications.onClicked.addListener(function (notificationID) {
                        callback(notificationID);
                        chrome.notifications.clear(notificationID);
                    });
                }

            });
        }
    }

}