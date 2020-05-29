import { IResolvers } from "apollo-server-lambda";
import { getVehicles, getVehicle, changeVehicleColor } from "./data";
import { pubSub } from "./ws-management";

export const resolvers: IResolvers = {
  Query: {
    vehicle: (handle, { numberPlate }: { numberPlate: string }) =>
      getVehicle(numberPlate),
    vehicles: () => getVehicles(),
  },
  Mutation: {
    changeVehicleColor: (
      handle,
      { numberPlate, newColor }: { numberPlate: string; newColor: string },
      ctx
    ) => changeVehicleColor(numberPlate, newColor),
  },
  Subscription: {
    vehicle: {
      resolve: (rootValue, { numberPlate }: { numberPlate: string }) => {
        return rootValue.vehicle;
      },
      // subscribe works similarly as resolve in any other GraphQL type
      // pubSub.subscribe() returns a resolver so we need to pass it all the args as were received
      // so we can be sure that everything works correctly internally
      subscribe: (
        rootValue,
        { numberPlate }: { numberPlate: string },
        ctx,
        info
      ) => {
        if (!rootValue) {
          const vehicle = getVehicle(numberPlate);
          rootValue = { vehicle };
        }
        return pubSub.subscribe(`vehicle--${numberPlate}`)(
          rootValue,
          { numberPlate },
          ctx,
          info
        );
      },
    },
  },
};
