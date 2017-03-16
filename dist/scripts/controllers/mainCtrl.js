(function(){
  function mainCtrl($interval, $scope) {

    const WORK_TIME = 5;
    const BREAK_TIME = 2;
    const LONG_BREAK_TIME = 4;

    var mySound1 = new buzz.sound( "/assets/sounds/Alarm1.mp3", {
      preload: true
    });

    var mySound2 = new buzz.sound( "/assets/sounds/Alarm2.mp3", {
      preload: true
    });

    var mySound3 = new buzz.sound( "/assets/sounds/Alarm3.mp3", {
      preload: true
    });

    var timer;
    var completedSessions = 0;
    var self = this;
    $scope.self = self;

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

    // $scope.$watch('self.time', function(){
    //   console.log(self.time);
    //   if(self.time === 0) {
    //     mySound1.play();
    //   }
    // });

    var countdown = function(){
      self.time -= 1;
      self.buttonName = "Reset";

      if(self.time <= 0) {
        if(!self.onBreak) {
          mySound1.play();
          completedSessions++;
        }
        else if(self.onBreak) {
          mySound2.play();
        }
        else{
          mySound3.play();
        }
        self.onBreak = !self.onBreak;
        setTimer();
      }
    };

    var setTimer = function(){
      $interval.cancel(timer);

      self.buttonName = "Start";

      if(self.onBreak) {
        if (completedSessions % 2 === 0) {
          self.time = LONG_BREAK_TIME;
        } else {
          self.time = BREAK_TIME;
        };
      } else {
        self.time = WORK_TIME;
      }
    };
  }

  angular
    .module('blocTime')
    .controller('mainCtrl', ['$interval','$scope', 'Tasks', mainCtrl]);
})();
