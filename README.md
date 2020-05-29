# Serverless Offline Lambda GraphQL Subscriptions WebSocket
A minimal example of
* Serverless
* GraphQL
* GraphQL Subscriptions over WebSocket
* DynamoDB for persistance of connections
* All runnable in Serverless Offline

While AWS AppSync offers a convenient way to manage data using GraphQL, it does not come with a nice way
of verifying and manipulation-on-resolve.
There were libraries doing similar things before, but this setup enables you to run everything in serverless, and even in serverless-offline.
It spins up the GraphQL-Server in a Serverless Function, enabling you to modify resolver requests and responses, while still being able to handle Subscriptions over WebSocket for real-time data.

This project was implemented using TypeScript.

For more information about Server and Client implementation and configuration, check out
* [AWS Lambda GraphQL](https://github.com/michalkvasnicak/aws-lambda-graphql) and its examples
* [Subscription Transport WS](https://github.com/apollographql/subscriptions-transport-ws) and its examples
* [Apollo GraphQL Server](https://www.apollographql.com/blog/tutorial-graphql-subscriptions-server-side-e51c32dc2951)
* [Apollo GraphQL Client](https://www.apollographql.com/blog/tutorial-graphql-subscriptions-client-side-40e185e4be76)


## Try it out!

After running `npm install` / `yarn install`, before starting serverless-offline, you have to install dynamodb local first:
`npm run dynamodb:install`

Then you can `npm start` to make **serverless** spin up the database, gateway and lambdas.

Serverless-offline will expose the websocket on `localhost:3001/dev/graphql`, while handling HTTP requests on `localhost:3000/dev/graphql` by default.

To test this setup, open the `test.html` file in two or more browser windows and click the button in one of them. All windows should update the color.

Note that Subscriptions do not fetch the current value, but only react to changes, so you usually want to dispatch a query when submitting the subscription.

Happy Coding!
