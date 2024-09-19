import { ClientCredentials, ModuleOptions } from "simple-oauth2";

import {
  AccessTokenProvider,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Card,
  TimeRangePicker,
  SimpleFilter,
  FilterProvider,
  TimeSeries,
  TimeGrainPicker,
  TimeSeriesGranularity,
  Leaderboard,
  Sort,
  Tabs,
  Counter,
  PieChart,
  RelativeTimeRange,
} from "@propeldata/ui-kit";
import { gray } from "@propeldata/ui-kit/colors"

const dataPoolName = "TacoSoft Demo Data"
const filter1 = "restaurant_name"
const filter2 = "taco_name"
const filter1Label = "Restaurant..."
const filter2Label = "Taco..."
const measure = "taco_total_price"
const counter1Label = "Orders"
const counter2Label = "Revenue"
const counter3Label = "Average order"
const chart1Label = "Orders over time"
const chart2Label = "Revenue over time"
const chart3Label = "Average order over time"

const refetchInterval = 10000; // 1 second refresh interval

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

// Metrics

let metric1 = {
  count: {
    dataPool: { name: dataPoolName },
  },
}

let metric2 = {
  sum: {
    dataPool: { name: dataPoolName },
    measure: {
      columnName: measure,
    },
  },
}

let metric3 = {
  custom: {
    dataPool: { name: dataPoolName },
    expression: `SUM(${measure}) / COUNT()`,
  },
}

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
          //size="4"
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
                <TimeGrainPicker
                  defaultValue={TimeSeriesGranularity.FifteenMinutes}
                  options={[TimeSeriesGranularity.FifteenMinutes, TimeSeriesGranularity.Hour, TimeSeriesGranularity.Day, TimeSeriesGranularity.Month, TimeSeriesGranularity.Year]}
                />
                <TimeRangePicker
                  defaultValue={{ value: "this-month" }}
                />
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
                      metric: metric1,
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
                      metric: metric2,
                      refetchInterval: refetchInterval
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
                      metric: metric3,
                      refetchInterval: refetchInterval,
                    }}
                  />
                </Card>
              </Flex>
            </Grid>
            <Tabs.Root
              defaultValue="orders"
            >
              <Tabs.List>
                <Tabs.Trigger value="orders">
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter1Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue=""
                      query={{
                        metric: metric1,
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Tabs.Trigger>
                <Tabs.Trigger value="revenue">
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter2Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: metric2,
                        refetchInterval: refetchInterval
                      }}
                    />
                  </Card>
                </Tabs.Trigger>
                <Tabs.Trigger value="average_order">
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{counter3Label}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: metric3,
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="orders">
                <Flex direction="column" gap="4" style={{ width: "100%", paddingTop:"16px" }}>
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {chart1Label}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metric1,
                          refetchInterval: refetchInterval,
                          groupBy: ["taco_name"],
                        }}
                        otherColor="gray.gray5"
                        maxGroupBy={8}
                        stacked={true}
                      />
                    </Card>
                  </Flex>
                  <Grid columns={{ initial: "1", md: "2" }} gap="4" align="center">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >

                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="taco" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="taco">Taco</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">Tortilla</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">Salsa</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "taco_name" },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="tortilla">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "tortilla_name" },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="salsa">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "sauce_name" },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>
                      </Card>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      style={{ width: "100%" }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="restaurant" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="restaurant">Restaurant</Tabs.Trigger>
                            <Tabs.Trigger value="quantity">Items ordered</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="restaurant">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimension: { columnName: "restaurant_name" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="quantity">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimension: { columnName: "quantity" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>

                      </Card>
                    </Flex>
                  </Grid>
                </Flex>
              </Tabs.Content>
              <Tabs.Content value="revenue">
                <Flex direction="column" gap="4" style={{ width: "100%", paddingTop: "16px" }}>
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {chart2Label}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        accentColors={["grass"]}
                        chartProps={{
                          fillArea: true,
                        }}
                        query={{
                          metric: metric2,
                          refetchInterval: refetchInterval
                        }}
                      // chartConfigProps={async (config) => {
                      //   "use server"
                      //   return {
                      //     ...config,
                      //     options: {
                      //       ...config.options,
                      //       scales: {
                      //         ...config.options?.scales,
                      //         y: {
                      //           ...config.options?.scales?.y,
                      //           ticks: {
                      //             ...config.options?.scales?.y?.ticks,
                      //             // Prefix the Y-axis labels with $
                      //             callback: function (value) {
                      //               return '$' + value;
                      //             }
                      //           }
                      //         }
                      //       }
                      //     }}
                      //   }
                      // }
                      />
                    </Card>
                  </Flex>
                  <Grid columns={{ initial: "1", md: "2" }} gap="4" align="center">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >

                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="taco" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="taco">Taco</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">Tortilla</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">Salsa</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "taco_name" },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="tortilla">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "tortilla_name" },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="salsa">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "sauce_name" },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>
                      </Card>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      style={{ width: "100%" }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="restaurant" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="restaurant">Restaurant</Tabs.Trigger>
                            <Tabs.Trigger value="order_size">Order dollar size</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="restaurant">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimension: { columnName: "restaurant_name" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="order_size">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimension: { columnName: "taco_total_price" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>

                      </Card>
                    </Flex>
                  </Grid>
                </Flex>
              </Tabs.Content>
              <Tabs.Content value="average_order">
                <Flex direction="column" gap="4" style={{ width: "100%", paddingTop: "16px" }}>
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {chart3Label}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metric3,
                          refetchInterval: refetchInterval,
                          groupBy: ["taco_name"],
                        }}
                        otherColor="gray.gray5"
                        maxGroupBy={100}
                        stacked={false}
                        showGroupByOther={false}
                      />
                    </Card>
                  </Flex>
                  <Grid columns={{ initial: "1", md: "2" }} gap="4" align="center">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >

                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="taco" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="taco">Taco</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">Tortilla</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">Salsa</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "taco_name" },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="tortilla">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "tortilla_name" },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="salsa">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: "sauce_name" },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>
                      </Card>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      style={{ width: "100%" }}
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue="restaurant" orientation="vertical">
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value="restaurant">Restaurant</Tabs.Trigger>
                            <Tabs.Trigger value="quantity">Items ordered</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="restaurant">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimension: { columnName: "restaurant_name" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value="quantity">
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right"
                              }}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimension: { columnName: "quantity" },
                                sort: Sort.Desc,
                                refetchInterval: refetchInterval,
                              }}
                            />
                          </Tabs.Content>
                        </Tabs.Root>
                      </Card>
                    </Flex>
                  </Grid>
                </Flex>
              </Tabs.Content>
            </Tabs.Root>
          </Flex>
        </Container>
      </FilterProvider>
    </AccessTokenProvider>
  );
}
