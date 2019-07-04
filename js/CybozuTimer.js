class CybozuTimer {

    constructor(){
        this.timer = null;
    }
    
    startTimer(runFunction, interval) {
        if (this.timer == null) {
            this.timer = setInterval(() => {
                runFunction();
            }, interval);
        }
    }

    stopTimer() {
        clearInterval(this.timer)
    }
}