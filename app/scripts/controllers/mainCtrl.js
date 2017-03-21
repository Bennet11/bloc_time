(function(){
  function mainCtrl($interval, $scope, Tasks) {

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
    this.taskList = Tasks.all;
    this.activeTask = null;


    this.newTask = function(name) {
      this.taskName = "";
      this.activeTask = {
        taskName: name,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        completed: false
      };
      this.setWorkSession();
      Tasks.createTask(this.activeTask);
    };

    this.removeTask = Tasks.remove;

    this.setActiveTask = function(task) {
      this.activeTask = task;
      this.activeTask.name = taskName;
    }

    this.setWorkSession = function(task) {
      this.startResetTimer();
      this.taskComplete();
    };

    this.taskComplete = function() {
      if(completedSessions % 5 === 0) {
        this.activeTask.completed = true;
      }
    };

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
          mySound1.play();
          completedSessions += 1;
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
        if (completedSessions % 4 === 0) {
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
