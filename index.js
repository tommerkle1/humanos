const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    userId: String
  }

  type HeartRate {
    data: String
    time: String
  }

  type HeartRates {
    values: [HeartRate]
  }

  type Duration {
    bounds: String
    lower: String
    upper: String
  }

  type SleepData {
    cyclesCount: Int
    disturbanceCount: Int
    during: Duration
    id: Int
    inBedDuration: Float
    isNap: Boolean
    latencyDuration: Float
    noDataDuration: Float
    qualityDuration: Float
    remSleepDuration: Float
    respiratoryRate: Float
    responded: Boolean
    score: Float
    sleepConsistency: Float
    sleepEfficiency: Float
    slowWaveSleepDuration: Float
    source: String
    state: String
    surveyResponseId: Float
    timezoneOffset: String
    wakeDuration: Float
  }

  type NeedBreakdown {
    baseline: Float
    debt: Float
    naps: Float
    strain: Float
    total: Float
  }

  type Sleep {
    id: String
    data: SleepData
    naps: [SleepData]
    needBreakdown: NeedBreakdown
    qualityDuration: Float
    sleeps: [SleepData]
    state: String
  }

  type Cycle {
    sleep: Sleep
    # strain: Strain
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    cycles: [Cycle]
  }
`;

const cycles = [
  {
    sleep: {
      id: "1",
      qualityDuration: 10,
      state: "state1",
    },
  },
  {
    sleep: {
      id: "2",
      qualityDuration: 5,
      state: "state2",
    },
  },
];

const resolvers = {
  Query: {
    cycles: () => cycles,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
