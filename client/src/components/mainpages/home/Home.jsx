import React from 'react'
import Announcement from '../../headers/Announcement'
import Newsletter from './Newsletter'
import Slider from './Slider'

const Home = () => {
    return (
        <div>
            <Announcement />
            <Slider />
            <Newsletter />
        </div>
    )
}

export default Home