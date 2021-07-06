import * as React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CoinCapInfo} from './HomeScreen';

const InfoScreen = ({route}: InfoScreenProps) => {
  const [info, setInfo]: [[CoinCapInfo | null, number], any] = useState([
    null,
    0,
  ]);

  const fetchInfoAboutCoin = async (
    id: string,
  ): Promise<[CoinCapInfo | null, number]> => {
    const api = 'https://api.coincap.io/v2/assets';

    try {
      const res = await fetch(`${api}/${id}`);
      const json = await res.json();

      return [json.data, json.timestamp];
    } catch {
      console.error('an error occured');
      return [null, Date.now()];
    }
  };

  useEffect(() => {
    fetchInfoAboutCoin(route.params.id).then(res => {
      setInfo(res);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f3f4f6'}}>
      {!info[0] && (
        <Text style={{fontSize: 24, textAlign: 'center', paddingTop: 48}}>
          Loading...
        </Text>
      )}

      {!info[0] || (
        <ScrollView>
          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={{...styles.text}}>Symbol: </Text>
              <Text style={styles.valText}>{info[0].symbol}</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={{...styles.text}}>Market Rank: </Text>
              <Text style={styles.valText}>#{info[0].rank}</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={styles.text}>Price: </Text>
              <Text style={styles.valText}>
                ${Number(info[0].priceUsd).toFixed(4)}
              </Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={{...styles.text}}>Price Change: </Text>
              <Text
                style={{
                  ...styles.valText,
                  color:
                    Number(info[0].changePercent24Hr) > 0
                      ? '#177245'
                      : '#7d161a',
                }}>
                {Number(info[0].changePercent24Hr) > 0 ? '+' : ''}
                {Number(info[0].changePercent24Hr).toFixed(2)}%
              </Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={{...styles.text}}>Trading Volume: </Text>
              <Text style={styles.valText}>
                ${Number(info[0].volumeUsd24Hr).toFixed(0)}
              </Text>
            </View>
          </View>

          <View style={{backgroundColor: '#fff'}}>
            <View style={styles.textCard}>
              <Text style={{...styles.text}}>Market Cap: </Text>
              <Text style={styles.valText}>
                ${Number(info[0].marketCapUsd).toFixed(0)}
              </Text>
            </View>
          </View>

          <Text style={styles.lastUpdated}>
            Last updated on {new Date(info[1]).toUTCString()}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

interface InfoScreenProps {
  route: {params: {id: string; name: string}};
}

export default InfoScreen;

const styles = StyleSheet.create({
  textCard: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderColor: '#eff2f5',
    borderTopWidth: StyleSheet.hairlineWidth * 3,
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#58667e',
  },

  lastUpdated: {
    color: '#888',
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 12,
  },
  valText: {
    color: '#222531',
    fontWeight: 'bold',
  },
});
