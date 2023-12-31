import Toast from 'react-native-toast-message';

export const showToast = (
  type,
  text,
  position = 'top',
  visibilityTime = 3000,
) => {
  Toast.show({
    type,
    text1: text,
    position,
    visibilityTime,
    autoHide: true,
  });
};
