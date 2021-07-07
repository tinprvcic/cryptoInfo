import * as React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem';
import SortChooser from './SortChooser';

const HomeScreen = ({navigation}: {navigation: Navigation}) => {
  const [data, setData]: [
    CoinCapInfo[],
    React.Dispatch<React.SetStateAction<CoinCapInfo[]>>,
  ] = React.useState(new Array());

  const [sortIndex, setSortIndex] = useState(0);
  const availableSorts = ['popularity', 'value', 'alphabetical'];
  const sortLut = [
    (a: CoinCapInfo, b: CoinCapInfo) => Number(a.rank) > Number(b.rank),
    (a: CoinCapInfo, b: CoinCapInfo) => Number(a.priceUsd) < Number(b.priceUsd),
    (a: CoinCapInfo, b: CoinCapInfo) => a.name > b.name,
  ];

  const updateSort = () => {
    const newSortIndex =
      sortIndex < availableSorts.length - 1 ? sortIndex + 1 : 0;
    setSortIndex(newSortIndex);

    return availableSorts[newSortIndex];
  };

  const fetchAllCoins = async (): Promise<CoinCapInfo[]> => {
    const api = 'https://api.coincap.io/v2/assets';

    try {
      const res = await fetch(api);
      const json = await res.json();

      return json.data
        .slice(0, 20)
        .sort((a: CoinCapInfo, b: CoinCapInfo) => sortLut[sortIndex](a, b));
    } catch {
      console.error('an error occured');
      return [];
    }
  };

  const openInfoScreen = (id: string, name: string) => {
    navigation.navigate('Info', {id, name});
  };

  const listItem = ({item}: {item: CoinCapInfo}): JSX.Element => {
    const sym: string = item.symbol;
    return (
      <ListItem
        id={item.id}
        name={item.name}
        symbol={sym}
        price={Number(item.priceUsd)}
        onPress={(id, name) => openInfoScreen(id, name)}
      />
    );
  };

  useEffect(() => {
    fetchAllCoins().then(res => {
      setData(res);
    });
  }, [sortIndex]); // updateSort() could just sort current state; but this fetches refreshed data aswell

  return data.length ? (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SortChooser onPress={() => updateSort()} />
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        renderItem={listItem}
      />
    </View>
  ) : (
    // could extract and reuse (if it was more complex - spinner or such)
    <Text style={{fontSize: 24, textAlign: 'center', paddingTop: 48}}>
      Loading...
    </Text>
  );
};

export interface CoinCapInfo {
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

interface Navigation {
  navigate: (location: string, params: Object) => void;
}

export default HomeScreen;
