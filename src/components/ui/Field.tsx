import { TextInput } from 'react-native';
import styles from '../../styles';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
};

export default function Field({ value, onChangeText, placeholder, keyboardType, secureTextEntry }: Props) {
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