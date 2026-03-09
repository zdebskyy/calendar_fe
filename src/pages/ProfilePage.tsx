import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { taskService } from '../services/api'
import { Task } from '../types'
import { formatDate, formatDisplayDate } from '../helpers/dateHelpers'
import { Navbar } from '../components/Navbar'
import {
  ProfilePageWrapper,
  ProfileContent,
  ProfileSection,
  ProfileSectionHeader,
  ProfileSectionTitle,
  ProfileSectionBody,
  ProfileTop,
  AvatarWrap,
  AvatarImg,
  AvatarOverlay,
  HiddenFileInput,
  ProfileInfo,
  ProfileFieldRow,
  ProfileFieldLabel,
  ProfileFieldInput,
  ProfileFieldStatic,
  ProfileSaveBtn,
  UpcomingTaskList,
  UpcomingDateDivider,
  UpcomingTaskItem,
  UpcomingTaskDot,
  UpcomingTaskText,
  ProfileEmptyState,
  ProfileEmptyIcon,
  ProfileEmptyText,
  GoCalendarBtn,
  TechGrid,
  TechItem,
  TechLogoSlot,
  TechLogo,
  TechName,
} from '../styles'
import { TECH_STACK } from '../constants'


export const ProfilePage: React.FC = () => {
  const { user, session } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
  )
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.user_metadata?.avatar_url || null,
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [tasksLoading, setTasksLoading] = useState(true)

  useEffect(() => {
    if (!session) return
    const loadUpcoming = async () => {
      try {
        const today = formatDate(new Date())
        const now = new Date()
        const months = Array.from({ length: 3 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        })
        const results = await Promise.all(
          months.map((m) => taskService.getByMonth(m)),
        )
        const all = results.flat()
        const upcoming = all
          .filter((t) => t.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)
          .slice(0, 12)
        setUpcomingTasks(upcoming)
      } catch (e) {
        console.error(e)
      } finally {
        setTasksLoading(false)
      }
    }
    loadUpcoming()
  }, [session])

  const handleSave = async () => {
    if (!displayName.trim()) return
    setSaving(true)
    try {
      await supabase.auth.updateUser({
        data: { full_name: displayName.trim(), avatar_url: avatarUrl },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploadingAvatar(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${user.id}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      console.log(data)

      const url = data.publicUrl + `?t=${Date.now()}`
      setAvatarUrl(url)
      await supabase.auth.updateUser({ data: { avatar_url: url } })
    } catch (err) {
      console.error('Avatar upload failed:', err)
    } finally {
      setUploadingAvatar(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const initials = displayName
    .split(' ')
    .map((n: string[]) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const tasksByDate = upcomingTasks.reduce<Record<string, Task[]>>((acc, t) => {
    ;(acc[t.date] = acc[t.date] || []).push(t)
    return acc
  }, {})
  const sortedDates = Object.keys(tasksByDate).sort()

  return (
    <ProfilePageWrapper>
      <Navbar />
      <ProfileContent>
        <ProfileSection>
          <ProfileTop>
            <AvatarWrap>
              <AvatarImg
                src={avatarUrl}
                onClick={() => fileInputRef.current?.click()}
                title="Change avatar"
              >
                {!avatarUrl && initials}
              </AvatarImg>
              <AvatarOverlay onClick={() => fileInputRef.current?.click()}>
                {uploadingAvatar ? '⏳' : '📷'}
              </AvatarOverlay>
              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </AvatarWrap>

            <ProfileInfo>
              <ProfileFieldRow>
                <ProfileFieldLabel>Full name</ProfileFieldLabel>
                <ProfileFieldInput
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
              </ProfileFieldRow>

              <ProfileFieldRow>
                <ProfileFieldLabel>Email</ProfileFieldLabel>
                <ProfileFieldStatic>{user?.email}</ProfileFieldStatic>
              </ProfileFieldRow>

              <ProfileSaveBtn
                saved={saved}
                disabled={saving || !displayName.trim()}
                onClick={handleSave}
              >
                {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
              </ProfileSaveBtn>
            </ProfileInfo>
          </ProfileTop>
        </ProfileSection>

        {/* ── Upcoming tasks ── */}
        <ProfileSection>
          <ProfileSectionHeader>
            <ProfileSectionTitle>Upcoming tasks</ProfileSectionTitle>
          </ProfileSectionHeader>
          <ProfileSectionBody>
            {tasksLoading ? (
              <ProfileEmptyState>
                <ProfileEmptyText>Loading tasks…</ProfileEmptyText>
              </ProfileEmptyState>
            ) : sortedDates.length === 0 ? (
              <ProfileEmptyState>
                <ProfileEmptyIcon>🗓️</ProfileEmptyIcon>
                <ProfileEmptyText>
                  No upcoming tasks. Start planning your time!
                </ProfileEmptyText>
                <GoCalendarBtn onClick={() => navigate('/calendar')}>
                  Open Calendar
                </GoCalendarBtn>
              </ProfileEmptyState>
            ) : (
              <UpcomingTaskList>
                {sortedDates.map((date) => (
                  <React.Fragment key={date}>
                    <UpcomingDateDivider>
                      {formatDisplayDate(date)}
                    </UpcomingDateDivider>
                    {tasksByDate[date].map((task) => (
                      <UpcomingTaskItem key={task._id}>
                        <UpcomingTaskDot
                          color={task.labels?.[0] || task.color}
                        />
                        <UpcomingTaskText>{task.title}</UpcomingTaskText>
                      </UpcomingTaskItem>
                    ))}
                  </React.Fragment>
                ))}
              </UpcomingTaskList>
            )}
          </ProfileSectionBody>
        </ProfileSection>

        {/* ── Tech stack ── */}
        <ProfileSection>
          <ProfileSectionHeader>
            <ProfileSectionTitle>Built with</ProfileSectionTitle>
          </ProfileSectionHeader>
          <ProfileSectionBody>
            <TechGrid>
              {TECH_STACK.map((tech) => (
                <TechItem key={tech.name}>
                  <TechLogoSlot>
                    {tech.logo ? (
                      <TechLogo src={tech.logo} alt={tech.name} />
                    ) : null}
                  </TechLogoSlot>
                  <TechName>{tech.name}</TechName>
                </TechItem>
              ))}
            </TechGrid>
          </ProfileSectionBody>
        </ProfileSection>
      </ProfileContent>
    </ProfilePageWrapper>
  )
}
