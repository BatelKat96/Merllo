import { useLocation } from 'react-router-dom'

import { HomePageHeader } from './home-page-header'
import { MainHeader } from './main-header'


export function AppHeader() {

    const location = useLocation()

    function DynamicCmp({ urlParams }) {

        if (urlParams.includes('workspace')) return <MainHeader />
        if (urlParams.includes('board')) return <MainHeader />
        if (urlParams.includes('task')) return <MainHeader />

        if (urlParams.includes('/')) return <HomePageHeader />
    }

    return (
        <DynamicCmp urlParams={location.pathname} />
    )
}