$(function() {
  const url = "http://localhost:3000";

  // fetch employees from json db
  let getEmployees = () => {
    $.ajax({
      type: "GET",
      url: `${url}/employees`,
      dataType: "json",
      success: result => {
        let records = "";
        let employees = "";
        let total = result.length;

        $("#numberOfemployees").html(total);

        for (var i in result) {
          records += `<tr id='${result[i].id}'>
                      <td class='table-rows'>${result[i].id}</td>
                      <td class='table-rows'>${result[i].firstName}</td>
                      <td class='table-rows'>${result[i].lastName}</td>
                      <td class='table-rows'>${result[i].email}</td>
                      <td class='table-rows'>${result[i].gender}</td>
                      <td><button class='btn btn-danger'>delete</button></td></tr>
                  `;

          employees += `<a class='btn btn-outline-success m-1' id='${
            result[i].firstName
          } ${result[i].lastName}' onclick='attndBtn(this.id)'>${
            result[i].firstName
          } ${result[i].lastName}</a>`;
        }

        $("#employeesTableBody").html(records);
        $("#employeesAttendance").html(employees);
      },
      error: err => console.log("error", err)
    });
  };

  // get meetings history from db
  let getHistory = () => {
    $.ajax({
      type: "GET",
      url: `${url}/meetings`,
      dataType: "json",
      success: result => {
        let history = "";
        let total = result.length;

        $("#totalMeetings").html(total);

        for (var i in result) {
          history += `<tr>
                      <td>${result[i].id}</td>
                      <td>${result[i].title}</td>
                      <td><button class='btn btn-info viewId'>view</button></td></tr>
                 `;
        }

        $("#meetingsTableBody").html(history);
      },
      error: err => console.log("error", err)
    });
  };

  $(document).on("click", ".table-rows", function() {
    let id = $(this)
      .parent()
      .attr("id");

    $.ajax({
      type: "GET",
      url: `${url}/employees/${id}`,
      success: data => {
        $("#employeeNumber").text(`${data.id}`);
        $("#employeeGender").text(`${data.gender}`);
        $("#employeeName").text(`${data.firstName} ${data.lastName}`);
        $("#employeeMail").text(`${data.email}`);
        $(".myBtn").click();
      },
      error: e => console.log(e)
    });
  });

  // create/save employee
  $("#saveEmployee").on("click", e => {
    e.preventDefault();

    var employee = {
      firstName: $("input#first_name").val(),
      lastName: $("input#last_name").val(),
      email: $("input#email").val(),
      gender: $("input#gender").val(),
      attendance: []
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(employee),
      url: "http://localhost:3000/employees",
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        console.log("saved", data);
        $("#closeModal").click();
        getEmployees();
      },
      error: function(e) {
        console.error("err", e);
      }
    });
  });

  // attendance record
  $("#saveEmployeeAttendance").on("click", e => {
    e.preventDefault();
    let title = $("#meetingTitle").val();
    if (!title) return;

    let meeting = {
      title: title,
      attendees: attendees
    };

    $.ajax({
      type: "POST",
      url: `${url}/meetings`,
      data: JSON.stringify(meeting),
      dataType: "json",
      contentType: "application/json",
      success: res => {
        console.log("success", res);
        $("#closeMeetingModal").click();
        getEmployees();
        $("#meetingTitle").val("");
      },
      error: err => {
        console.log("error", err);
      }
    });
  });

  getEmployees();
  getHistory();
}); //end jq

// mark attendance
let attendees = [];
function attndBtn(id) {
  document.getElementById(id).style.cssText =
    "background-color:lightgreen;color: white;";
  attendees.push(id);
}

// Get the modal
var modal = document.getElementById("myModal");
var btn = document.querySelector(".myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
