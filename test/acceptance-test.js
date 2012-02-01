var should = require('should');
var accept = require('../lib/acceptance').accept;

var schema = {
  name: {
    required: true,
    validation: { regex: /^[a-zA-Z0-9]+$/, message: 'Not alpha numeric' }
  },
  phone: {
    required: false,
    validation: { regex: /^-?[0-9]+$/, message: 'Not a valid integer' }
  },
  location: {
    required: true,
    validation: false
  }
}

describe('acceptance', function(){
  
  describe('accept()', function(){
    
    it('should return an error if a field failed validation', function(){
      var params = { phone: '012345hello' };
      var a = accept(params, schema);
      should.exist(a);
      should.exist(a.errors);
      should.exist(a.accepted);
      a.accepted.should.have.property('phone', '012345hello');
      a.errors[1].should.have.property('field', 'phone');
      a.errors[1].should.have.property('message', 'Not a valid integer');
    });
    
    it('should return an error if a required field is missing', function(){
      var params = { phone: '012345hello' };
      var a = accept(params, schema);
      should.exist(a);
      should.exist(a.errors);
      should.exist(a.accepted);
      a.accepted.should.have.property('phone', '012345hello');
      a.errors[2].should.have.property('field', 'location');
      a.errors[2].should.have.property('message', 'Missing field');
    });
    
    it('should not return an error an error if valid fields are sent', function(){
      var params = { name: 'Bradley', location: 'london' };
      var a = accept(params, schema);
      should.exist(a);
      should.exist(a.accepted);
      should.not.exist(a.errors);
      a.accepted.should.have.property('name', 'Bradley');
      a.accepted.should.have.property('location', 'london');
    });
      
  });
  
});