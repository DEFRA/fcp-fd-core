const { CosmosClient } = require('@azure/cosmos')
const { v4: uuidv4 } = require('uuid')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const endpoint = 'https://localhost:8081'
const key = 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
const queriesDatabase = process.argv[4]
const queriesContainer = process.argv[5]
const client = new CosmosClient({ endpoint, key })

const uploadData = async () => {
  for (let i = 0; i < process.argv[6]; i++) {
    const item = {
      ticketId: uuidv4(),
      internalUser: false,
      name: `Jordan Doe`,
      crn: `${process.argv[2]}`,
      sbi: `${process.argv[3]}`,
      heading: `A new customer query ticket has been opened ${i + 1}.`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris nec nisl aliquam eleifend.'
    }
    await client.database(queriesDatabase).container(queriesContainer).items.create(item)
  }
}

try {
  uploadData()
} catch (err) {
  throw new Error(err)
}