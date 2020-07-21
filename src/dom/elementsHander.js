export function createElement(type, inner = '', classLst = '') {
  const elem = document.createElement(type);
  elem.innerHTML = inner;
  elem.classList.add(classLst);
  return elem;
}

export function getElement(id) {
  const element = document.getElementById(id);
  return element;
}

export function setInner(elem, str) {
  elem.innerHTML = str;
}

export function addToInner(elem, str) {
  elem.innerHTML += str;
}

export function addToClass(elem, clss) {
  elem.classList.add(clss);
}

export function setToClass(elem, clss) {
  elem.classList.value = clss;
}

export function removeToClass(elem, clss) {
  elem.classList.remove(clss);
}

export function setClickListener(elem, funct) {
  elem.addEventListener('click', funct);
}

export function setValue(elem, val) {
  elem.value = val;
}

export function appendChild(elem, child) {
  elem.appendChild(child);
}