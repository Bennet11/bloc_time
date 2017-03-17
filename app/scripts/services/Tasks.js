(function(){
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();
    var tasks = $firebaseArray(ref);

    var addTask = function(task) {
      tasks.$add({
        name: task,
        date: firebase.database.ServerValue.TIMESTAMP
      });
    }

    var deleteTask = function(task) {
      tasks.$remove(task);
    };

    return {
      createTask : addTask,
      remove : deleteTask,
      all: tasks
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
