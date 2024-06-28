import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  TextInput,
} from "react-native";
import React, { memo, useMemo, useState } from "react";
import { BORDER_COLOR, BORDER_RADIUS } from "./utils/constants";
import CountriesDataPT from "../../assets/coutry-codes.json";
import CountriesDataEN from "../../assets/country-codes-en.json";
import { CountriesLocale, CountryCodeType, DropDownProps } from "./types";

const DropDown = ({ selectItem, locale = "EN" }: DropDownProps) => {
  const [searchTerm, setSearchItem] = useState("");

  const getCuntryData = (locale: CountriesLocale):CountryCodeType[] => {
    let CountryData = CountriesDataEN as CountryCodeType[];
    switch (locale) {
      case "EN":
        CountryData = CountriesDataEN as CountryCodeType[];
        break;
      case "PT":
        CountryData = CountriesDataPT as CountryCodeType[];
        break;
      default:
        CountryData = CountriesDataEN as CountryCodeType[];
        break;
    }
    return CountryData;
  };

  const CountriesData = getCuntryData(locale);
  
  const memorizedCoutryData = useMemo(() => {
    if (!searchTerm) return CountriesData;
    return CountriesData.filter((el) => {
      return el.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });
  }, [searchTerm]) as ArrayLike<CountryCodeType>;

  const renderItem = ({ item }: ListRenderItemInfo<CountryCodeType>) => {
    return (
      <TouchableOpacity
        key={`country-codes-${item.dial_code}`}
        onPress={() => selectItem(item)}
        style={styles.itemContainer}
      >
        <Text>{item.emoji}</Text>
        <Text>{item.name}</Text>
        <Text style={{ color: "#868686" }}>{item.dial_code}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.dropDown}>
      <TextInput
        style={styles.searchInput}
        placeholder="Type your country..."
        onChangeText={(text) => setSearchItem(text)}
      />
      <FlatList
        data={memorizedCoutryData}
        keyExtractor={(item) => item.code.toString()}
        renderItem={renderItem}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "800",
                marginVertical: 10,
              }}
            >
              Country not found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default memo(DropDown);

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: "#fff",
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    width: "100%",
    maxHeight: 300,
    position: "absolute",
    top: 55,
    zIndex: 10,
    paddingVertical: 10,
    paddingBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  searchInput: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 15,

    borderColor: "#dedcdc",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    borderColor: "#dedcdc",
    borderBottomWidth: 0,
  },
});
