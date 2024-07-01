var test = 100;
function add() {
  test = test + 100;
  console.log(test, 2);
}
// module.exports = {
//   test: test,
// };

module.exports = {
  add: function () {
    test = test + 100;
    console.log(test, 1);
  },
};

// exports.add = add;
