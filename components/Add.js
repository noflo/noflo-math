/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    icon: 'plus',
    inPorts: {
      augend: {
        datatype: 'number',
        required: true
      },
      addend: {
        datatype: 'number',
        required: true,
        control: true
      }
    },
    outPorts: {
      sum: {
        datatype: 'number'
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('augend', 'addend')) { return; }
    const [augend, addend] = Array.from(input.getData('augend', 'addend'));
    return output.sendDone({
      sum: Number(augend) + Number(addend)});
  });
};
