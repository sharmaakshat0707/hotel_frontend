import React from 'react'
import Content from '../components/Content'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Wrapper from '../components/Wrapper'
import CardComponent from '../components/CardComponent'
import SliderCompo from '../components/SliderCompo'
import CardSlider from '../components/CardSlider'

const HomePage = () => {
  return (
    <div>
      <Home/>
      <CardComponent/>
      <Content/>
      {/* <Promotion/> */}  
      <SliderCompo/>
      <Wrapper/>
      <CardSlider/>
      <Footer/>
    </div>
  )
}

export default HomePage