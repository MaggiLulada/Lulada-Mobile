import React, {useState} from 'react'
import Onboarding from '../../onboarding/Onboarding'
import MyPhoneNumber from './screens/MyPhoneNumber'
import MyCode from './screens/MyCode'
import MyName from './screens/MyName'
import MyAddress from './screens/MyAddress'
import MyBirthday from './screens/MyBirthday'
import MyPicture from './screens/MyPicture'

const RegisterOnboarding = () => {

    const [state, setState] = useState({
        active: 0,
        phoneNumber: '',
        code: '',
        name: '',
        lastName: '',
        address: '',
        birthday: '',
        picture: '',
        userId: '',
        liveLocation: false,
        confirmation: null
    });

    const pages = [
        <MyPhoneNumber state={state} setState={setState}/>,
        <MyCode state={state} setState={setState}/>,
        <MyName state={state} setState={setState}/>,
        <MyAddress state={state} setState={setState}/>,
        <MyBirthday state={state} setState={setState}/>,
        <MyPicture state={state} setState={setState}/>,
    ]

    return (
        <Onboarding
            length={pages.length}
            active={state.active}
            pages={pages}
            typeOnboarding='register'
        />
    )
}

export default RegisterOnboarding