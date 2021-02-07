import React, { useState, useEffect } from 'react';
import { FlatList, View, FlatListProps, ViewStyle } from 'react-native';
import styles from './styles';

interface Props extends Omit<FlatListProps<any>, 'renderItem'> {
  numberOfColumns: number;
  patterns: number[];
  data: any[];
  renderItem: (item: any, index: number) => JSX.Element | JSX.Element[];
  dividerPadding?: number; // to insert a padding for a row having multiple blocks
  layoutStyle?: ViewStyle;
  emptyListResultsText?: string;
}

/**
 * Render layout for any renderable objects
 *
 * @param {number}  numberOfColumns default number of columns
 * @param {number[]}  patterns arrays of columns for continuous rows
 * @param {any[]}  data arrays of objects to fill the layout
 * @param {number}  dividerPadding optional, padding among layout elements, default to 0
 * @param {function}  renderItem render function (item, index) for each data object
 * @param {}  layoutStyle optional additional style for layout content, useful when you want to have a horizonal margin
 */
function ImageLayout(props: Props, ref: any) {
  const [tiles, setTiles] = useState<any[][]>([]);

  function renderItem({ item, index }: { item: any[]; index: number }) {
    const itemLength = item.length;
    const padding = props.dividerPadding ? props.dividerPadding : 0;

    return (
      <View style={[styles.container, props.layoutStyle]}>
        {item.map((object, innerIndex) => (
          <View
            key={object ? object.id || innerIndex : innerIndex}
            style={[
              styles.subContainer,
              {
                marginTop: index === 0 ? 0 : padding,
                marginBottom: index === tiles.length - 1 ? 0 : padding,
                marginRight: innerIndex === itemLength - 1 ? 0 : padding,
                marginLeft: innerIndex === 0 ? 0 : padding,
              },
            ]}
          >
            {object ? props.renderItem(object, index) : null}
          </View>
        ))}
      </View>
    );
  }

  function generateKey(item: any[], index: number) {
    // TODO: get nested object ID
    const validObjects = item.filter((item) => item !== null);
    return validObjects.map((object) => object.id || index).join('-');
  }

  useEffect(() => {
    function generateLayoutFromData() {
      const dataLength = props.data.length;
      const patternsLength = props.patterns.length;
      const tiles: any[][] = [];
      let currentDataIndex = 0;
      if (props.data.length === 0) return tiles;
      for (let i = 0; i < patternsLength; i++) {
        const columns = props.patterns[i];
        if (currentDataIndex + columns < dataLength) {
          const newObject = props.data.slice(
            currentDataIndex,
            currentDataIndex + columns
          );
          tiles.push(newObject);
          currentDataIndex = currentDataIndex + columns;
        } else {
          const newObject = props.data.slice(currentDataIndex);
          tiles.push(newObject);
          currentDataIndex = currentDataIndex + columns;
          break;
        }
      }
      // load default pattern
      while (currentDataIndex < dataLength) {
        if (currentDataIndex + props.numberOfColumns < dataLength) {
          const newObject = props.data.slice(
            currentDataIndex,
            currentDataIndex + props.numberOfColumns
          );
          tiles.push(newObject);
        } else {
          const newObject = props.data.slice(currentDataIndex);
          const emptyObjectsLength = props.numberOfColumns - newObject.length;
          for (let j = 0; j < emptyObjectsLength; j++) {
            newObject.push(null);
          }
          tiles.push(newObject);
        }
        currentDataIndex = currentDataIndex + props.numberOfColumns;
      }
      return tiles;
    }
    const tiles = generateLayoutFromData();

    setTiles(tiles);
  }, [props.data, props.numberOfColumns, props.patterns]);

  if (props.data.length === 0) return null;

  return (
    <FlatList
      {...props}
      ref={ref}
      data={tiles}
      renderItem={renderItem}
      keyExtractor={generateKey}
    />
  );
}

export default React.memo(React.forwardRef(ImageLayout));
