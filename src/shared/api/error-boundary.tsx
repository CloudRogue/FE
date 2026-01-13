"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // 자식 컴포넌트에서 에러가 던져지면 상태를 업데이트
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // 에러 로깅이 필요하다면 여기서 처리
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Eligibility Check Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
