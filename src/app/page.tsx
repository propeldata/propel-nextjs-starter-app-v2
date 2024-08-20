import {
  Container,
  Flex,
  Grid,
  Box,
  Heading,
  Text
} from '@radix-ui/themes';
import { gray } from '@radix-ui/colors';
import { ClientCredentials } from 'simple-oauth2'
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
  Typography
} from "@propeldata/ui-kit";

// Data pool name
const dataPoolName = "flattened_orders"
const filter1 = "restaurant_name"
const filter2 = "taco_name"
const filter1Label = "Restaurant..."
const filter2Label = "Taco..."
const total_price = "total_price"

const refetchInterval = 10000 // 10 seconds refresh interval


const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

//Set the config for the OAuth2 client
const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
    tokenPath: process.env.TOKEN_PATH
  }
}

//Create the OAuth2 client
const oauth2Client = new ClientCredentials(config)

export default async function Home() {

  //Get a token using the client credentials
  const accessToken = await oauth2Client.getToken({});

  return (
    <AccessTokenProvider accessToken={accessToken.token.access_token as string}>
      <FilterProvider>
        <Container size="4" style={{ maxWidth: 'min(1200px, 70%)', margin: '0 auto', paddingTop: '2rem' }}>
          <Flex direction="column" gap="4">
            <Heading as="h1">Dashboard</Heading>
            <Text size="9">Welcome to your Propel dashboard. Here you&apos;ll find an overview of your data.</Text>
            <Grid style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', paddingTop: '1rem' }}>
              {/* filters and time range picker */}
              <Box style={{
                padding: '1rem',
                width: '100%',
                justifySelf: 'start',
                backgroundColor: gray.gray2,
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '16px'
              }}>
                <SimpleFilter
                  query={{
                    columnName: filter1,
                    dataPool: { name: dataPoolName },
                    maxValues: 1000
                  }}
                  autocompleteProps={{ placeholder: filter1Label }}
                />
                <SimpleFilter
                  query={{
                    columnName: filter2,
                    dataPool: { name: dataPoolName },
                    maxValues: 1000
                  }}
                  autocompleteProps={{ placeholder: filter2Label }}
                />
              </Box>
              <Box style={{
                padding: '1rem',
                width: '100%',
                justifySelf: 'start',
                backgroundColor: gray.gray2,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px'
              }}>
                <TimeRangePicker
                  defaultValue={{ value: "last-30-days" }}
                />
              </Box>
              {/* New row with three columns */}
              <Box style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <Box style={{
                  width: '100%',
                  justifySelf: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <Card>
                    <Text style={{ margin: 0 }}>Orders</Text><br/>
                    <Counter
                      localize
                      prefixValue=""
                      query={{
                        metric: {
                          count: {
                            dataPool: { name: dataPoolName },
                          },
                        },
                        timeRange: { relative: "LAST_N_DAYS" as RelativeTimeRange, n: 30 },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
                <Box style={{
                  width: '100%',
                  justifySelf: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <Card>
                    <Text style={{ margin: 0 }}>Revenue</Text><br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: {
                          count: {
                            dataPool: { name: dataPoolName },
                          },
                        },
                        timeRange: { relative: "LAST_N_DAYS" as RelativeTimeRange, n: 30 },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
                <Box style={{
                  width: '100%',
                  justifySelf: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <Card>
                    <Text style={{ margin: 0 }}>Average revenue per order</Text><br />
                    <Counter
                      localize
                      prefixValue="$"
                      query={{
                        metric: {
                          count: {
                            dataPool: { name: dataPoolName },
                          },
                        },
                        timeRange: { relative: "LAST_N_DAYS" as RelativeTimeRange, n: 30 },
                        refetchInterval: refetchInterval,
                      }}
                    />
                  </Card>
                </Box>
              </Box>
              {/* New row with one column */}
              <Box style={{ gridColumn: '1 / -1'}}>
                <Card>
                  <Heading size="6" as="h2" style={{ margin: 0 }}>Daily orders</Heading>
                  <Text>Content for the new row 1 goes here.</Text>
                  <TimeSeries
                    variant="bar"
                    color="indigo"
                    query={{
                      metric: {
                        count: {
                          dataPool: { name: dataPoolName },
                        },
                      },
                      timeRange: { relative: "LAST_N_DAYS" as RelativeTimeRange, n: 30 },
                      refetchInterval: refetchInterval,
                      granularity: "DAY" as TimeSeriesGranularity
                    }}
                  />
                </Card>
              </Box>

              {/* Another new row with one column */}
              <Box style={{ gridColumn: '1 / -1' }}>
                <Card>
                  <Heading size="6" as="h2" style={{ margin: 0 }}>Revenue</Heading>
                  <Text>Content for the new row 2 goes here.</Text>
                  <TimeSeries
                    variant="bar"
                    query={{
                      metric: {
                        sum: {
                          dataPool: { name: dataPoolName },
                          measure: {
                            columnName: "total_price"
                          }
                        },
                      },
                      timeRange: { relative: "LAST_N_DAYS" as RelativeTimeRange, n: 30 },
                      granularity: "DAY" as TimeSeriesGranularity,
                      refetchInterval: refetchInterval,
                    }}
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