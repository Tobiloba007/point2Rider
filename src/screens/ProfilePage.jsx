import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Profile from '../components/profilePage/Profile'
import User from '../../assets/icon/user.svg'
import Card from '../../assets/icon/card.svg'
import Warning from '../../assets/icon/warning.svg'
import EditDetails from '../components/profilePage/EditDetails'
import ManageBankAccount from '../components/profilePage/ManageBankAccount'
import PrivacyPolicy from '../components/profilePage/PrivacyPolicy'
import Support from '../components/profilePage/Support'


export default function ProfilePage({setDeleteBank}) {
  const [pages, setPages] = useState(0);

  const buttons = [
    {
      id: 1,
      icon: <User />,
      name: 'Edit Details',
      link: 'login'
    },
    {
      id: 2,
      icon: <Card />,
      name: 'Manage Cards',
    },
    {
      id: 0,
      icon: <Warning />,
      name: 'Privacy & Policy',
    },
    {
      id: 4,
      icon: <Warning />,
      name: 'Help & Support',
    },
  ]

  return (
    <SafeAreaView className='flex-1 items-center justify-start pt-8'>
        {pages === 0
         ? <Profile buttons={buttons} setPages={setPages} />
         : pages === 1 
         ? <EditDetails setPages={setPages} />
         : pages === 2
         ? <ManageBankAccount setPages={setPages} setDeleteBank={setDeleteBank} />
         : pages === 3
         ? <PrivacyPolicy setPages={setPages} />
         : pages === 4
         && <Support setPages={setPages} />
        }
    </SafeAreaView>
  )
}