import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Nav,
  NavLogo,
  NavLinks,
  NavLink,
  NavSpacer,
  UserZone,
  AvatarButton,
  NavAvatar,
  NavUserName,
  ChevronIcon,
  Dropdown,
  DropdownHeader,
  DropdownEmail,
  DropdownName,
  DropdownItem,
} from '../styles'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'User'

  const avatarUrl = user?.user_metadata?.avatar_url || null

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
    navigate('/login')
  }

  return (
    <Nav>
      <NavLogo onClick={() => navigate('/calendar')}>
        <span>📅</span>
        CalendarApp
      </NavLogo>

      <NavLinks>
        <NavLink
          active={location.pathname === '/calendar'}
          onClick={() => navigate('/calendar')}
        >
          Calendar
        </NavLink>
        <NavLink
          active={location.pathname === '/profile'}
          onClick={() => navigate('/profile')}
        >
          Profile
        </NavLink>
      </NavLinks>

      <NavSpacer />

      <UserZone ref={dropdownRef}>
        <AvatarButton onClick={() => setOpen((o) => !o)}>
          <NavAvatar src={avatarUrl}>{!avatarUrl && initials}</NavAvatar>
          <NavUserName>{displayName}</NavUserName>
          <ChevronIcon open={open}>▼</ChevronIcon>
        </AvatarButton>

        {open && (
          <Dropdown>
            <DropdownHeader>
              <DropdownName>{displayName}</DropdownName>
              <DropdownEmail>{user?.email}</DropdownEmail>
            </DropdownHeader>
            <DropdownItem
              onClick={() => {
                setOpen(false)
                navigate('/profile')
              }}
            >
              👤 Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setOpen(false)
                navigate('/calendar')
              }}
            >
              📅 Calendar
            </DropdownItem>
            <DropdownItem danger onClick={handleSignOut}>
              ⎋ Sign out
            </DropdownItem>
          </Dropdown>
        )}
      </UserZone>
    </Nav>
  )
}
