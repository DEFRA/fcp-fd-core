import path from 'path'
import shell from 'shelljs'
import { promises as fs } from 'fs'

const cwd = process.cwd()

const servicesPath = `${cwd}/service-compose`
const reposPath = path.resolve(cwd, '..')

async function update() {
  const services = await fs.readdir(servicesPath)

  const processes = []

  for (const service of services) {
    const repo = service.replace('.yaml', '')

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
