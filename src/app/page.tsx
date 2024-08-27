import { ClientCredentials, ModuleOptions } from "simple-oauth2";

import { Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  AccessTokenProvider,
  Card,
  TimeRangePicker,
  SimpleFilter,
  FilterProvider,
  TimeSeries,
  TimeSeriesGranularity,
  RelativeTimeRange,
  Counter,
  Typography,
} from "@propeldata/ui-kit";
import { gray } from "@radix-ui/colors";

const dataPoolName = "";
const filter1 = "";
const filter2 = "";
const filter1Label = "";
const filter2Label = "";
const measure = "";
const counter1Label = "";
const counter2Label = "";
const counter3Label = "";
const chart1Label = "";
const chart2Label = "";

const refetchInterval = 1000; // 1 second refresh interval
const timeGranularity = TimeSeriesGranularity.FifteenMinutes;

//Set the config for the OAuth2 client
const config: ModuleOptions<"client_id"> = {
  client: {
    id: process.env.CLIENT_ID ?? "",
    secret: process.env.CLIENT_SECRET ?? "",
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST ?? "",
    tokenPath: process.env.TOKEN_PATH ?? "",
  },
};

//Create the OAuth2 client
const oauth2Client = new ClientCredentials(config);

export default async function Home() {
  //Get a token using the client credentials
  const res = await oauth2Client.getToken({});

  const accessToken = res.token["access_token"] as string;

  return (
    <AccessTokenProvider accessToken={accessToken}>
      <FilterProvider>
        <Container
          size="4"
          style={{
            maxWidth: "min(1200px, 70%)",
            margin: "0 auto",
            paddingTop: "2rem",
          }}
        >
          <Flex direction="column" gap="4">
            <Heading as="h1">My Dashboard</Heading>
            <Text size="3">
              Welcome to your Propel dashboard. Here you&apos;ll find an
              overview of your data.
            </Text>
              {/* filters and time range picker */}
              <Flex width="100%">
                <Flex
                  style={{
                    padding: "1rem",
                    justifySelf: "start",
                    backgroundColor: gray.gray2,
                    gap: "16px",
                    width: "100%"
                  }}
                >
                  <SimpleFilter
                    query={{
                      columnName: filter1,
                      dataPool: { name: dataPoolName },
                      maxValues: 1000,
                    }}
                    autocompleteProps={{ placeholder: filter1Label }}
                  />
                  <SimpleFilter
                    query={{
                      columnName: filter2,
                      dataPool: { name: dataPoolName },
                      maxValues: 1000,
                    }}
                    autocompleteProps={{ placeholder: filter2Label }}
                  />
                </Flex>
                <Flex
                  style={{
                    padding: "1rem",
                    width: "100%",
                    justifySelf: "start",
                    backgroundColor: gray.gray2,
                    justifyContent: "flex-end",
                    gap: "16px",
                  }}
                >
                  <TimeRangePicker defaultValue={{ value: "today" }} />
                </Flex>
              </Flex>
              {/* New row with three columns */}
              <Grid columns={{ initial: "1", md: "3" }} gap="4" align="center">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  width="100%"
                >
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter1Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue=""
                      query={{
                        metric: {
                          count: {
                            dataPool: { name: dataPoolName },
                          },
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Flex>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  style={{ width: "100%" }}
                >
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter2Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: {
                          sum: {
                            dataPool: { name: dataPoolName },
                            measure: {
                              columnName: measure,
                            },
                          },
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Flex>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  style={{ width: "100%" }}
                >
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter3Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: {
                          custom: {
                            dataPool: { name: dataPoolName },
                            expression: `SUM(${measure}) / COUNT()`,
                          },
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Flex>
              </Grid>
              {/* New row with one column */}
              <Flex direction="column" style={{ width: "100%" }}>
                <Card>
                  <Heading size="6" as="h2" style={{ margin: 0 }}>
                    {chart1Label}
                  </Heading>
                  <TimeSeries
                    variant="bar"
                    color="indigo"
                    query={{
                      metric: {
                        count: {
                          dataPool: { name: dataPoolName },
                        },
                      },
                      refetchInterval: refetchInterval,
                      granularity: timeGranularity,
                    }}
                  />
                </Card>
              </Flex>
              {/* Another new row with one column */}
              <Flex direction="column" style={{ width: "100%" }}>
                <Card>
                  <Heading size="6" as="h2" style={{ margin: 0 }}>
                    {chart2Label}
                  </Heading>
                  <TimeSeries
                    variant="bar"
                    query={{
                      metric: {
                        sum: {
                          dataPool: { name: dataPoolName },
                          measure: {
                            columnName: measure,
                          },
                        },
                      },
                      granularity: timeGranularity,
                    }}
                    // chartConfigProps={(config) => ({
                    //   ...config,
                    //   options: {
                    //     scales: {
                    //       y: {
                    //         ticks: {
                    //           // Prefix the Y-axis labels with $
                    //           callback: function (value) {
                    //             return '$' + value;
                    //           }
                    //         }
                    //       }
                    //     }
                    //   }
                    // })}
                  />
                </Card>
              </Flex>
          </Flex>
        </Container>
      </FilterProvider>
    </AccessTokenProvider>
  );
}
