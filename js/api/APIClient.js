class APIClient {

    post(url,data,callback) {

        // console.log(Constants.BASIC_USERNAME + ":" + Constants.BASIC_PASSWORD);
        
        // console.log("Basic " + btoa(Constants.BASIC_USERNAME + ":" + Constants.BASIC_PASSWORD));

        $.ajax(url, {
            data : data,
            method: "POST",
            // beforeSend : function(xhr) {
            //     xhr.setRequestHeader("Authorization", "Basic " + btoa(Constants.BASIC_USERNAME + ":" + Constants.BASIC_PASSWORD));
            // },
            success: callback
        });
    };
}