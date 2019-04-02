const pll = require('./index');

function out(d) {
	if (this.includes('#1')) console.clear();
	console.log(this + ': ' + d.trim());
}

const cmds = [
	{ command: 'sh scripts/count.sh', onOutput: out.bind('Counter #1') },
	{ command: 'sleep 1 && sh scripts/count.sh', onOutput: out.bind('Counter #2') },
	{ command: 'sleep 2 && sh scripts/count.sh', onOutput: out.bind('Counter #3') },
];
pll(cmds);
