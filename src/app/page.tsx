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

// Constants
const DATA_POOL_NAME = "TacoSoft Demo Data"
const MEASURE = "taco_total_price"
const METRIC1_LABEL = "Orders"
const METRIC2_LABEL = "Revenue"
const METRIC3_LABEL = "Average order"
const CHART1_LABEL = "Orders over time"
const CHART2_LABEL = "Revenue over time"
const CHART3_LABEL = "Average order over time"
const METRIC1_BREAKDOWN1_FIELD = "taco_name"
const METRIC1_BREAKDOWN1_LABEL = "Taco"
const METRIC1_BREAKDOWN2_FIELD = "tortilla_name"
const METRIC1_BREAKDOWN2_LABEL = "Tortilla"
const METRIC1_BREAKDOWN3_FIELD = "sauce_name"
const METRIC1_BREAKDOWN3_LABEL = "Sauce"
const METRIC1_BREAKDOWN4_FIELD = "restaurant_name"
const METRIC1_BREAKDOWN4_LABEL = "Restaurant"
const METRIC1_BREAKDOWN5_FIELD = "quantity"
const METRIC1_BREAKDOWN5_LABEL = "Items ordered"
const METRIC1_BREAKDOWN6_FIELD = "taco_total_price"
const METRIC1_BREAKDOWN6_LABEL = "Order dollar size"

// Filters
const FILTERS = [
  { field: "restaurant_name", label: "Restaurant..." },
  { field: "taco_name", label: "Taco..." }
]

// Metrics
let metric1 = {
  count: {
    dataPool: { name: DATA_POOL_NAME },
  },
}

let metric2 = {
  sum: {
    dataPool: { name: DATA_POOL_NAME },
    measure: {
      columnName: MEASURE,
    },
  },
}

let metric3 = {
  custom: {
    dataPool: { name: DATA_POOL_NAME },
    expression: `SUM(${MEASURE}) / COUNT()`,
  },
}

const REFETCH_INTERVAL = 10000; // 1 second refresh interval

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
                  {FILTERS.map((filter, index) => (
                    <SimpleFilter
                      key={index}
                      query={{
                        columnName: filter.field,
                        dataPool: { name: DATA_POOL_NAME },
                        maxValues: 1000,
                      }}
                      autocompleteProps={{ placeholder: filter.label }}
                    />
                  ))}
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
                  <Text style={{ margin: 0 }}>{METRIC1_LABEL}</Text>
                  <br />
                  <Counter
                    localize
                    prefixValue=""
                    query={{
                      metric: metric1,
                      refetchInterval: REFETCH_INTERVAL,
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
                  <Text style={{ margin: 0 }}>{METRIC2_LABEL}</Text>
                  <br />
                  <Counter
                    localize
                    prefixValue="$"
                    query={{
                      metric: metric2,
                      refetchInterval: REFETCH_INTERVAL
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
                  <Text style={{ margin: 0 }}>{METRIC3_LABEL}</Text>
                  <br />
                  <Counter
                    localize
                    prefixValue="$"
                    query={{
                      metric: metric3,
                      refetchInterval: REFETCH_INTERVAL,
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
                    <Text style={{ margin: 0 }}>{METRIC1_LABEL}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue=""
                      query={{
                        metric: metric1,
                        refetchInterval: REFETCH_INTERVAL,
                      }}
                    />
                  </Card>
                </Tabs.Trigger>
                <Tabs.Trigger value="revenue">
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{METRIC2_LABEL}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: metric2,
                        refetchInterval: REFETCH_INTERVAL
                      }}
                    />
                  </Card>
                </Tabs.Trigger>
                <Tabs.Trigger value="average_order">
                  <Card style={{ width: "100%" }}>
                    <Text style={{ margin: 0 }}>{METRIC3_LABEL}</Text>
                    <br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: metric3,
                        refetchInterval: REFETCH_INTERVAL,
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
                        {CHART1_LABEL}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metric1,
                          refetchInterval: REFETCH_INTERVAL,
                          groupBy: [METRIC1_BREAKDOWN1_FIELD],
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
                            <Tabs.Trigger value="taco">{ METRIC1_BREAKDOWN1_LABEL }</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">{ METRIC1_BREAKDOWN2_LABEL }</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">{ METRIC1_BREAKDOWN3_LABEL }</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric1,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: METRIC1_BREAKDOWN1_FIELD },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: REFETCH_INTERVAL,
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
                                  { columnName: METRIC1_BREAKDOWN2_FIELD },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: REFETCH_INTERVAL,
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
                                  { columnName: METRIC1_BREAKDOWN3_FIELD },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: REFETCH_INTERVAL,
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
                            <Tabs.Trigger value="restaurant">{ METRIC1_BREAKDOWN4_LABEL }</Tabs.Trigger>
                            <Tabs.Trigger value="quantity">{ METRIC1_BREAKDOWN5_LABEL }</Tabs.Trigger>
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
                                dimension: { columnName: METRIC1_BREAKDOWN4_FIELD },
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                                dimension: { columnName: METRIC1_BREAKDOWN5_FIELD },
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                        {CHART2_LABEL}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        accentColors={["grass"]}
                        chartProps={{
                          fillArea: true,
                        }}
                        query={{
                          metric: metric2,
                          refetchInterval: REFETCH_INTERVAL
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
                            <Tabs.Trigger value="taco">{METRIC1_BREAKDOWN1_LABEL}</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">{METRIC1_BREAKDOWN2_LABEL}</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">{METRIC1_BREAKDOWN3_LABEL}</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric2,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: METRIC1_BREAKDOWN1_FIELD },
                                ],
                                sort: Sort.Desc,
                                timeRange: { relative: RelativeTimeRange.LastNDays, n: 30 },
                                refetchInterval: REFETCH_INTERVAL,
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
                                  { columnName: METRIC1_BREAKDOWN2_FIELD },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                                  { columnName: METRIC1_BREAKDOWN3_FIELD },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                            <Tabs.Trigger value="restaurant">{METRIC1_BREAKDOWN4_LABEL}</Tabs.Trigger>
                            <Tabs.Trigger value="order_size">{METRIC1_BREAKDOWN6_LABEL}</Tabs.Trigger>
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
                                dimension: { columnName: METRIC1_BREAKDOWN4_FIELD },
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                                dimension: { columnName: METRIC1_BREAKDOWN6_FIELD },
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                        {CHART3_LABEL}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metric3,
                          refetchInterval: REFETCH_INTERVAL,
                          groupBy: [METRIC1_BREAKDOWN1_FIELD],
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
                            <Tabs.Trigger value="taco">{METRIC1_BREAKDOWN1_LABEL}</Tabs.Trigger>
                            <Tabs.Trigger value="tortilla">{METRIC1_BREAKDOWN2_LABEL}</Tabs.Trigger>
                            <Tabs.Trigger value="salsa">{METRIC1_BREAKDOWN3_LABEL}</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="taco">
                            <Leaderboard
                              variant="table"
                              headers={["", "Count"]}
                              query={{
                                metric: metric3,
                                rowLimit: 100,
                                dimensions: [
                                  { columnName: METRIC1_BREAKDOWN1_FIELD },
                                ],
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
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
                                refetchInterval: REFETCH_INTERVAL,
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
                                refetchInterval: REFETCH_INTERVAL,
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
                            <Tabs.Trigger value="restaurant">{METRIC1_BREAKDOWN4_LABEL}</Tabs.Trigger>
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
                                refetchInterval: REFETCH_INTERVAL,
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
