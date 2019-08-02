class APIClient {

    post(url,data,callback,error) {

        $.ajax(url, {
            data : data,
            method: "POST",
            // beforeSend : function(xhr) {
            //     xhr.setRequestHeader("Authorization", "Basic " + btoa(Constants.BASIC_USERNAME + ":" + Constants.BASIC_PASSWORD));
            // },
            success: callback,
            error: error
        });
    };
}