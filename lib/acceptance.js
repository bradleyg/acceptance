/*!
 * Copyright (c) 2011 Bradley Griffiths <bradley.griffiths@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
module.exports.accept = function(params, schema) {
  var errors = [];
  var accepted = {};
  
  var addError = function(key, message) {
    errors.push({
      field: key,
      message: message
    });
  }

  Object.keys(schema).forEach(function(key){
    var option = schema[key];
    var value = params[key];

    if(option.required && ! value){
      addError(key, 'Missing field');
    }
    else if(value && ! value.match(option.validation.regex)){
      addError(key, option.validation.message);
    }
    
    if(params[key]){
      accepted[key] = params[key];  
    }
  });
  
  return {
    errors: errors.length ? errors : null,
    accepted: accepted
  };
}