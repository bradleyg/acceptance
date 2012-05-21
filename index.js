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
    var option = schema[key]
    var value = params[key]
    var validate = (value && option.validation)
    
    if(validate && ! value.match(option.validation.regex)){
      addError(key, option.validation.message)
    }
    else if(option.required && ! value) addError(key, 'Missing field')
    else if(value) accepted[key] = value
  });

  return {
    errors: errors.length ? errors : null,
    accepted: accepted
  };
}