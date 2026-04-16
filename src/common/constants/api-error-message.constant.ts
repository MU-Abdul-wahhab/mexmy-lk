
export const API_ERROR_MESSAGE = {

  auth : {
    alreadyExist : (field : 'Email'|'Mobile')=>{
      return `${field} already exists`
    },
    invalidCredentials : 'Invalid Credentials'
  }

}