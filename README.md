# react-native-image-layouts

Simple layout component for images

## Installation

```sh
npm install react-native-image-layouts

or 

yarn add react-native-image-layouts
```

## Usage

```js
import ImageLayouts from "react-native-image-layouts";

const layoutPattern = [1, 3, 2, 2, 1];

const images = [/* list of uris */];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
});

// ...
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
```

![Screenshot](https://user-images.githubusercontent.com/26643781/107158947-f5a5b300-6941-11eb-8bad-cb81e2d6dc7b.png)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
