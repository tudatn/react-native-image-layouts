import * as React from 'react';

import { StyleSheet, Image, SafeAreaView } from 'react-native';
import ImageLayouts from 'react-native-image-layouts';

const layoutPattern = [1, 3, 2, 2, 1];

const images = [
  'https://images.pexels.com/photos/3326113/pexels-photo-3326113.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3831823/pexels-photo-3831823.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850660/pexels-photo-3850660.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850925/pexels-photo-3850925.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850597/pexels-photo-3850597.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3622474/pexels-photo-3622474.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850660/pexels-photo-3850660.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850925/pexels-photo-3850925.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3850597/pexels-photo-3850597.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
];

export default function App() {
  function renderItem(uri: string, _index: number) {
    return <Image source={{ uri: uri }} style={styles.image} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageLayouts
        data={images}
        numberOfColumns={2}
        patterns={layoutPattern}
        renderItem={renderItem}
        dividerPadding={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
});
