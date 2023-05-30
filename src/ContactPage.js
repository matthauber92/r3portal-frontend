import React from 'react';
import {Typography} from 'antd';
import {MailOutlined} from '@ant-design/icons';

const { Text } = Typography;
const ContactPage = () => {
    return (
        <>
            <div className="page-container">
                <div className="element-container">
                    <main>
                        <div className="text-center">
                            <div>
                                <MailOutlined style={{fontSize: '3em'}} />
                            </div>
                            <Text code style={{fontSize: '3em'}}>Contact Us!</Text>
                            <p className="mt-3">
                                <Text type="secondary">Have some questions? Contact us <a href="mailto:r3portal23@gmail.com">here</a>!</Text>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
};

export default ContactPage;