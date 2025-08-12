var Task = {
  setId: function (ID) {
    this.id = ID;
  },
  outputId: function () {
    console.log(this.id);
  },
};

var xyz = Object.create(Task);

xyz.prepareTask = function (ID, label) {
  this.setId(ID);
  this.label = label;
};

xyz.outputTask = function () {
  this.outputId();
  console.log(this.label);
};
xyz.prepareTask("123", "testing");
console.log(xyz);
xyz.outputTask();
