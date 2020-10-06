/**
 * Title: error-response.js
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: error-response for error messages
 * Modifications:
 */
class
ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data= data;
  }
  toObject() {
    //returns an object back
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports
 =
ErrorResponse;
