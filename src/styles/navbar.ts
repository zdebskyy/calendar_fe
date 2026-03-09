import styled from '@emotion/styled'
import { fadeDown, theme } from './theme'

export const Nav = styled.nav`
  height: 52px;
  background: #fff;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 200;
  gap: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
`

export const NavLogo = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.accent};
  letter-spacing: -0.3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;

  span { font-size: 18px; }
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 8px;
`

export const NavLink = styled.button<{ active?: boolean }>`
  background: ${({ active }) => active ? 'rgba(0,121,191,0.08)' : 'none'};
  border: none;
  color: ${({ active }) => active ? theme.accent : theme.textMuted};
  font-size: 13px;
  font-weight: ${({ active }) => active ? '600' : '400'};
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(0,121,191,0.08);
    color: ${theme.accent};
  }
`

export const NavSpacer = styled.div`
  flex: 1;
`

export const UserZone = styled.div`
  position: relative;
`

export const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover { background: ${theme.pageBg}; }
`

export const NavAvatar = styled.div<{ src?: string | null }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src}) center/cover` : theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  border: 2px solid ${theme.border};
`

export const NavUserName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.text};
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ChevronIcon = styled.span<{ open: boolean }>`
  font-size: 10px;
  color: ${theme.textDim};
  transition: transform 0.2s;
  transform: ${({ open }) => open ? 'rotate(180deg)' : 'rotate(0)'};
`

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid ${theme.border};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(9,30,66,0.12), 0 2px 6px rgba(9,30,66,0.08);
  min-width: 180px;
  padding: 6px;
  animation: ${fadeDown} 0.15s ease;
  z-index: 300;
`

export const DropdownHeader = styled.div`
  padding: 8px 10px 10px;
  border-bottom: 1px solid ${theme.border};
  margin-bottom: 4px;
`

export const DropdownEmail = styled.div`
  font-size: 11px;
  color: ${theme.textDim};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const DropdownName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 2px;
`

export const DropdownItem = styled.button<{ danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  color: ${({ danger }) => danger ? theme.danger : theme.text};
  transition: background 0.1s;
  text-align: left;

  &:hover {
    background: ${({ danger }) => danger ? 'rgba(235,90,70,0.08)' : theme.pageBg};
  }
`
