const OT = "%$";
const CT = OT.split("").reverse().join(""); // reverse of OT


export async function templateDriver(templateFile, tagJSON) {
  let templateStr = await fetch(templateFile).then((response) => response.text());
  tagJSON = cleanJSON(tagJSON);
  let str = recursivelyPopulate(templateStr, tagJSON);
  console.log(str);
}

function cleanJSON(obj) {
  let clean = JSON.parse(JSON.stringify(obj));
  delete clean.about;
  clean = { ...clean, ...obj.about };
  trimJSON(clean);

  return clean;
}

function trimJSON(obj) {
  if ((obj instanceof Object) && !Array.isArray(obj)) {
    let shouldRemove = [];
    for (let e in obj) {
      if (obj.hasOwnProperty(e)) {
        let toRemove = trimJSON(obj[e]);
        shouldRemove.push(toRemove);
        if (toRemove) {
          delete obj[e];
        }
      }
    }
    return shouldRemove.every(v => v == true);
  }
  if (Array.isArray(obj)) {
    if (obj.every(v => !(v instanceof Object))) {
      return handleArray(obj);
    }
    // is sections or elements
    return obj.map(v => trimJSON(v)).every(v => v == true)
  }
  // is a string
  return obj.length == 0;
}

function handleArray(arr) {
  if ((arr.length) == 0) {
    return true;
  }
  let i = arr.length - 1;
  while (i >= 0) {
    if (arr[i] == "") {
      arr.splice(i, 1);
    } else {
      arr[i] = {"item": arr[i]};
    }
    i--;
  }
  return arr.length == 0;
}

function recursivelyPopulate(input, tagJSON) {
  let output = "";
  while (input.indexOf(CT) != -1) {
    let [before, tag, after] = tagPartition(input, OT, CT);
    output += before;

    if (tag.indexOf("Multi") != 0) { // if not multi
      output += tagJSON[tag];
    } else {
      let multi;
      [multi, after] = partition(after, OT+tag+CT);
      tag = tag.slice(6, -1); // should be regex, transform Multi(tag) to tag
      let arr = tagJSON[tag];

      arr.forEach(e => output += recursivelyPopulate(multi, e));
    }
    input = after;
  }
  return output + input;
}

function partition(str, subStr) {
  let index = str.indexOf(subStr);
  let before = str.slice(0, index);
  let after = str.slice(index + subStr.length);
  return [before, after];
}

function tagPartition(str, opening, closing) {
  let [including, after] = partition(str, closing);
  let [before, tag] = partition(including, opening);
  return [before, tag, after];
}
