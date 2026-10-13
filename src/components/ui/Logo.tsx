import GroupLogo from '../../../assets/logos/Group.svg';

type Props = {
  width?: number;
  height?: number;
  style?: any;
};

export default function Logo({ width = 56, height = 48, style }: Props) {
  return <GroupLogo width={width} height={height} style={style} />;
}