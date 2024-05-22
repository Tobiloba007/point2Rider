import React, { forwardRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatList as ReactFlatList,
  ScrollView as ReactScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";

const LayoutBody = forwardRef((props, ref) => {
  const { style, children, ...rest } = props;
  const insets = useSafeAreaInsets();

  return (
    <ReactScrollView
      style={{ ...style, ...styles.mainContent }}
      contentContainerStyle={{
        // gap: 15,
        ...rest.contentContainerStyle,
        paddingBottom: insets.bottom + (Platform.OS === "android" ? 20 : 0),
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </ReactScrollView>
  );
});

const LayoutScrollView = forwardRef((props, ref) => {
  const { style, children, ...rest } = props;
  const insets = useSafeAreaInsets();

  return (
    <ReactScrollView
      alwaysBounceVertical={false}
      style={{ ...style, ...styles.mainContent }}
      contentContainerStyle={{
        // gap: 15,
        ...rest.contentContainerStyle,
        paddingBottom: insets.bottom + 30,
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </ReactScrollView>
  );
});

const LayoutFlatList = forwardRef((props, ref) => {
  const { contentContainerStyle, ...rest } = props;
  const insets = useSafeAreaInsets();

  return (
    <ReactFlatList
      contentContainerStyle={{
        ...contentContainerStyle,
        ...styles.mainContent,
        paddingBottom: insets.bottom + (Platform.OS === "android" ? 20 : 0),
      }}
      ref={ref}
      {...rest}
    />
  );
});

const LayoutRoot = forwardRef((props, ref) => {
  const { style, children, ...rest } = props;

  return (
    <View style={{ ...style, flex: 1 }} ref={ref} {...rest}>
      {children}
    </View>
  );
});

const Layout = Object.assign(LayoutRoot, {
  Body: LayoutBody,
  ScrollView: LayoutScrollView,
  FlatList: LayoutFlatList,
});

export default Layout;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    position: "relative",
  },
  leftIcon: {
    left: 15,
  },
  headerMainContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTextContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  headerTextDesc: {
    color: "white",
    flex: 1,
  },
  mainContent: {
    position: "relative",
    padding: 20,
  },
});
