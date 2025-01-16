import { existsSync, promises as fs } from 'fs'
import readline from 'readline'
import { parse, stringify } from 'yaml'

const cwd = process.cwd()

async function constructCompose(appName, ports) {
  const compose = {
    services: {
      [appName]: {
        build: {
          context: `../../${appName}`,
          target: 'development'
        },
        image: appName,
        container_name: appName,
        depends_on: {
          'fcp-fd-local-setup': {
            condition: 'service_completed_successfully'
          }
        },
        networks: [
          'fcp-fd'
        ],
        ports: [
          `${ports[0]}:${ports[0]}`,
          `${ports[1]}:${ports[1]}`
        ],
        env_file: [
          '../.env'
        ],
        volumes: [
          `../../${appName}:/home/node/app`
        ]
      }
    }
  }

  await fs.writeFile(
    `${cwd}/service-compose/${appName}.yaml`,
    stringify(compose)
  )
}

async function addToParentCompose(path) {
  const parent = await fs.readFile(`${cwd}/docker-compose.yaml`, 'utf8')

  const compose = parse(parent)

  let { include } = compose

  if (include.indexOf(path) > -1) {
    console.log('Service already included')
    return
  }

  include.push(path)
  include.sort((a, b) => b.localeCompare(a))

  await fs.writeFile(
    `${cwd}/docker-compose.yaml`,
    stringify(compose)
  )
}

async function getUserInput(q) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer)
      rl.close()
    })
  })
}

async function addService() {
  const appName = await getUserInput('Enter the name of the app: ')

  if (existsSync(`${cwd}/service-compose/${appName}.yaml`)) {
    console.log('Service already exists')
    return
  }

  const server = await getUserInput('Enter the web server port: ')
  const debug = await getUserInput('Enter the debugger port: ')

  const ports = [server, debug]

  await constructCompose(appName, ports)
  await addToParentCompose(`service-compose/${appName}.yaml`)
}

await addService()
