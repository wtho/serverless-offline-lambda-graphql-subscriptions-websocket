import { Server } from 'aws-lambda-graphql'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { connectionManager, pubSub, eventProcessor, subscriptionManager } from './ws-management'


const server = new Server({
  context: {
    pubSub,
  },
  connectionManager,
  eventProcessor,
  subscriptionManager,
  resolvers,
  typeDefs,
  playground: {
    subscriptionEndpoint: 'ws://localhost:3001',
  }
})

export const graphql = server.createHttpHandler()
export const graphqlWs = server.createWebSocketHandler()
export const graphqlEvents = server.createEventHandler()

