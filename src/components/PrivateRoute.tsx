import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { SpinnerWrapper, Spinner } from '../styles'

export const PrivateRoute: React.FC = () => {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />
}
