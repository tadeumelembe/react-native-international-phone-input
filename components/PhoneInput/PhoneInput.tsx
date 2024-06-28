import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewProps,
  Pressable,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CountriesData from "../../assets/coutry-codes.json";
import { CountriesLocale, CountryCodeType, CountryCodes, onChangeItem } from "./types";
import { AsYouType, validatePhoneNumberLength } from "libphonenumber-js";
import DropDown from "./DropDown";
import { BORDER_COLOR, BORDER_RADIUS } from "./utils/constants";

interface Props {
  containerStyle?: ViewProps["style"];
  dropDownStyle·?: ViewProps["style"];
  defaultCode?: CountryCodes;
  codeType?: "Flag" | "Dial_Code";
  locale?: CountriesLocale;
  showCode?: boolean;
  onChange: (item: onChangeItem) => void;
  onChangeValue?: (value: string) => void;
}

const PhoneInput = ({
  containerStyle,
  defaultCode = "US",
  locale = "EN",
  codeType = "Flag",
  showCode = true,
  onChange,
  onChangeValue,
}: Props) => {
  const deafaultCountryCodeArray = useMemo(
    () =>
      CountriesData.filter((el) => {
        return el.code === defaultCode;
      }),
    [defaultCode]
  );
  const [selectedItem, setSelectedItem] = useState(
    deafaultCountryCodeArray[0] as CountryCodeType
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [inputHeight, setInputHeight] = useState(55);
  const [inputValue, setInputValue] = useState("");
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState("");

  useEffect(() => {
    const phoneNumber = new AsYouType(selectedItem.code).input(inputValue);
    console.log(
      validatePhoneNumberLength(phoneNumber, selectedItem.code) === "TOO_LONG"
    );
    if (
      validatePhoneNumberLength(phoneNumber, selectedItem.code) === "TOO_LONG"
    )
      return;

    const onChangeItem: onChangeItem = {
      ...selectedItem,
      formattedPhone: phoneNumber,
    };

    onChange(onChangeItem);
    if (onChangeValue) onChangeValue(phoneNumber);

    setFormatedPhoneNumber(phoneNumber);
  }, [inputValue, selectedItem.code]);

  return (
    <View style={{ width: "100%" }}>
      <View
        onLayout={({ nativeEvent }) =>
          setInputHeight(nativeEvent.layout.height)
        }
        style={[styles.container, containerStyle]}
      >
        <Pressable onPress={() => setShowDropdown((prevState) => !prevState)}>
          <Text style={styles.codeType}>
            {codeType === "Dial_Code"
              ? selectedItem.dial_code
              : selectedItem.emoji}
          </Text>
        </Pressable>

        <View style={styles.inputContainer}>
          <Text style={styles.codeType}>{selectedItem.dial_code}</Text>
          <TextInput
            style={{ flex: 1 }}
            keyboardType="phone-pad"
            onChangeText={(text) => setInputValue(text)}
            value={formatedPhoneNumber}
          />
        </View>
      </View>
      {showDropdown && <DropDown locale={locale} selectItem={setSelectedItem} />}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    overflow: "hidden",
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  codeType: {},
});
