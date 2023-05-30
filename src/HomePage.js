import React, {useEffect, useState} from 'react';
import {
    Table,
    Typography,
    Row,
    Col,
    message, Tag
} from 'antd';
import {AlertOutlined} from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import * as ReportService from "./services/report/ReportService";

const { Text } = Typography;

const columns = [
    {
        title: 'Username',
        dataIndex: 'user',
        key: 'user',
        render: (item) => (
            <a href={`https://twitter.com/${item.split('@').length === 2 ? item.split('@')[1] : item}`} target="_blank" rel="noreferrer">{item.split('@').length === 2 ? item.split('@')[1] : item}</a>
        ),
        responsive: ['md']
    }
];

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [queLoading, setQueLoading] = useState(false);
    const [twitterReport, setTwitterReport] = useState([]);
    const [youtubeReport, setYoutubeReport] = useState([]);
    const [twitterConfig, setTwitterConfig] = useState({});
    const [youtubeConfig, setYoutubeConfig] = useState({});
    const [users, setUsers] = useState([]);
    const [tweetsReported, setTweetsReported] = useState(0);
    const [videosReported, setVideosReported] = useState(0);

    useEffect(() => {
        getTwitterReport();
        getYoutubeReport();
        getQueueList();
    }, []);

    const getTwitterReport = () => {
        setLoading(true);
        ReportService.getTwitterReport().then((result) => {
                setTweetsReported(result?.data?.twitter_report_count);
                const data = [
                    {
                        type: 'Users Reported',
                        value: result?.data?.twitter_users_count
                    },
                    {
                        type: 'Reports Submitted',
                        value: result?.data?.twitter_submitted_reports_count
                    }
                ];

                const twitterConfig = {
                    appendPadding: 10,
                    data,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.8,
                    legend: {
                        position: 'bottom'
                    },
                    label: {
                        type: 'outer',
                    },
                    interactions: [
                        {
                            type: 'element-active',
                        },
                    ],
                };

                setTwitterReport(data)
                setTwitterConfig(twitterConfig);
                setLoading(false);
            },
            (e) => {
                message.error(e.toString());
                setLoading(false);
            })
    }

    const getYoutubeReport = () => {
        setLoading(true);
        ReportService.getYoutubeReport().then((result) => {
                setLoading(false);
                const data = [
                    {
                        type: 'Users Reported',
                        value: result.data?.youtube_users_count
                    },
                    {
                        type: 'Reports Submitted',
                        value: result.data?.youtube_submitted_reports_count
                    }
                ];
                const youtubeConfig = {
                    appendPadding: 10,
                    data,
                    angleField: 'value',
                    colorField: 'type',
                    radius: 0.8,
                    legend: {
                        position: 'bottom'
                    },
                    label: {
                        type: 'outer',
                    },
                    interactions: [
                        {
                            type: 'element-active',
                        },
                    ],
                };

                setYoutubeReport(data)
                setYoutubeConfig(youtubeConfig);
            },
            (e) => {
                message.error(e.toString());
                setLoading(false);
            })
    }

    const getQueueList = () => {
        setQueLoading(true);
        ReportService.getQueueList().then((result) => {
                setQueLoading(false);
                const allUsers = result.data?.map((str, index) => ({ user: str, id: index + 1 }));
                setUsers(allUsers);
            },
            (e) => {
                message.error(e.toString());
                setQueLoading(false);
            })
    }

    return (
        <>
            <div className="page-container">
                <Row className="element-container">
                    <Col span={24}>
                        <div className="text-center">
                            <div>
                                <AlertOutlined style={{fontSize: '3em'}} />
                            </div>
                            <Text code style={{fontSize: '3em'}}>Welcome!</Text>
                            <p className="mt-3">
                                <Text type="secondary">A mass reporting application to assist in combatting insidious targeted harassment campaigns.</Text>
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={12}>
                        <div className="element-container ml-0 mr-3 mt-5 mb-5">
                            <label className="ml-2" style={{color: '#1677ff', fontSize: 18}}>Recent Twitter Activity:</label>
                            <div className="ml-2" style={{fontSize: 12}}>
                                <Tag color="#1d9bf0">
                                    Tweets Reported:
                                    <span className="ml-1" style={{fontWeight: 'bold'}}>{tweetsReported}</span>
                                </Tag>
                            </div>
                            <hr />
                            {
                                twitterReport && twitterReport?.length > 0 && (
                                    <Pie {...twitterConfig} loading={loading} />
                                )
                            }
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <div className="element-container mr-3 mt-5 mb-5">
                            <label className="ml-2" style={{color: '#1677ff', fontSize: 18}}>Recent Youtube Activity:</label>
                            <div className="ml-2" style={{fontSize: 12}}>
                                <Tag color="rgb(255, 0, 0)">
                                    Videos Reported:
                                    <span className="ml-1" style={{fontWeight: 'bold'}}>{videosReported}</span>
                                </Tag>
                            </div>
                            <hr />
                            {
                                youtubeReport?.length > 0 && (
                                    <Pie {...youtubeConfig} loading={loading} />
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="element-container">
                    <Col span={24}>
                        <label className="ml-2" style={{color: '#1677ff', fontSize: 18}}>Recent Users Reported:</label>
                        <div className="text-center">
                            <Table
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                                dataSource={users ?? []}
                                columns={columns}
                                loading={queLoading}
                                rowKey={record => record.id}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default HomePage;