import React from 'react'
import { Navbar } from '../components/Navbar'
import { Calendar } from '../components/Calendar'
import styled from '@emotion/styled'
import { theme } from '../styles/components'

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.pageBg};
  display: flex;
  flex-direction: column;
`

const CalendarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const CalendarPage: React.FC = () => {
  return (
    <Page>
      <Navbar />
      <CalendarWrapper>
        <Calendar />
      </CalendarWrapper>
    </Page>
  )
}
