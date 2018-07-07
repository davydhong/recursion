// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// shoud usedocument.body, element.childNodes, and element.classList


var getElementsByClassName = function(className
) {
  // Method #1
  var inputClassSeletor = $("."+className)
  var result =[];
  for (var i = 0; i < inputClassSeletor.length; i++) {
    result.push(inputClassSeletor[i]);
  }
  return result;
  // Method #2: shoud usedocument.body, element.childNodes, and element.classList
  
};
