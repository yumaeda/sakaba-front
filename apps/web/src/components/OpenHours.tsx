/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    businessDayJson: string
}

const OpenHours: React.FC<Props> = (props) => {
    const currentDay = ((new Date()).getDay() + 1) + ''
    const { businessDayJson } = props
    let openHourText = ''
    if (businessDayJson !== '{}') {
        const businessDayObj = JSON.parse(businessDayJson)
        if (businessDayObj.hasOwnProperty(currentDay)) {
            const endTime = businessDayObj[currentDay]['End']
            if (endTime) {
                openHourText = `${endTime.substring(0, 2)}:${endTime.substring(2, 4)} まで営業`
            }
        }
    }

    return <span className="open-hour">{openHourText}</span>
}

export default OpenHours
