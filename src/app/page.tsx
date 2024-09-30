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
} from "@propeldata/ui-kit";
import { gray } from "@propeldata/ui-kit/colors";

// Constants
const DATA_POOL_NAME = "TacoSoft Demo Data";

// Filters
const FILTERS = [
  { field: "restaurant_name", label: "Restaurant..." },
  { field: "taco_name", label: "Taco..." },
];

const MEASURE = "taco_total_price";
const METRIC_LABELS = ["Orders", "Revenue", "Average order"];
const CHART_LABELS = [
  "Orders over time",
  "Revenue over time",
  "Average order over time",
];

const BREAKDOWNS = [
  { field: "taco_name", label: "Taco" },
  { field: "tortilla_name", label: "Tortilla" },
  { field: "sauce_name", label: "Sauce" },
  { field: "restaurant_name", label: "Restaurant" },
  { field: "quantity", label: "Items ordered" },
  { field: "taco_total_price", label: "Order dollar size" },
];

const METRIC_BREAKDOWNS = [
  [0, 1, 2, 3, 4], // Metric 1 breakdowns
  [0, 1, 2, 3, 5], // Metric 2 breakdowns
  [0, 1, 2, 3], // Metric 3 breakdowns
];

// Metrics
const metrics = [
  {
    count: {
      dataPool: { name: DATA_POOL_NAME },
    },
  },
  {
    sum: {
      dataPool: { name: DATA_POOL_NAME },
      measure: {
        columnName: MEASURE,
      },
    },
  },
  {
    custom: {
      dataPool: { name: DATA_POOL_NAME },
      expression: `SUM(${MEASURE}) / COUNT()`,
    },
  },
];

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
                  width: "100%",
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
                  options={[
                    TimeSeriesGranularity.FifteenMinutes,
                    TimeSeriesGranularity.Hour,
                    TimeSeriesGranularity.Day,
                    TimeSeriesGranularity.Month,
                    TimeSeriesGranularity.Year,
                  ]}
                />
                <TimeRangePicker defaultValue={{ value: "this-month" }} />
              </Flex>
            </Flex>
            <Tabs.Root
              defaultValue={METRIC_LABELS[0]}
              style={{ border: "none", width: "100%" }}
            >
              {/* New row with three columns */}
              <Tabs.List style={{ padding: 0, width: "100%" }}>
                <Grid
                  columns={{ initial: "1", md: "3" }}
                  gap="4"
                  align="center"
                  width="100%"
                >
                  <Tabs.Card
                    style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer" }}
                    value={METRIC_LABELS[0]}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Text style={{ margin: 0 }}>{METRIC_LABELS[0]}</Text>
                        <br />
                        <Counter
                          localize
                          prefixValue=""
                          query={{
                            metric: metrics[0],
                            refetchInterval: REFETCH_INTERVAL,
                          }}
                        />
                      </Card>
                    </Flex>
                  </Tabs.Card>
                  <Tabs.Card
                    style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer" }}
                    value={METRIC_LABELS[1]}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Text style={{ margin: 0 }}>{METRIC_LABELS[1]}</Text>
                        <br />
                        <Counter
                          localize
                          prefixValue="$"
                          query={{
                            metric: metrics[1],
                            refetchInterval: REFETCH_INTERVAL,
                          }}
                        />
                      </Card>
                    </Flex>
                  </Tabs.Card>
                  <Tabs.Card style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer" }} value={METRIC_LABELS[2]}>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Text style={{ margin: 0 }}>{METRIC_LABELS[2]}</Text>
                        <br />
                        <Counter
                          localize
                          prefixValue="$"
                          query={{
                            metric: metrics[2],
                            refetchInterval: REFETCH_INTERVAL,
                          }}
                        />
                      </Card>
                    </Flex>
                  </Tabs.Card>
                </Grid>
              </Tabs.List>
              <Tabs.Content value={METRIC_LABELS[0]}>
                <Flex
                  direction="column"
                  gap="4"
                  style={{ width: "100%", paddingTop: "16px" }}
                >
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {CHART_LABELS[0]}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metrics[0],
                          refetchInterval: REFETCH_INTERVAL,
                          groupBy: [BREAKDOWNS[0].field],
                        }}
                        otherColor="gray.gray5"
                        maxGroupBy={8}
                        stacked={true}
                      />
                    </Card>
                  </Flex>
                  <Grid
                    columns={{ initial: "1", md: "2" }}
                    gap="4"
                    align="center"
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root defaultValue={BREAKDOWNS[0].label}>
                          <Tabs.List aria-label="tabs example">
                            {METRIC_BREAKDOWNS[0].slice(0, 3).map((index) => (
                              <Tabs.Trigger
                                key={index}
                                value={BREAKDOWNS[index].label}
                              >
                                {BREAKDOWNS[index].label}
                              </Tabs.Trigger>
                            ))}
                          </Tabs.List>
                          {METRIC_BREAKDOWNS[0].slice(0, 3).map((index) => (
                            <Tabs.Content
                              key={index}
                              value={BREAKDOWNS[index].label}
                            >
                              <Leaderboard
                                variant="table"
                                headers={["", "Count"]}
                                query={{
                                  metric: metrics[0],
                                  rowLimit: 100,
                                  dimensions: [
                                    { columnName: BREAKDOWNS[index].field },
                                  ],
                                  sort: Sort.Desc,
                                  refetchInterval: REFETCH_INTERVAL,
                                }}
                              />
                            </Tabs.Content>
                          ))}
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
                        <Tabs.Root
                          defaultValue={BREAKDOWNS[3].label}
                          orientation="vertical"
                        >
                          <Tabs.List aria-label="tabs example">
                            {METRIC_BREAKDOWNS[0].slice(3, 5).map((index) => (
                              <Tabs.Trigger
                                key={index}
                                value={BREAKDOWNS[index].label}
                              >
                                {BREAKDOWNS[index].label}
                              </Tabs.Trigger>
                            ))}
                          </Tabs.List>
                          {METRIC_BREAKDOWNS[0].slice(3, 5).map((index) => (
                            <Tabs.Content
                              key={index}
                              value={BREAKDOWNS[index].label}
                            >
                              <PieChart
                                variant="pie"
                                chartProps={{
                                  hideTotal: true,
                                  legendPosition: "right",
                                }}
                                query={{
                                  metric: metrics[0],
                                  rowLimit: 100,
                                  dimension: {
                                    columnName: BREAKDOWNS[index].field,
                                  },
                                  sort: Sort.Desc,
                                  refetchInterval: REFETCH_INTERVAL,
                                }}
                              />
                            </Tabs.Content>
                          ))}
                        </Tabs.Root>
                      </Card>
                    </Flex>
                  </Grid>
                </Flex>
              </Tabs.Content>
              <Tabs.Content value={METRIC_LABELS[1]}>
                <Flex
                  direction="column"
                  gap="4"
                  style={{ width: "100%", paddingTop: "16px" }}
                >
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {CHART_LABELS[1]}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        accentColors={["grass.grass7"]}
                        chartProps={{
                          fillArea: true,
                        }}
                        query={{
                          metric: metrics[1],
                          refetchInterval: REFETCH_INTERVAL,
                        }}
                      />
                    </Card>
                  </Flex>
                  <Grid
                    columns={{ initial: "1", md: "2" }}
                    gap="4"
                    align="center"
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root
                          defaultValue={BREAKDOWNS[0].label}
                          orientation="vertical"
                        >
                          <Tabs.List aria-label="tabs example">
                            {METRIC_BREAKDOWNS[1].slice(0, 3).map((index) => (
                              <Tabs.Trigger
                                key={index}
                                value={BREAKDOWNS[index].label}
                              >
                                {BREAKDOWNS[index].label}
                              </Tabs.Trigger>
                            ))}
                          </Tabs.List>
                          {METRIC_BREAKDOWNS[1].slice(0, 3).map((index) => (
                            <Tabs.Content
                              key={index}
                              value={BREAKDOWNS[index].label}
                            >
                              <Leaderboard
                                variant="table"
                                headers={["", "Count"]}
                                query={{
                                  metric: metrics[1],
                                  rowLimit: 100,
                                  dimensions: [
                                    { columnName: BREAKDOWNS[index].field },
                                  ],
                                  sort: Sort.Desc,
                                  refetchInterval: REFETCH_INTERVAL,
                                }}
                              />
                            </Tabs.Content>
                          ))}
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
                        <Tabs.Root
                          defaultValue={BREAKDOWNS[3].label}
                          orientation="vertical"
                        >
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value={BREAKDOWNS[3].label}>
                              {BREAKDOWNS[3].label}
                            </Tabs.Trigger>
                            <Tabs.Trigger value={BREAKDOWNS[5].label}>
                              {BREAKDOWNS[5].label}
                            </Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value={BREAKDOWNS[3].label}>
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right",
                              }}
                              query={{
                                metric: metrics[1],
                                rowLimit: 100,
                                dimension: { columnName: BREAKDOWNS[3].field },
                                sort: Sort.Desc,
                                refetchInterval: REFETCH_INTERVAL,
                              }}
                            />
                          </Tabs.Content>
                          <Tabs.Content value={BREAKDOWNS[5].label}>
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right",
                              }}
                              query={{
                                metric: metrics[1],
                                rowLimit: 100,
                                dimension: { columnName: BREAKDOWNS[5].field },
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
              <Tabs.Content value={METRIC_LABELS[2]}>
                <Flex
                  direction="column"
                  gap="4"
                  style={{ width: "100%", paddingTop: "16px" }}
                >
                  <Flex direction="column" style={{ width: "100%" }}>
                    <Card>
                      <Text size="3" weight="bold" style={{ margin: 0 }}>
                        {CHART_LABELS[2]}
                      </Text>
                      <TimeSeries
                        variant="bar"
                        query={{
                          metric: metrics[2],
                          refetchInterval: REFETCH_INTERVAL,
                          groupBy: [BREAKDOWNS[0].field],
                        }}
                        otherColor="gray.gray5"
                        maxGroupBy={100}
                        stacked={false}
                        showGroupByOther={false}
                      />
                    </Card>
                  </Flex>
                  <Grid
                    columns={{ initial: "1", md: "2" }}
                    gap="4"
                    align="center"
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      width="100%"
                    >
                      <Card style={{ width: "100%" }}>
                        <Tabs.Root
                          defaultValue={BREAKDOWNS[0].label}
                          orientation="vertical"
                        >
                          <Tabs.List aria-label="tabs example">
                            {METRIC_BREAKDOWNS[2].slice(0, 3).map((index) => (
                              <Tabs.Trigger
                                key={index}
                                value={BREAKDOWNS[index].label}
                              >
                                {BREAKDOWNS[index].label}
                              </Tabs.Trigger>
                            ))}
                          </Tabs.List>
                          {METRIC_BREAKDOWNS[2].slice(0, 3).map((index) => (
                            <Tabs.Content
                              key={index}
                              value={BREAKDOWNS[index].label}
                            >
                              <Leaderboard
                                variant="table"
                                headers={["", "Count"]}
                                query={{
                                  metric: metrics[2],
                                  rowLimit: 100,
                                  dimensions: [
                                    { columnName: BREAKDOWNS[index].field },
                                  ],
                                  sort: Sort.Desc,
                                  refetchInterval: REFETCH_INTERVAL,
                                }}
                              />
                            </Tabs.Content>
                          ))}
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
                        <Tabs.Root
                          defaultValue={BREAKDOWNS[3].label}
                          orientation="vertical"
                        >
                          <Tabs.List aria-label="tabs example">
                            <Tabs.Trigger value={BREAKDOWNS[3].label}>
                              {BREAKDOWNS[3].label}
                            </Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value={BREAKDOWNS[3].label}>
                            <PieChart
                              variant="pie"
                              chartProps={{
                                hideTotal: true,
                                legendPosition: "right",
                              }}
                              query={{
                                metric: metrics[2],
                                rowLimit: 100,
                                dimension: { columnName: BREAKDOWNS[3].field },
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
