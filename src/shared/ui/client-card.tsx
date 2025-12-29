"use client";

import CardBase, { CardProps } from "./card.base";

/**
 * 클릭 이벤트나 상호작용이 필요한 경우 사용하는 카드이다.
 */
export default function ClientCard(props: CardProps) {
  return <CardBase {...props} />;
}
