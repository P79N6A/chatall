export function pySegSort(arr, empty) {
  var letters = "*abcdefghjklmnopqrstwxyz".split('');
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  var segs = [];
  var curr;
  for (let i = 0; i < letters.length; i++) {
    curr = {group: letters[i], data: []};
    for (let j = 0; j < arr.length; j++) {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(arr[j].nickname) <= 0) && arr[j].nickname.localeCompare(zh[i]) == -1) {
        curr.data.push(arr[j]);
      }
    }
    if (empty || curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return a.nickname.localeCompare(b.nickname);
      });
    }
  }
  return segs;
}
