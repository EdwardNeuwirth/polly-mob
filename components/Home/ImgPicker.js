import React from "react";

export default async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    base64: true,
    exif: true,
    aspect: [1, 1]
  });
  console.log(result);
  if (!result.canceled) {
    return result;
  }
};