import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
//@ts-ignore
import CryptocurrencyIcon from 'react-native-cryptocurrency-hexagon-icons';

const ListItem = (props: ListItemProps) => {
  return (
    <Pressable
      style={styles.paddedContainer}
      android_ripple={{color: '#ccc', borderless: false}}>
      <CryptocurrencyIcon name={props.symbol} style={styles.icon} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.shadowText}>{props.symbol.toUpperCase()}</Text>
        </View>
        <Text style={styles.text}>
          {props.price}
          {props.currency}
        </Text>
      </View>
    </Pressable>
  );
};

interface ListItemProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  currency: string;
}

export default ListItem;

const styles = StyleSheet.create({
  paddedContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  container: {
    height: 72,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    paddingRight: 24,
  },

  icon: {
    width: 72,
    paddingLeft: 24,
    paddingRight: 24,
  },

  text: {
    fontSize: 18,
    color: '#333',
  },

  shadowText: {
    color: '#888',
  },
});