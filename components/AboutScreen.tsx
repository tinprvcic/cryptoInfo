import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView, Text} from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={{padding: 16}}>
      <Text style={styles.heading}>
        This app fetches information about 15 most popular cryptocurrencies from
        CoinCap API and displays it in digestible manner.
      </Text>
      <Text style={styles.body}>
        This is an example of a completely static (hardcoded) screen. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Laborum, dicta
        assumenda! Nihil omnis, modi voluptatum enim officiis rerum libero rem,
        optio expedita ratione incidunt maxime, unde nisi eveniet doloremque
        officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        neque, illo rerum quo maiores ab aspernatur reprehenderit consectetur.
        Deserunt eligendi commodi amet culpa aliquid vel dignissimos, tempora
        voluptatibus fugit quae!
      </Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    paddingBottom: 8,
    marginBottom: 8,
    textAlign: 'center',
    borderBottomColor: '#888',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  body: {
    textAlign: 'justify',
  },
});
