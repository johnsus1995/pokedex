import Header from '@/components/pokemon/header'
import { BreadcrumbNew } from '@/components/utils/breadCrump'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='md:space-y-8'>
      <Header />

      <BreadcrumbNew />
      {children}
    </div>
  )
}

export default Layout