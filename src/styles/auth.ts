import styled from '@emotion/styled'
import { fadeUp, shake, theme } from './theme'

export const AuthPage = styled.div`
  min-height: 100vh;
  background: ${theme.pageBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
`

export const AuthCard = styled.div<{ shaking: boolean }>`
  background: #fff;
  border-radius: 20px;
  box-shadow:
    0 2px 8px rgba(9,30,66,0.06),
    0 16px 40px rgba(9,30,66,0.10);
  padding: 44px 40px 40px;
  width: 100%;
  max-width: 380px;
  animation-name: ${({ shaking }) => shaking ? shake : fadeUp};
  animation-duration: 0.4s;
  animation-timing-function: ${({ shaking }) => shaking ? 'ease' : 'cubic-bezier(0.16,1,0.3,1)'};
  animation-fill-mode: both;
`

export const AuthLogoMark = styled.div`
  width: 52px;
  height: 52px;
  background: ${theme.accent};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 24px;
  box-shadow: 0 4px 12px rgba(0,121,191,0.3);
`

export const AuthTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.text};
  text-align: center;
  letter-spacing: -0.4px;
  margin-bottom: 6px;
`

export const AuthSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.textMuted};
  text-align: center;
  margin-bottom: 28px;
  line-height: 1.5;
`

export const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const AuthFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const AuthLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.textMuted};
  letter-spacing: 0.02em;
`

export const AuthInput = styled.input<{ hasError?: boolean }>`
  height: 46px;
  border: 1.5px solid ${({ hasError }) => hasError ? theme.danger : theme.border};
  border-radius: 10px;
  background: ${({ hasError }) => hasError ? 'rgba(235,90,70,0.04)' : '#fafbfc'};
  padding: 0 14px;
  font-size: 15px;
  color: ${theme.text};
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  width: 100%;

  &::placeholder { color: ${theme.textDim}; }

  &:focus {
    border-color: ${({ hasError }) => hasError ? theme.danger : theme.accent};
    background: #fff;
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError
      ? 'rgba(235,90,70,0.12)'
      : 'rgba(0,121,191,0.12)'};
  }
`

export const AuthSubmitBtn = styled.button<{ loading?: boolean }>`
  height: 48px;
  background: ${theme.accent};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: ${({ loading }) => loading ? 'not-allowed' : 'pointer'};
  opacity: ${({ loading }) => loading ? 0.7 : 1};
  margin-top: 8px;
  transition: background 0.15s, transform 0.1s, opacity 0.15s;
  letter-spacing: -0.1px;

  &:hover:not(:disabled) {
    background: #006ba3;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) { transform: translateY(0); }
`

export const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0;
  color: ${theme.textDim};
  font-size: 12px;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.border};
  }
`

export const AuthToggleText = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${theme.textMuted};
  margin-top: 4px;
`

export const AuthToggleLink = styled.span`
  color: ${theme.accent};
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.1s;

  &:hover { opacity: 0.75; text-decoration: underline; }
`

export const AuthErrorMsg = styled.div`
  background: rgba(235,90,70,0.08);
  border: 1px solid rgba(235,90,70,0.2);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: ${theme.danger};
  line-height: 1.4;
`

export const AuthSuccessMsg = styled.div`
  background: rgba(97,189,79,0.08);
  border: 1px solid rgba(97,189,79,0.25);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: #3a8c2f;
  line-height: 1.4;
  text-align: center;
`
