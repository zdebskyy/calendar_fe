import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  AuthPage, AuthCard, AuthLogoMark, AuthTitle, AuthSubtitle,
  AuthForm, AuthFieldGroup, AuthLabel, AuthInput,
  AuthSubmitBtn, AuthDivider, AuthToggleText, AuthToggleLink,
  AuthErrorMsg, AuthSuccessMsg,
} from '../styles'
import { Mode } from '../types'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [shaking, setShaking] = useState(false)

  const triggerShake = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 400)
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      triggerShake()
      return
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Please enter your full name.')
      triggerShake()
      return
    }

    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/profile', { replace: true })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName.trim() } },
        })
        if (error) throw error
        setSuccess('Account created! Check your email to confirm, then sign in.')
        setMode('login')
        setPassword('')
        setFullName('')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      triggerShake()
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    setError('')
    setSuccess('')
  }

  return (
    <AuthPage>
      <AuthCard shaking={shaking}>
        <AuthLogoMark>📅</AuthLogoMark>
        <AuthTitle>{mode === 'login' ? 'Welcome back' : 'Create account'}</AuthTitle>
        <AuthSubtitle>
          {mode === 'login' ? 'Sign in to your CalendarApp' : 'Start organizing your time'}
        </AuthSubtitle>

        <AuthForm>
          {mode === 'signup' && (
            <AuthFieldGroup>
              <AuthLabel>Full name</AuthLabel>
              <AuthInput
                type="text"
                placeholder="Jane Appleseed"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </AuthFieldGroup>
          )}

          <AuthFieldGroup>
            <AuthLabel>Email</AuthLabel>
            <AuthInput
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={mode === 'login'}
            />
          </AuthFieldGroup>

          <AuthFieldGroup>
            <AuthLabel>Password</AuthLabel>
            <AuthInput
              type="password"
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </AuthFieldGroup>

          {error && <AuthErrorMsg>{error}</AuthErrorMsg>}
          {success && <AuthSuccessMsg>{success}</AuthSuccessMsg>}

          <AuthSubmitBtn loading={loading} disabled={loading} onClick={handleSubmit}>
            {loading
              ? mode === 'login' ? 'Signing in…' : 'Creating account…'
              : mode === 'login' ? 'Sign in' : 'Create account'}
          </AuthSubmitBtn>
        </AuthForm>

        <AuthDivider>or</AuthDivider>

        <AuthToggleText>
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <AuthToggleLink onClick={() => switchMode('signup')}>Sign up</AuthToggleLink>
            </>
          ) : (
            <>Already have an account?{' '}
              <AuthToggleLink onClick={() => switchMode('login')}>Sign in</AuthToggleLink>
            </>
          )}
        </AuthToggleText>
      </AuthCard>
    </AuthPage>
  )
}
