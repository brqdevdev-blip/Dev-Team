import { useState } from 'react';
import { TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

export default function PasswordInput({ value, onChangeText, placeholder = 'Mot de passe' }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.passwordContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.lockIcon} />
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        placeholderTextColor="#999"
      />
      <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999" />
      </Pressable>
    </View>
  );
}