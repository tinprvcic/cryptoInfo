import * as React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from './ListItem';

const fetchAllCoins = async (currency: string): Promise<CoinCapInfo[]> => {
  const api = 'https://api.coincap.io/v2/assets';

  try {
    const res = await fetch(api);
    const json = await res.json();

    return json.data.slice(0, 7);
  } catch {
    console.log('an error occured');
    return [];
  }
};

const listItem = ({item}: {item: CoinCapInfo}): JSX.Element => {
  const sym: string = item.symbol;
  return (
    <ListItem
      id={item.id}
      name={item.name}
      symbol={sym}
      price={Number(item.priceUsd)}
      currency="$"></ListItem>
  );
};

const HomeScreen = () => {
  const [data, setData]: [
    CoinCapInfo[],
    React.Dispatch<React.SetStateAction<CoinCapInfo[]>>,
  ] = React.useState(new Array());

  useEffect(() => {
    fetchAllCoins('usd').then(res => {
      setData(res);
    });
  }, []);

  return data.length ? (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        renderItem={listItem}
      />
    </View>
  ) : (
    <Text style={{fontSize: 24, textAlign: 'center', paddingTop: 48}}>
      Loading...
    </Text>
  );
};

interface CoinCapInfo {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  supply: string;
}

export default HomeScreen;
