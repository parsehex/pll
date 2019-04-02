const { exec } = require('child_process');

function pll(cmds, options = {}) {
	if (typeof cmds === 'string') cmds = [{ command: cmds }];
	if (!Array.isArray(cmds)) {
		throw new Error('Must pass an array of commands to run as first argument');
	}

	for (let i = 0; i < cmds.length; i++) {
		const cmd = cmds[i];

		let c = cmd.command;
		if (!options.noColor) c = 'FORCE_COLOR=2 ' + c;

		const child = exec(c, { encoding: 'utf8' });
		if (cmd.onOutput && !options.noCommandEcho) cmd.onOutput(cmd.command);
		if (cmd.onOutput) child.stdout.on('data', cmd.onOutput);
		if (cmd.onError) child.stderr.on('data', cmd.onError);
	}
}

module.exports = pll;
