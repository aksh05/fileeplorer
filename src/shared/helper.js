const DUMMY_FOLDER = {children:{}};

export function formatDate(date) {
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oc",
    "Nov", "Dec"
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return [date.getTime(), day + ' ' + monthNames[month] + ' ' + year];
}

export function findCurrentDirectoy(idToFind, rootdir) {
  const dirId = Object.keys(rootdir)[0];
  if (dirId == idToFind) {
    return rootdir[idToFind];
  }
  const children = rootdir[dirId].children || {};
  for (const key in children) {
    const dir = findCurrentDirectoy(idToFind, { [key]: children[key] });
    if (dir) {
      return dir;
    }
  }
}

export function findCurrentDirectoryByName(dirPath, rootdir) {
  let dirId = Object.keys(rootdir)[0];
  let currDir = {...rootdir[dirId]}
  const dirNames = dirPath.split("/");
  let isChildFound;
  for (var i = 0; i < dirNames.length;i++) {
    const children = currDir.children;
    isChildFound = false;
    Object.keys(children).forEach((childId) => {
      if (children[childId].name === dirNames[i]) {
        currDir = children[childId];
        isChildFound = true;
      }
    });
    if(!isChildFound){
      break;
    }
  }
  if(isChildFound){
    return currDir;
  }
  return DUMMY_FOLDER;
  
}