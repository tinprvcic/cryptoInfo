import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SortChooserProps {
  onPress: () => string;
}

const SortChooser: React.FunctionComponent<SortChooserProps> = (
  props: SortChooserProps,
) => {
  const [sort, setSort] = useState('popularity');

  return (
    <Pressable
      android_ripple={{color: '#ccc', borderless: false}}
      style={styles.container}
      onPress={() => setSort(props.onPress())}>
      <Text style={styles.text}>SORT BY: {sort.toUpperCase()}</Text>
      <Icon name="sort" style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderColor: '#eff2f5',
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
  },

  icon: {
    fontSize: 18,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default SortChooser;
