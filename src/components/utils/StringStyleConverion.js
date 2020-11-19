// https://stackoverflow.com/questions/54651201/how-do-i-covert-kebab-case-into-pascalcase#answer-54651317

export function kebabToCamelCase(text) {
  return text.replace(/-\w/g, clearAndUpper);
}

export function kebabToPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function kebabToPascalCaseWithSpaces(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpperWithSpaces);
}

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

function clearAndUpperWithSpaces(text) {
  return text.replace(/-/, " ").toUpperCase();
}
