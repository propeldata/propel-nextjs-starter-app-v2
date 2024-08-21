"use client";
import { Container, Flex, Grid, Box, Heading, Text } from "@radix-ui/themes";
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

// Configuration constants for the dashboard
// Defines data pool, filter names, labels, measures, and refresh interval
const dataPoolName = "flattened_orders"
const filter1 = "restaurant_name"
const filter2 = "taco_name"
const filter1Label = "Restaurant..."
const filter2Label = "Taco..."
const measure = "total_price"
const counter1Label = "Orders"
const counter2Label = "Revenue"
const counter3Label = "Average order"
const chart1Label = "Daily orders"
const chart2Label = "Revenue"

const refetchInterval = 1000 // 10 seconds refresh interval
const timeGranularity = TimeSeriesGranularity.FifteenMinutes
const timeRange = RelativeTimeRange.Today

interface Props {
  accessToken: string;
}

export function Dashboard(props: Props) {
  const { accessToken } = props

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
            <Heading as="h1">Dashboard</Heading>
            <Text size="9">
              Welcome to your Propel dashboard. Here you&apos;ll find an
              overview of your data.
            </Text>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "16px",
                paddingTop: "1rem",
              }}
            >
              {/* filters and time range picker */}
              <Box
                style={{
                  padding: "1rem",
                  width: "100%",
                  justifySelf: "start",
                  backgroundColor: gray.gray2,
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "16px",
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
              </Box>
              <Box
                style={{
                  padding: "1rem",
                  width: "100%",
                  justifySelf: "start",
                  backgroundColor: gray.gray2,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "16px",
                }}
              >
                <TimeRangePicker defaultValue={{ value: "today" }} />
              </Box>
              {/* New row with three columns */}
              <Box
                style={{
                  gridColumn: "1 / -1",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    justifySelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Card>
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
                        timeRange: {
                          relative: timeRange,
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
                <Box
                  style={{
                    width: "100%",
                    justifySelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Card>
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
                        timeRange: {
                          relative: timeRange,
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
                <Box
                  style={{
                    width: "100%",
                    justifySelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Card>
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
                          }
                        },
                        timeRange: {
                          relative: timeRange,
                        },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
              </Box>
              {/* New row with one column */}
              <Box style={{ gridColumn: "1 / -1" }}>
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
                      timeRange: {
                        relative: timeRange,
                      },
                      refetchInterval: refetchInterval,
                      granularity: timeGranularity,
                    }}
                  />
                </Card>
              </Box>
              {/* Another new row with one column */}
              <Box style={{ gridColumn: "1 / -1" }}>
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
                      timeRange: {
                        relative: timeRange,
                      },
                      refetchInterval: refetchInterval,
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
              </Box>
            </Grid>
          </Flex>
        </Container>
      </FilterProvider>
    </AccessTokenProvider>
  );
}
