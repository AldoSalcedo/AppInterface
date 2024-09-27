/* eslint-disable prettier/prettier */
import { View } from "react-native";

export function Screen({ children }) {
  return <View className="flex-1 bg-black px-2 pt-3">{children}</View>;
}
