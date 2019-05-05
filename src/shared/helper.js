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
    return [date.getTime(),day + ' ' + monthNames[month] + ' ' + year];
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