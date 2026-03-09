import styled from '@emotion/styled'
import { fadeUp, theme } from './theme'

// ─── Layout ───────────────────────────────────────────────────────────────────

export const ProfilePageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.pageBg};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

export const ProfileContent = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeUp} 0.35s ease;
`

export const ProfileSection = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(9,30,66,0.08), 0 0 0 1px rgba(9,30,66,0.04);
  overflow: hidden;
`

export const ProfileSectionHeader = styled.div`
  padding: 20px 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ProfileSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.text};
  letter-spacing: -0.2px;
`

export const ProfileSectionBody = styled.div`
  padding: 16px 24px 24px;
`

// ─── Profile card ─────────────────────────────────────────────────────────────

export const ProfileTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
`

export const AvatarWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`

export const AvatarImg = styled.div<{ src?: string | null }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src}) center/cover` : theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  border: 3px solid ${theme.border};
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.85; }
`

export const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;
  cursor: pointer;
  pointer-events: none;
  font-size: 18px;

  ${AvatarWrap}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
`

export const ProfileFieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const ProfileFieldLabel = styled.label`
  font-size: 11px;
  font-weight: 500;
  color: ${theme.textDim};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const ProfileFieldInput = styled.input`
  font-size: 15px;
  color: ${theme.text};
  font-family: inherit;
  font-weight: 500;
  border: 1.5px solid transparent;
  border-radius: 8px;
  padding: 6px 10px;
  background: transparent;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  width: 100%;

  &:hover {
    border-color: ${theme.border};
    background: ${theme.pageBg};
  }

  &:focus {
    border-color: ${theme.accent};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0,121,191,0.1);
  }
`

export const ProfileFieldStatic = styled.div`
  font-size: 15px;
  color: ${theme.textMuted};
  padding: 6px 10px;
  font-family: inherit;
`

export const ProfileSaveBtn = styled.button<{ saved?: boolean }>`
  align-self: flex-start;
  height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  background: ${({ saved }) => saved ? 'rgba(97,189,79,0.12)' : theme.accent};
  color: ${({ saved }) => saved ? '#3a8c2f' : '#fff'};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  margin-top: 4px;

  &:hover {
    background: ${({ saved }) => saved ? 'rgba(97,189,79,0.15)' : '#006ba3'};
    transform: translateY(-1px);
  }

  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`

// ─── Upcoming tasks ───────────────────────────────────────────────────────────

export const UpcomingTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const UpcomingDateDivider = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${theme.textDim};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 0 4px;

  &:first-of-type { padding-top: 0; }
`

export const UpcomingTaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background 0.1s;

  &:hover { background: ${theme.pageBg}; }
`

export const UpcomingTaskDot = styled.div<{ color?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color || theme.accent};
  flex-shrink: 0;
`

export const UpcomingTaskText = styled.span`
  font-size: 14px;
  color: ${theme.text};
  flex: 1;
`

export const ProfileEmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
`

export const ProfileEmptyIcon = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
`

export const ProfileEmptyText = styled.p`
  font-size: 14px;
  color: ${theme.textMuted};
  margin-bottom: 16px;
`

export const GoCalendarBtn = styled.button`
  height: 38px;
  padding: 0 20px;
  background: ${theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;

  &:hover { background: #006ba3; transform: translateY(-1px); }
`

// ─── Tech stack ───────────────────────────────────────────────────────────────

export const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
`

export const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px;
  border-radius: 10px;
  background: ${theme.pageBg};
  border: 1px solid ${theme.border};
  transition: box-shadow 0.15s;

  &:hover { box-shadow: 0 2px 8px rgba(9,30,66,0.1); }
`

export const TechLogoSlot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TechLogo = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`

export const TechName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.textMuted};
  text-align: center;
`

// ─── Spinner ──────────────────────────────────────────────────────────────────

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${theme.pageBg};
`

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${theme.border};
  border-top-color: ${theme.accent};
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
