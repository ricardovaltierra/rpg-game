export function createElement(type = 'div', id = null, classLst = null, inner = '') {
  const elem = document.createElement(type);
  if (id) elem.id = id;
  if (classLst) elem.classList.add(classLst);
  elem.innerHTML = inner;
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

export function appendToBody(child) {
  document.body.appendChild(child);
}

export function appendChilds(elem, childs) {
  childs.forEach(child => elem.appendChild(child));
}