import path from 'path'
import shell from 'shelljs'
import { promises as fs } from 'fs'

const cwd = process.cwd()

const gitBaseUrl = 'https://github.com/DEFRA'
const servicesPath = `${cwd}/service-compose`
const reposPath = path.resolve(cwd, '..')

async function clone() {
  const services = await fs.readdir(servicesPath)

  const processes = []

  for (const service of services) {
    const repo = service.replace('.yaml', '')

    const job = shell.exec(
      `git clone ${gitBaseUrl}/${repo}.git`,
      { 
        cwd: reposPath,
        async: true
      }
    )

    processes.push(job)
  }

  await Promise.all(processes)
}

await clone()
