import { TextInput } from 'react-native';
import styles from '../../styles';

export default function Field({ value, onChangeText, placeholder, keyboardType, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
    />
  );
}