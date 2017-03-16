(function(){
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();
    var tasks = $firebaseArray(ref);

    var addTask = function(newTask) {
      tasks.$add({
        name: newTask,
        date: Firebase.ServerValue.TIMESTAMP
      });
    }

    return {
      createTask : addTask,
      deleteTask : function(task) {
        tasks.$remove(task);
      },
      all: tasks
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
