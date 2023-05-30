import React from "react";
import { Typography, Tooltip } from "antd";
import {CoffeeOutlined, YoutubeFilled} from '@ant-design/icons';

const { Text } = Typography;

const YouTubeReportPage = () => {
    return (
        <div className="page-container">
            <div className="element-container">
                <YoutubeFilled style={{fontSize: '5em', color: '#f00'}} onClick={() => window.open('https://youtube.com', '_blank')} />
                <main>
                    <div className="text-center">
                        <div>
                            <Tooltip title="Careful! I'm HOT!">
                                <CoffeeOutlined fill="#4096ff" style={{fontSize: '3em', color: 'black'}} />
                            </Tooltip>
                        </div>
                        <Text code style={{fontSize: '3em'}}>Taking a coffee break!</Text>
                    </div>
                </main>
            </div>
        </div>
    )
};

export default YouTubeReportPage;