import CardBase, { CardProps } from "./card.base";

/**
 * 일반적인 정보 표시용 카드이다.
 */
export default function Card(props: CardProps) {
  return <CardBase {...props} />;
}
