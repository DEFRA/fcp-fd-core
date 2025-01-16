import { MessageSender } from 'ffc-messaging'

const checkInterval = 5000
const maxAttempts = 12

async function checkServiceBus() {
  const sender = new MessageSender(
    {
      connectionString: process.env.MESSAGE_QUEUE_CONNECTION_STRING,
      topic: 'fcp-fd-test-sf',
      address: 'fcp-fd-test-sf'
    }
  )

  try {
    await sender.send({
      body: {
        hello: 'world',
      }
    })

    return true
  } catch (err) {
    return false
  }
}

async function waitForServiceBus() {
  let attempts = 0

  while (attempts < maxAttempts) {
    const ready = await checkServiceBus()

    if (ready) {
      console.log('Service Bus is ready')
      process.exit(0)
    }

    console.log('Service Bus Emulator is not ready, retrying in 5 seconds')

    await new Promise((resolve) => setTimeout(resolve, checkInterval))

    attempts += 1
  }

  console.error('Service Bus Emulator has failed to start')
  process.exit(1)
}

async function main() {
  if (!process.env.MESSAGE_QUEUE_CONNECTION_STRING) {
    console.log('Not checking for Service Bus as MESSAGE_QUEUE_CONNECTION_STRING is not set')
    process.exit(0)
  }

  await waitForServiceBus()
}

await main()
