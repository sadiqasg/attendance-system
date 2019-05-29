$(function() {
  const url = "http://localhost:3000";
  $('#totalMeetings').html(20);
  
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

  // getEmployees();
}); //end
