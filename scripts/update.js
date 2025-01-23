import path from 'path'
import shell from 'shelljs'
import { promises as fs } from 'fs'

const cwd = process.cwd()

const reposPath = path.basename(cwd)

async function update() {
  const repos = await fs.readdir(reposPath)

  const processes = []

  for (const repo of repos) {
    const job = shell.exec(
      `git checkout main && git pull`,
      { 
        cwd: `${reposPath}/${repo}`,
        async: true
      }
    )

    processes.push(job)
  }

  await Promise.all(processes)
}

await update()
