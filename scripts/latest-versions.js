import { promises as fs } from 'fs'

const cwd = process.cwd()

const gitBaseUrl = 'https://api.github.com/repos/DEFRA'
const servicesPath = `${cwd}/service-compose`

async function getLatestRelease(repo) {
  const response = await fetch(`${gitBaseUrl}/${repo}/releases/latest`)
  const data = await response.json()

  const version = data.tag_name

  console.log(`${repo}: ${version}`)
}

async function latestVersions() {
  const services = await fs.readdir(servicesPath)

  const processes = []

  for (const service of services) {
    const repo = service.replace('.yaml', '')

    processes.push(getLatestRelease(repo))
  }

  await Promise.all(processes)
}

await latestVersions()
