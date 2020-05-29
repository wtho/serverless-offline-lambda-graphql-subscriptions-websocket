import { DynamoDB, ApiGatewayManagementApi } from 'aws-sdk'
import {
  DynamoDBConnectionManager,
  DynamoDBSubscriptionManager,
  DynamoDBEventStore,
  PubSub,
  DynamoDBEventProcessor,
} from 'aws-lambda-graphql'

const stage = process.env.STAGE || 'dev'

export const dynamoDbConfig =
  stage === 'dev'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:32018',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // required if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET', // required if you don't have aws credentials at all in env
      }
    : {}

const dynamoDbClient = new DynamoDB.DocumentClient(dynamoDbConfig)

const eventStore = new DynamoDBEventStore({ dynamoDbClient })

export const eventProcessor = new DynamoDBEventProcessor()
export const subscriptionManager = new DynamoDBSubscriptionManager({ dynamoDbClient })
export const connectionManager = new DynamoDBConnectionManager({
  apiGatewayManager: new ApiGatewayManagementApi({
    endpoint: 'http://localhost:3001',
  }),
  dynamoDbClient,
  subscriptions: subscriptionManager,
})
export const pubSub = new PubSub({ eventStore })
