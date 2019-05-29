$(function() {
  $("#saveEmployeeForm").on("click", () => {
    console.log("saving..");
    // var firstName = $("#first_name").val();
    // var lastName = $("#last_name").val();
    // var email = $("#email").val();
    // var gender = $("#gender").val();
    const json = serialize_form(this);
    console.log(json);
    
    // $.ajax({
    //   type: "post",
    //   url: `http://localhost:3000/employees?first_name=${firstName}?last_name=${lastName}?email=${email}?gender=${gender}`,
    //   success: result => {
    //     console.log("saved", result);
    //   },
    //   error: e => {
    //     console.log("error", e);
    //   }
    // });
  });
});
