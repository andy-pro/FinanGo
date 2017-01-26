// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  PageHeader,
  Paragraph,
  SwitchTheme,
  Text,
  Title,
  ToggleBaseline,
} from '../app/components';

const getDateString = date =>
  // new Date(date).toLocaleString()
  new Date(date).toLocaleDateString()

const HomePage = ({ viewer, transactions }) => {
  // const { viewer, transactions } = this.props
  // console.log('%crender HomePage', 'color:#880;font-weight:bold;', this.props);
  console.log('%crender HomePage', 'color:#880;font-weight:bold;', viewer, transactions);
  if (!viewer) return null
  const { currency } = viewer
  return (
    <Box>
      <Title message="FinanGo" />


      {transactions.map(item => (
        <Box key={item.date}
          display='flex'
          justifyContent='space-between'
          border="bottom"
          borderWidth={1}
          borderColor='silver'
          paddingBottom={0.1}
        >
          <Box display='inline'>
            <Text display='block' bold marginBottom={-0.3}>{item.title}
              { item.amount && <Text size={-1} color='green' marginLeft='0.25'>({item.amount})</Text> }
            </Text>
            <Text size={-1} fontStyle='italic'>{item.category}</Text>
            <Text size={-1}>{getDateString(item.date)}</Text>
          </Box>
          <Text size={0} color='danger' marginTop={0.35}>{item.cost} {currency}
            <Button lightdanger
              size={-1}
              paddingVertical={0}
              paddingHorizontal={0.35}
              align='center'
              marginLeft={0.4}
            >x</Button>
          </Text>
        </Box>
      ))}


      <PageHeader
        heading="Este"
        description="Starter kit for universal full–fledged React apps. One stack
          for browser, mobile, server."
      />
      <Heading size={1}>
        Heading
      </Heading>
      <Paragraph>
        Zdrasti, ququ, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>
      <Link
        display="block"
        to="https://github.com/este/este"
      >github.com/este/este</Link>

      <Text size={0}>normal text</Text><br />
      <Text display="block" size={-1}>small text</Text>
      <Text size={5}>text 5</Text><br />
      <Box marginVertical={2} marginHorizontal={-0.25}>
        <Button primary marginHorizontal={0.25}>primary</Button>
        <Button success marginHorizontal={0.25}>success</Button>
        <Button warning marginHorizontal={0.25}>warning</Button>
        <Button danger marginHorizontal={0.25}>danger</Button>
        <Button primary disabled marginHorizontal={0.25}>disabled</Button>
        <Button marginHorizontal={0.25}>text</Button>
      </Box>
      <SwitchTheme />
      <ToggleBaseline />
    </Box>
  );

}

// export default HomePage;
export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
  }),
  // { getTransactions }
)(HomePage);
