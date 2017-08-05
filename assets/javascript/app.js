var config = {
  apiKey: "AIzaSyB_VI5NMsyXR9mtCJ2Ug-Dr9IC0_wLVm2g",
  authDomain: "train-scheduler-f5259.firebaseapp.com",
  databaseURL: "https://train-scheduler-f5259.firebaseio.com",
  projectId: "train-scheduler-f5259",
  storageBucket: "",
  messagingSenderId: "381686261295"
};

firebase.initializeApp(config);

var data = firebase.database().ref();

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     data.child(getKey).remove();
});
if (data != null) {
  data.on("child_added", function(childSnapshot) {
    $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.val().postId + "'" + ">" +
      "<td class='col-xs-3'>" + childSnapshot.val().trainName +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().trainDestination +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().trainFrequency +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().trainTime + // Next Arrival Formula ()
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
      "</td>" +
      "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
      "</tr>"
    );
  });
}
// --------------------------------------------------------------
// Whenever a user clicks the click button
$(document).ready(function() {
  $("#submit-train").on("click", function(event) {
    $('.train-schedule').empty();
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
    var nextTrainFormatted = moment(nextTrain).format("hh:mm A");

    // Log the train data
    /*console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(nextTrainFormatted);
    console.log(minutesTillTrain);*/
    var newPostRef = data.push();
    newPostRef.set({
      trainName: trainName,
      trainDestination: trainDestination,
      trainTime: trainTime,
      trainFrequency: trainFrequency,
      minutesTillTrain: minutesTillTrain,
      postId: newPostRef.key
    });
    $('.train-schedule').empty();
    $('.train-schedule').append("<tr><th class='col-xs-3'>Train Name</th>" +
                                "<th class='col-xs-2'>Destination</th>" +
                                "<th class='col-xs-2'>Frequency (min)</th>" +
                                "<th class='col-xs-2'>Next Arrival</th>" +
                                "<th class='col-xs-2'>Minutes Away</th></tr>");

    data.on("child_added", function(childSnapshot) {
      $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.val().postId + "'" + ">" +
        "<td class='col-xs-3'>" + childSnapshot.val().trainName +
        "</td>" +
        "<td class='col-xs-2'>" + childSnapshot.val().trainDestination +
        "</td>" +
        "<td class='col-xs-2'>" + childSnapshot.val().trainFrequency +
        "</td>" +
        "<td class='col-xs-2'>" + childSnapshot.val().trainTime + // Next Arrival Formula ()
        "</td>" +
        "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
        "</td>" +
        "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
        "</tr>"
      );
    });

  });
});