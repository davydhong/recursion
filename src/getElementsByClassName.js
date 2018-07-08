// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// shoud usedocument.body, element.childNodes, and element.classList



//   Method #1: used jquery
// var getElementsByClassName = function(className) {
//   var inputClassSeletor = $("."+className)
//   var result =[];
//   for (var i = 0; i < inputClassSeletor.length; i++) {
//     result.push(inputClassSeletor[i]);
//   }
//   console.log(result);
//   console.log(inputClassSeletor);
//   // console.log(document.getElementsByClassName(className));

//   //   // console.log(document.body);

//   return result;
// };


// Method #2: shoud usedocument.body, element.childNodes, and element.classList

var getElementsByClassName = function (className) {
  var addDOM = function () {
    if (_.contains(dom.classList, className) && ChildInspected === false) {
      arr.push(dom);
      return arr;
    } else {
    }
  }
  
  var go2Child = function () {
      level.push(level.slice(-1)[0] + 1);
      ChildInspected = false;
      return dom = dom.firstChild;
  }

  var go2Sibling = function () {
      ChildInspected = false;
      return dom = dom.nextSibling;
  }
  var go2Parent = function () {
      level.push(level.slice(-1)[0] - 1);
      ChildInspected = true;
      return dom = dom.parentNode;
  }
  
  var dom = document.body;
  var arr = [];
  var level = [0];
  var ChildInspected = false;
 
  
  var recur = function () {

    if (level.length > 1 && dom.tagName === "BODY"  ) {
      return arr;
    }
    
    addDOM();
    if (dom.firstChild !== null && ChildInspected === false) {    
      go2Child();
      return recur();

    } else if (dom.nextSibling !== null) { 
      go2Sibling();
      return recur();
      
    } else if (dom.nextSibling == null) {
      go2Parent();
      return recur();
    }
  }
    return recur();
  
};