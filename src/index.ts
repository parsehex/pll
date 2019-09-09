import { exec } from 'child_process';

interface Command {
	command: string;
	onOutput?: (outputText: string) => void;
	onError?: (errorText: string) => void;
}
interface Options {
	/** Set to true to prevent output from being colored */
	noColor?: boolean;
	/** Set to true to prevent commands from being echoed to console */
	noCommandEcho?: boolean;
}

export default function pll(cmds: string | Command[], options: Options = {}) {
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
		if (cmd.onOutput && child.stdout) child.stdout.on('data', cmd.onOutput);
		if (cmd.onError && child.stderr) child.stderr.on('data', cmd.onError);
	}
}
