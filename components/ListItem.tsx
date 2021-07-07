import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import CoinIcon from 'react-coin-icon';

const ListItem = (props: ListItemProps) => {
  return (
    <Pressable
      onPress={() => props.onPress(props.id, props.name)}
      style={styles.paddedContainer}
      android_ripple={{color: '#ccc', borderless: false}}>
      <CoinIcon symbol={props.symbol} style={styles.icon} />
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.shadowText}>{props.symbol.toUpperCase()}</Text>
        </View>
        <Text style={styles.text}>
          ${props.price < 2 ? props.price.toFixed(3) : props.price.toFixed(2)}
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
  onPress: (id: string, name: string) => void;
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
    height: 64,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderColor: '#eff2f5',
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    paddingRight: 24,
  },

  icon: {
    width: 72,
    paddingLeft: 24,
    paddingRight: 24,
  },

  text: {
    fontSize: 16,
    color: '#333',
  },

  shadowText: {
    color: '#58667e',
  },
});
