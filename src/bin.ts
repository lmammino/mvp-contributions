#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { dirname } from 'desm'
import { program } from 'commander'
import { dedupCmd } from './commands/dedup.js'
import { deleteCmd } from './commands/delete.js'
import { listCmd } from './commands/list.js'
import { submitCmd } from './commands/submit.js'

const packageJson = JSON.parse(await readFile(join(dirname(import.meta.url), '../package.json'), 'utf8'))

const cookieParamDesc = '`.AspNet.Cookies` cookie value from a logged in session at https://mvp.microsoft.com/'

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description('Review and submit your Microsoft MVP contributions')
  .addHelpText('after', `
  Check out https://github.com/lmammino/mvp-contributions for a more detailed documentation.
  `)

program
  .command('list', { isDefault: true })
  .option('-c, --cookie <cookie>', cookieParamDesc)
  .description('List submitted contributions')
  .action(listCmd)

program
  .command('delete')
  .argument('<contributionId...>', 'One or more contribution IDs to delete')
  .option('-c, --cookie <cookie>', cookieParamDesc)
  .description('Deletes one or more contributions by contribution by ID')
  .action(deleteCmd)

program
  .command('dedup')
  .option('-c, --cookie <cookie>', cookieParamDesc)
  .description('Deletes duplicated contributions')
  .action(dedupCmd)

program
  .command('submit')
  .argument('[filepath]', 'Path to YAML file containing contributions', 'contributions.yml')
  .option('-c, --cookie <cookie>', cookieParamDesc)
  .description('Submit new contributions from contributions YAML file')
  .action(submitCmd)

program.parse(process.argv)
