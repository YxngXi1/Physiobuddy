import React from 'react'
import DropDown from '@/components/dropdownMenu_mc'

const Page = () => {
  return (
    <div className="p-12">
        <DropDown options={[
            'Knee Replacement Surgery',
            'Others'
        ]}/>
    </div>
  )
}

export default Page;