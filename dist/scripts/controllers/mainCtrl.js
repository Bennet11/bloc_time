(function(){
  function mainCtrl($interval) {

    const WORK_TIME = 25;
    const BREAK_TIME = 5;
    const LONG_BREAK_TIME = 7;


    var timer;
    var completedSessions = 0;
    var self = this;
    this.onBreak = false;
    this.time = WORK_TIME;
    this.buttonName = "Start";

    this.startResetTimer = function() {
      if(self.buttonName === "Start") {
        $interval.cancel(timer);
        timer = $interval(countdown, 1000);
      } else {
        setTimer();
      }
    };

    var countdown = function(){
      self.time -= 1;
      self.buttonName = "Reset";

      if(self.time <= 0) {
        if(!self.onBreak) {
          completedSessions++;
        }
        self.onBreak = !self.onBreak;
        setTimer();
      }
    };

    var setTimer = function(){
      $interval.cancel(timer);

      self.buttonName = "Start";

      if(self.onBreak) {
        if (completedSessions % 4 === 0) {
          self.time = LONG_BREAK_TIME;
        } else {
          self.time = BREAK_TIME;
        }
      } else {
        self.time = WORK_TIME;
      }
    };



  }

  angular
    .module('blocTime')
    .controller('mainCtrl', ['$interval', mainCtrl]);
})();
