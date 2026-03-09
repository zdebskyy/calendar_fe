import { keyframes } from '@emotion/react'

export const theme = {
  pageBg: '#e2e4e6',
  headerBg: '#ffffff',
  cellBg: '#f4f5f7',
  cellBgHover: '#ebecef',
  cardBg: '#ffffff',
  border: '#d9dce0',
  text: '#172b4d',
  textMuted: '#5e6c84',
  textDim: '#97a0af',
  accent: '#0079bf',
  today: '#0079bf',
  holiday: '#eb5a46',
  danger: '#eb5a46',
  cardShadow: '0 1px 3px rgba(9,30,66,0.13), 0 0 0 1px rgba(9,30,66,0.08)',
  cardShadowHover: '0 4px 8px rgba(9,30,66,0.16), 0 0 0 1px rgba(9,30,66,0.10)',
  labelColors: ['#61bd4f','#f2d600','#ff9f1a','#eb5a46','#c377e0','#0079bf','#00c2e0','#51e898','#ff78cb','#344563'],
}

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
`

export const spin = keyframes`
  to { transform: rotate(360deg); }
`
