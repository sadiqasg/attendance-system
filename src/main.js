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
        let total = parseInt(result.length);

        $('#numberOfemployees').html(total);

        for (var i in result) {
          records += `<tr>
                      <td>${result[i].id}</td>
                      <td>${result[i].firstName}</td>
                      <td>${result[i].lastName}</td>
                      <td>${result[i].email}</td>
                      <td>${result[i].gender}</td>
                  `;

          records += `</tr>`;
        }

        $("#employeesTableBody").html(records);
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
        let total = parseInt(result.length);

        $('#totalMeetings').html(total);

        for (let i in result) {
          console.log(result[i].attendance[0].name);
        }
        // for (var i in result) {
        //   records += `<tr>
        //               <td>${result[i].id}</td>
        //               <td>${result[i].firstName}</td>
        //               <td>${result[i].lastName}</td>
        //               <td>${result[i].email}</td>
        //               <td>${result[i].gender}</td>
        //           `;

        //   records += `</tr>`;
        // }

        // $("#employeesTableBody").html(records);
      },
      error: err => console.log("error", err)
    });
  };

  $("#saveEmployee").on("click", e => {
    e.preventDefault();

    var employee = {
      firstName: $("input#first_name").val(),
      lastName: $("input#last_name").val(),
      email: $("input#email").val(),
      gender: $("input#gender").val()
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

  getEmployees();
  getHistory();
}); //end
