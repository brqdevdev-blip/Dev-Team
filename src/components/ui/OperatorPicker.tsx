import { View } from 'react-native';
import styles from '../../styles';
import OperatorButton from './OperatorButton';
import { OPERATORS } from '../../data/operators';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function OperatorPicker({ selectedId, onSelect }: Props) {
  return (
    <View style={styles.payOpRow}>
      {OPERATORS.map((op) => (
        <OperatorButton
          key={op.id}
          op={op}
          selected={selectedId === op.id}
          onPress={() => onSelect(op.id)}
        />
      ))}
    </View>
  );
}