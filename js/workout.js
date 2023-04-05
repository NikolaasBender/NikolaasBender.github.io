
// define a workout class with the following properties:
// name, max_sets, min_sets, max_reps, min_reps, difficulty, and sub variants (if any)
class Workout {
    // take the json object and create a workout object
    constructor(workout_data) {
        this.name = workout_data.name;
        this.max_sets = workout_data.max_sets;
        this.min_sets = workout_data.min_sets;
        this.max_reps = workout_data.max_reps;
        this.min_reps = workout_data.min_reps;
        this.difficulty = workout_data.difficulty;
    }
}


// load the workout data from workouts.js
// and create an array of workout objects
function loadWorkouts() {
    console.log("loadWorkouts");
    var workoutArray = [];
    // create a workout object for each workout in the list
    for (var i = 0; i < workout_datas.length; i++) {
        workoutArray.push(new Workout(workout_datas[i]));
    }
  return workoutArray;
}

// select a random set of workouts and their  from the array and return them
function selectWorkouts(workoutArray, numWorkouts) {
    var selectedWorkouts = [];
    var selectedIndexes = [];
    // select a random workout from the list
    for (var i = 0; i < numWorkouts; i++) {
        var index = Math.floor(Math.random() * workoutArray.length);
        // if the index has already been selected, try again
        while (selectedIndexes.includes(index)) {
            index = Math.floor(Math.random() * workoutArray.length);
        }
        selectedIndexes.push(index);
        selectedWorkouts.push(workoutArray[index]);
    }
    return selectedWorkouts;
}

// a recursive function to tone down the difficulty of an exercise
// if the total difficulty is too high
function toneDownWorkout(workout, desiredDifficulty, totalDifficulty) {
    // if the difficulty is too high, tone it down
    var final_workout = workout;
    
    var numSets = Math.floor(Math.random() * (workout.max_sets - workout.min_sets)) + workout.min_sets;
    var numReps = Math.floor(Math.random() * (workout.max_reps - workout.min_reps)) + workout.min_reps;
    var difficulty = workout.difficulty * numSets * numReps;
    if (totalDifficulty + difficulty > desiredDifficulty * 1.1) {
        final_workout = toneDownWorkout(workout, desiredDifficulty, totalDifficulty);
    }

    return final_workout;
}

// use the random set of workous to create a session for the user
// this will randomly initialize each selected workout with a number 
// of sets and reps such that the total score of difficulty is 
// within 10% to the user's desired difficulty
function createSession(selectedWorkouts, desiredDifficulty) {
    var session = [];
    var totalDifficulty = 0;
    for (var i = 0; i < selectedWorkouts.length; i++) {
        var workout = selectedWorkouts[i];
        var numSets = Math.floor(Math.random() * (workout.max_sets - workout.min_sets + 1)) + workout.min_sets;
        var numReps = Math.floor(Math.random() * (workout.max_reps - workout.min_reps + 1)) + workout.min_reps;
        var difficulty = workout.difficulty * numSets * numReps;
        if(totalDifficulty + difficulty > desiredDifficulty * 1.1){
            workout = toneDownWorkout(workout, desiredDifficulty, totalDifficulty);
            numSets = workout.numSets;
            numReps = workout.numReps;
            difficulty = workout.difficulty * numSets * numReps;
        }

        totalDifficulty += difficulty;
        session.push({
        name: workout.name,
        numSets: numSets,
        numReps: numReps,
        difficulty: difficulty
        });
    }
    console.log("total difficulty: " + totalDifficulty);
    return session;
}

// display the workout session to the user
// take a user's desired difficulty and create a session for them then display it
function displaySession(desiredDifficulty=400) {
    var T = document.getElementById("ptdiv");
    T.style.display = "block";
    console.log("displaySession");  
    var workoutArray = loadWorkouts();
    console.log(workoutArray);
    var selectedWorkouts = selectWorkouts(workoutArray, 3);
    console.log(selectedWorkouts);
    var session = createSession(selectedWorkouts, desiredDifficulty);
    console.log(session);
    var displayedDifficulty = 0;
    for (var i = 0; i < session.length; i++) {
        displayedDifficulty += session[i].difficulty;
    }
    var text_difficulty = "Difficulty: " + displayedDifficulty;
    var html = "";
    for (var i = 0; i < session.length; i++) {
        html += "<tr><td>" + session[i].name + "</td><td>" + session[i].numSets + "</td><td>" + session[i].numReps + "</td></tr>";
    }
    var table = document.getElementById("workout-table");
    table.innerHTML = html;
    var diff = document.getElementById("total-difficulty");
    diff.innerHTML = text_difficulty;
}

// // load the session when the page loads
// $(document).ready(function() {
//   displaySession(100);
// });

// // reload the session when the user clicks the refresh button
// $("#refresh-btn").click(function() {
//   displaySession(100);
// });

// reload the session when the user changes the difficulty
$("#difficulty").change(function() {
  displaySession($(this).val());
});

const workout_datas = [
    {
        "name": "band rotations",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 1
    },
    
    {
        "name": "band translations",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 1
    },
    
    //  are used to create a more complex workout object
    // for example, a workout object for a pushup might have  for different hand placements
    // the  would be a list of workout objects
    {
        "name": "pushups",
        "max_sets": 5,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 3
    },
    {
        "name": "pike pushup",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 5
    },
    {
        "name": "diamond pushup",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 3
    },
    {
        "name": "wide pushup",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 4,
    },
        
    // pullups
    {
        "name": "pullup",
        "max_sets": 3,
        "min_sets": 1,
        "max_reps": 10,
        "min_reps": 5,
        "difficulty": 3
    },
    {
        "name": "wide pullup",
        "max_sets": 3,
        "min_sets": 1,
        "max_reps": 10,
        "min_reps": 5,
        "difficulty": 4
    },
    {
        "name": "chinup (palms facing you)",
        "max_sets": 3,
        "min_sets": 1,
        "max_reps": 10,
        "min_reps": 5,
        "difficulty": 2
    },
    
    // bear crawls
    {
        "name": "bear crawl",
        "max_sets": 3,
        "min_sets": 1,
        "max_reps": 5,
        "min_reps": 3,
        "difficulty": 5
    },
    
    // shoulder touches
    {
        "name": "shoulder touch",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 15,
        "min_reps": 7,
        "difficulty": 3
    },
    {
        "name": "shoulder touch with pushup",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 15,
        "min_reps": 7,
        "difficulty": 3
    },
    {
        "name": "shoulder touch with rotation",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 15,
        "min_reps": 7,
        "difficulty": 3
    },

    {
        "name": "sun-gods (arm circles)",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 30,
        "min_reps": 15,
        "difficulty": 2
    },

    {
        "name": "chain breakers",
        "max_sets": 4,
        "min_sets": 2,
        "max_reps": 20,
        "min_reps": 10,
        "difficulty": 2
    }
    
];