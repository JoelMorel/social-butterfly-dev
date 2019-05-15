module.exports = {
  truncate(str, length) {
    if (str.length > length) {
      const newStr = str.substring(0, length - 3); // Cuts off three extra characters for "..."
      return `${newStr}...`;
    }
    return str;
  },

  stripHTMLTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  }
};
