export class Tools {
  static randomNumber(min, max) {
    if (!max) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  static addUniqueElementsFrom2to1array(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
      if (!arr1.includes(arr2[i])) {
        arr1.push(arr2[i]);
      }
    }
    return arr1;
  }

  static massiveRequire(req) {
    const files = [];

    req.keys().forEach((key) => {
      files.push({
        key,
        data: req(key),
      });
    });

    return files;
  }
}
