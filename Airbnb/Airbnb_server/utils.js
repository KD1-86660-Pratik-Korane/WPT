//if any error occurs in application we need to send error information to the user with status code as a error 
function createErrorResult(error) {
  return { status: "error", error };
}

//when request processes succesfully we need to send data along with status code as as success

function createSuccessResult(data) {
  return { status: "success", data };
}

//creating the final result depending on status code and data

function createResult(error, data) {
  return error ? createErrorResult(error) : createSuccessResult(data);
}

//to make available all three functions to other js files
module.exports = {
  createResult,
  createSuccessResult,
  createErrorResult,
};
