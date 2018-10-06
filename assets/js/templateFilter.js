// Methods to take data from a JSON to fill a template
// Currently going to use %$ as a tag
const tag = "%$";

//exports
export{delimPairs,loadTextFile,multiTagFindAndReplace,plainTagFindAndReplace,templateDriver};

// Method to run all other methods
// files for whole template and for each section
function templateDriver(templateFile, tagJSON, sectionFile)
{
  var templateStr;// = loadTextFile(templateFile);
  fetch(templateFile)
  .then((response) => response.text())
  .then((text) => templateStr = text);
  console.log(templateStr);
  var outputStr = "";
  if (typeof sectionFile !== "undefined") {
    var sectionStr = loadTextFile(sectionFile);
    templateStr = sectionInserter(templateStr, sectionStr);
  }
  templateStr = multiTagFindAndReplace(templateStr, tagJSON);
  templateStr = plainTagFindAndReplace(templateStr, tagJSON);
  console.log(templateStr);
}


//Method to insert the section str into the template str.
function sectionInserter(templateStr, sectionStr)
{
  var sectionTag = "%$SectionTemplateGoesHere";
  templateStr = templateStr.replace(sectionTag, sectionStr);
  return templateStr;

}


// Method that loads the textfile from the server
// file is url of desired file
// Uses xmlhttp and a GET request
// Returns a DOMString
function loadTextFile(file)
{
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", file, false);
  xmlhttp.send();
  if(xmlhttp.status==200)
  {
    result = xml.responseText;
  }
  return result;
}

function fetchTextFile(file)
{
  fetch(file).then((response) => response.text())
  .then((text) => outputStr = text);
}

// location is the index of the first Delim
// Return the location of the end Delim
function delimPairs(str, location, leftDelim, rightDelim)
{
  var count = 0;
  for (var i = location; i < str.length; i++) {
    if (str.charAt(i)==leftDelim) {
      count++;
    }
    else if (str.charAt(i)==rightDelim) {
      count--;
    }
    if(count==0){
      return i;
    }
  }

}


// Method to look through the template str and find and Multi Tags
// str is the whole file string
// Example "%$Multi(tagStr)< $#title %$Name //>"
function multiTagFindAndReplace(str, tagJSON)
{
  var tag = "";
  var searchTerm = "%$Multi";
  var multiPos = str.search(searchTerm);
  if (multiPos = -1) {
    return str;
  }
  tag = str.slice(multiPos+searchTerm.length+1);
  var tagEnd = str.indexOf(')');
  tag = tag.slice(0,tagEnd);

  var openTagLoc = str.search("<",tagEnd);
  var closedTagLoc = delimPairs(str, openTagLoc, '<', '>')+1;
  var multiString = str.slice(openTagLoc, closedTagLoc);

  if (multiString.includes(searchTerm)) {
    multiString = multiTagFindAndReplace(multiString, tagJson.tag)
  }

  var numberOfElemnts = tagJson.tag.length; // TODO: make sure this works?
  var newMultiBlock = ""
  for (var i = 0; i < numberOfElemnts; i++) {
    newMultiBlock = newMultiBlock+ plainTagFindAndReplace(multiStr, tagJSON.tag);
  }
  str = str.slice(0,multiPos)+newMultiBlock+multiTagFindAndReplace(str.slice(closedTagLoc),tagJSON);
  console.log(str);
  return str;
}


// Method to look through the template string loaded from the server
// and find and replace all the tags with the data from the JSON.
//
// Only works with basic Tags and no special tags
//
// Inputs:
// string -- the string with the tags to be replaced
// tagJSON -- a JSON with the corresponding
//
// Returns:
// A stirng with the data placed into the locations of the tags
function plainTagFindAndReplace(str, tagJSON)
{
  var keyStr = "";
  var substrings = str.split(tag); //Assume that the first substring does not start with a tag
  var outputStr = substrings[0];
  for (var i = 1; i < substrings.length; i++) {
    keyStr = findKey(substrings[i],key.length)
    if (tagJSON[keyStr]!=null) {
      outputStr += tagJSON[keyStr] +substrings[i].slice(key.length+keyStr.length);
    }
  }

  return outputStr;
}


// Method to find the key
//
// Inputs:
// str -- the string with the tags to be replaced
// position -- where in the string we are evaluationg
//
// Returns:
// A stirng of the Key
function findKey(str, position)
{
  var key = "";
  for (var length = 1; length < str.length-position; length++) {
    if (!isAlphanumeric(str.charCodeAt(position+length))) {
      return key;
    }
    key += str.charAt(position+length);
  }
  return "Error"; // Error
}

// Method to check if a character code is alphanumeric
//
// Inputs:
// code -- the char code
function isAlphanumeric(code)
{
  return ((code > 47 && code < 58) && // numeric (0-9)
        (code > 64 && code < 91) && // upper alpha (A-Z)
        (code > 96 && code < 123));
}
