const { CosmosClient } = require('@azure/cosmos')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const endpoint = 'https://localhost:8081'
const key = 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
const messagesDatabase = process.argv[4]
const messagesContainer = process.argv[5]
const client = new CosmosClient({ endpoint, key })


const uploadData = async () => {
  for (let i = 0; i < process.argv[6]; i++) {
    const item = {
      scheme: 'AHWP',
      tags: ['tag 1', 'tag 2'],
      crn: `${process.argv[2]}`,
      sbi: `${process.argv[3]}`,
      heading: `There is an update about your AHWP application ${i + 1}`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mauris nec nisl aliquam eleifend.',
      requestedDate: '12-05-2024'
    }
    await client.database(messagesDatabase).container(messagesContainer).items.create(item)
  }
}

try {
  uploadData()
} catch (err) {
  throw new Error(err)
}