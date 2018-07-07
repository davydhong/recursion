// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:



var hasObj = function (obj) {
  var objTrans = _.map(obj, function (val) {
    if (val == null) {
      return null;
    } else {
      return typeof val;
    }
  });
  return _.contains(objTrans, "object");
};
var locateObj = function (obj) {
  if (Array.isArray(obj)) {
    var objTrans = _.map(obj, function (val) {
      return typeof val;
    });
    return _.indexOf(objTrans, "object");
  } else {
    for (var i in obj) {
      if (typeof obj[i] === "object") {
        return i;
      }
    }
  }
};
var Obj2String = function (obj, level) {
  if (Array.isArray(obj)) {
    obj = _.map(obj, function (val) {
      if (typeof val === "string") {
        return '"' + val + '"';
      } else {
        return val;
      }
    })
    return "[" + obj.toString() + "]";
  } else if (obj == null) {
    return "null";
  } else if (typeof obj === "string") {
    return '"' + obj + '"';
  } else {
    var string = [];
    for (var i in obj) {
      if (typeof obj[i] == "boolean") {
        string.push('"' + i.toString() + '"' + ':' + obj[i].toString());
      } else if (obj[i] === undefined || i === "undefined") {} else if (obj[i] == null) {
        string.push('"' + i.toString() + '"' + ':null');
      } else if (typeof obj[i] === "function") {
        string.push("");
      } else {
        string.push('"' + i.toString() + '"' + ':' + '"' + obj[i].toString() + '"');
      }
    }
    string = string.join(",");
    return "{" + string + "}";
  }
};

var stringifyJSON = function (obj) {
  var idx = 0;

  var StepObj = function (obj) {
    this.level = [0];
    this.Ob = [obj];
    this.containObj = [hasObj(obj)];
    this.indexOfInner = [locateObj(obj)];
    if (obj) {
      this.innerObject = [obj[locateObj(obj)]];
    } else {
      this.innerObject = [undefined];
    }
    // 
  };
  StepObj.prototype.stepIn = function () {
    // need obj = obj[locateObj(obj)];
    this.level.push(this.level[this.level.length - 1] + 1)
    this.Ob.push(obj);
    this.containObj.push(hasObj(obj));
    this.indexOfInner.push(locateObj(obj));
    if (obj) {
      this.innerObject = [obj[locateObj(obj)]];
    } else {
      this.innerObject = [undefined];
    }
  }

  StepObj.prototype.stepOut = function () {
    this.level.pop();
    this.Ob.pop();
    this.Ob.pop();
    this.Ob.push(obj); //need this.Object[length-2] = obj; obj[locateObj(obj)] = Obj2String( obj[locateObj(obj)] )
    this.containObj.pop();
    this.containObj.pop();
    this.containObj.push(hasObj(obj));
    this.indexOfInner.pop();
    this.indexOfInner.pop();
    this.indexOfInner.push(locateObj(obj));
    this.innerObject.pop();
    this.innerObject.pop();
    this.innerObject.push(obj[locateObj(obj)]);
  }

  var Steps = new StepObj(obj);


  var recur = function () {

    var current = {
      level: Steps.level.slice(-1)[0],
      Ob: Steps.Ob.slice(-1)[0],
      containObj: Steps.containObj.slice(-1)[0],
      indexOfInner: Steps.indexOfInner.slice(-1)[0],
      innerObject: Steps.innerObject.slice(-1)[0],
    }
    if (typeof current.Ob === "string" && current.level == 0) {
      var trim = Obj2String(obj);
      return trim.split('"[').join("[").split(']"').join("]").split('"{').join("{").split('}"').join("}")
    } else if (typeof current.Ob !== "object" && current.level == 0) { // simple numbers
      return current.Ob.toString();
    } else if (!current.containObj && current.level == 0) { // simple arrays and objects 
      var trim = Obj2String(current.Ob);

      return trim.split('"[').join("[").split(']"').join("]").split('"{').join("{").split('}"').join("}")
    } else if (!current.containObj && current.level > 0) {

      obj = Steps.Ob[Steps.Ob.length - 2];

      obj[locateObj(obj)] = Obj2String(obj[locateObj(obj)])
      Steps.stepOut(); //two-level arrays [[Array],[Array]]
      return recur();

    } else {
      if (current.containObj) {
        obj = obj[locateObj(obj)];
        Steps.stepIn();
        return recur();
      }
    }
  };
  return recur();
};