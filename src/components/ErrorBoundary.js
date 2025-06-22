import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.7;
`;

const ErrorTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  color: white;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  max-width: 500px;
  line-height: 1.5;
`;

const ErrorDetails = styled.details`
  margin-bottom: 24px;
  text-align: left;
  max-width: 600px;
  width: 100%;
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const ErrorStack = styled.pre`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background: ${props => props.primary ? '#1DB954' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.primary ? '#1ed760' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>😵</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. This might be a temporary issue.
            Please try refreshing the page or going back to the home page.
          </ErrorMessage>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <ErrorSummary>Error Details (Development Only)</ErrorSummary>
              <ErrorStack>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </ErrorStack>
            </ErrorDetails>
          )}
          
          <ActionButtons>
            <ActionButton primary onClick={this.handleReload}>
              Refresh Page
            </ActionButton>
            <ActionButton onClick={this.handleGoHome}>
              Go to Home
            </ActionButton>
          </ActionButtons>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 