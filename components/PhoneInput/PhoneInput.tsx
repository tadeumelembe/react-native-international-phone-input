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
import { CountryCodeType, CountryCodes } from "./types";
import { AsYouType } from "libphonenumber-js";
import DropDown from "./DropDown";
import { BORDER_COLOR, BORDER_RADIUS } from "./utils/constants";

interface Props {
  containerStyle?: ViewProps["style"];
  dropDownStyle·?: ViewProps["style"];
  defaultCode?: CountryCodes;
  codeType?: "Flag" | "Dial_Code";
  showCode?: boolean;
  onChange?: (item: CountryCodeType) => void;
}

const PhoneInput = ({
  containerStyle,
  defaultCode = "BR",
  codeType = "Flag",
  showCode = true,
  onChange,
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

  const [inputHeight, setInputHeight] = useState(55);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const phoneNumber = new AsYouType(selectedItem.code).input(inputValue);

    onChange(phoneNumber);
  }, [inputValue]);

  return (
    <View style={{ width: "100%" }}>
      <View
        onLayout={({ nativeEvent }) =>
          setInputHeight(nativeEvent.layout.height)
        }
        style={[styles.container, containerStyle]}
      >
        <Pressable>
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
          />
        </View>
      </View>
      <DropDown />
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
    borderColor:BORDER_COLOR,
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