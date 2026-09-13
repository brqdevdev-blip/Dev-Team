import { useState } from 'react';
import { View, Pressable } from 'react-native';
import styles from '../../styles';

// Pressable operator card: drop shadow when idle, inner shadow when pressed/selected.
export default function OperatorButton({ op, selected, onPress }) {
  const [pressed, setPressed] = useState(false);
  const Logo = op.Logo;

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[styles.payOpBtn, (pressed || selected) && styles.payOpBtnPressed]}>
      <View style={[styles.payOpImgWrap]}>
        <Logo width={'90%'} height={'90%'} />
      </View>
      {(pressed || selected) && <View style={styles.payOpInnerShadow} />}
    </Pressable>
  );
}
