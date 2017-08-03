var config = {
  apiKey: "AIzaSyB_VI5NMsyXR9mtCJ2Ug-Dr9IC0_wLVm2g",
  authDomain: "train-scheduler-f5259.firebaseapp.com",
  databaseURL: "https://train-scheduler-f5259.firebaseio.com",
  projectId: "train-scheduler-f5259",
  storageBucket: "",
  messagingSenderId: "381686261295"
};

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#submit-train").on("click", function(event) {
  event.preventDefault();

  // Get the input values
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainTime = $("#train-time").val().trim();
  var trainFrequency = parseInt($("#train-frequency").val().trim());
  var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var minutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");

  // Log the train data
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(nextTrain);
  console.log(minutesTillTrain);


});
