#!usr/bin/env node
import sade from 'sade';
import readPkgUp from 'read-pkg-up';
import fs from 'fs';

const symlink = (target, path) =>
  new Promise((resolve) => {
    return fs.symlink(target, path, (err) => {
      if (err) return resolve(err);

      return resolve(null);
    });
  });

(async () => {
  const prog = sade('symian <target> <path>', true)
    .describe('Creates a link called "path" point to "target".')
    .version((await readPkgUp()).packageJson.version)
    .action(async (target, path) => {
      const err = await symlink(target, path);

      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`✨🔗 Your symbolic link was created!`);
      }
    });

  prog.parse(process.argv);
})();
