module.exports = function(data){
  var username = data.username;
  var password = data.password;
  console.log(typeof data);
  console.log(data ,username ,password);
  if(username == "user" && password == "pass"){
    return true ;
  }else{
    return false;
  }
}
