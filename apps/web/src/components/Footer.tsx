/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import * as GlobalConstants from '../constants/Global'

const Footer: React.FC = () => {
    return (

    <footer className="footer">
        <strong>[免責について]</strong>
        <p>
            本サイトを利用する事により被った、いかなる被害や損害についても当サイトの管理者は一切の責任を負いません。
        </p>
        <span>{`© ${(new Date).getFullYear()} ${GlobalConstants.SERVICE_NAME}`}</span>
    </footer>
    )
}

export default Footer
