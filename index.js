const { exec } = require('child_process');

function pll(cmds, noCommandEcho = false) {
	if (typeof cmds === 'string') cmds = [{ command: cmds }];
	if (!Array.isArray(cmds)) {
		throw new Error('Must pass an array of commands to run as first argument');
	}

	for (let i = 0; i < cmds.length; i++) {
		const cmd = cmds[i];

		const child = exec(cmd.command);
		if (cmd.onOutput && !noCommandEcho) cmd.onOutput(cmd.command);

		if (cmd.onOutput) child.stdout.on('data', cmd.onOutput);
		if (cmd.onError) child.stderr.on('data', cmd.onError);
	}
}

module.exports = pll;
