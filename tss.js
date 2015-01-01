/* Overglider technique training */
var initialData = [
  {    
    swimTrainingPartTime : 'Warming-up',
    swimTrainingPartRest : '30',
    swimSets : [
      {
        swimSet: "Basic warming-up",
        swimRepeats: "", 
        swimDistance: "",
        swimTime: "", 
        swimRest: "10",
        swimMinRepeats: "1",
        swimMaxRepeats: "5",
        swimExercises : [
          {
            swimExercise: 'f/s exhale right',
            swimRepeats: '',
            swimDistance: '50',
            swimIntensity: '0.7',
            swimTime: '',
            swimRest: '0',
            swimMinRepeats: '1',
            swimMaxRepeats: '1',
            swimTSSModifier: '1.0',
          },
        ],
      },
    ],
  },
];

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  if (!array)
    return false;

  if (this.length != array.length)
    return false;

  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;       
    }           
    else if (this[i] != array[i]) { 
      return false;   
    }           
  }       
  return true;
}

var TrainingStressScore = function(functionalSwimmingPace, distance, time) {
  var averagePace = distance / time * 60;
  var intensityFactor = averagePace/functionalSwimmingPace;

  if (distance == 0 || time == 0) {
    return 0.0;
  }

  return intensityFactor * intensityFactor * intensityFactor * (time / (60*60)) * 100;
};

var ExercisesModel = function(exercises) {
  this.swimExercises = ko.observableArray(ko.utils.arrayMap(exercises, function(exercise) {
    return {
      swimExercise : exercise.swimExercise,
      swimRepeats : exercise.swimRepeats,
      swimDistance : exercise.swimDistance,
      swimIntensity : exercise.swimIntensity,
      swimTime : exercise.swimTime,
      swimRest : exercise.swimRest,
      swimMinRepeats : exercise.swimMinRepeats,
      swimMaxRepeats : exercise.swimMaxRepeats,
      swimTSSModifier : exercise.swimTSSModifier,
    }
  }));

  this.addExercise = function(exercise) {
    this.swimExercises.push({
      swimExercise : '',
      swimRepeats : '',
      swimDistance : '',
      swimIntensity : '',
      swimTime : '',
      swimRest : '',
      swimMinRepeats : '',
      swimMaxRepeats : '',
      swimTSSModifier : '',
    });
  }

  this.removeExercise = function(exercise) {
    this.swimExercises.remove(exercise);
  };
}

var SetsModel = function(sets) {
  this.swimSets = ko.observableArray(ko.utils.arrayMap(sets, function(set) {
    return {
      swimSet : set.swimSet,
      swimRepeats : set.swimRepeats,
      swimDistance : set.swimDistance,
      swimTime : set.swimTime,
      swimRest : set.swimRest,
      swimMinRepeats : set.swimMinRepeats,
      swimMaxRepeats : set.swimMaxRepeats,
      swimExercises : ko.applyBindings(new ExercisesModel(set.swimExercises)),
    }
  }));

  this.addSet = function(set) {
    this.swimSets.push({
      swimSet : '',
      swimRepeats : '',
      swimDistance : '',
      swimTime : '',
      swimRest : '',
      swimMinRepeats : '',
      swimMaxRepeats : '',
      swimExercises : ko.applyBindings((new ExercisesModel()).addExercise(0)),
    });
  };

  this.removeSet = function(set) {
    this.swimSets.remove(set);
  };
}

var TrainingPartsModel = function(trainingparts) {
  //this.functionalSwimmingPace = ko.observable("75"); 
  //this.trainingStressScore = ko.observable("60"); // 34
  //this.trainingTime = ko.observable("50"); // 23
  //this.totalDistance = ko.observable("");
  //this.totalTrainingTime = ko.observable("");
  //this.totalTrainingStressScore = ko.observable("");

  this.swimTrainingParts = ko.observableArray(ko.utils.arrayMap(trainingparts, function(trainingpart) {
    return {
      swimTrainingPart : trainingpart.swimTrainingPartTime,
      swimTrainingPartTime : trainingpart.swimTrainingPartTime,
      swimTrainingPartRest : trainingpart.swimTrainingPartRest,
      swimSets : ko.applyBindings(new SetsModel(trainingparts.swimSets)),
    }
  }));

  this.addTrainingPart = function() {
    this.swimTrainingParts.push({
      swimTrainingPart : '',
      swimTrainingPartTime : '',
      swimTrainingPartRest : '',
      swimSets : ko.applyBindings((new SetsModel()).addSet(0))
    });
  }

  this.removeTrainingPart = function(trainingpart) {
    this.swimTrainingParts.remove(trainingpart);
  }
}
 
ko.applyBindings(new TrainingPartsModel(initialData));
