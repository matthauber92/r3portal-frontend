import React, {useState} from "react";
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Upload,
    message,
    Typography,
    Tooltip,
    Drawer,
    Tabs,
    Image,
    Alert,
    Switch
} from "antd";
import {FieldArray, Formik} from 'formik';
import * as Yup from 'yup';
import {
    TwitterCircleFilled,
    UploadOutlined,
    InfoCircleOutlined,
    MinusCircleOutlined,
    FileExcelOutlined
} from '@ant-design/icons';
import * as XLSX from "xlsx";
import * as ReportService from "./services/report/ReportService";
import ExcelScreenshot from './common/assests/excel_screenshot.png';

const { Text } = Typography;

const TwitterReportPage = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeKey, setActiveKey] = useState('1');
    const [file, setFile] = useState([]);
    const [isUpload, setIsUpload] = useState(false);

    const tabItems = [
        {
            key: '1',
            label: (
                <>
                    <div>
                        <FileExcelOutlined fill="#30d425" style={{fontSize: '1em', color:'#30d425'}} />
                        <span>Batch Upload Format</span>
                    </div>
                </>
            ),
            content: (
                <>
                    <div>
                        <Alert message="All reported spreadsheets are required to be in .xlsx, .xls, .cvs format following the column format and header naming below. Click on preview to enhance image." type="info" showIcon banner />
                    </div>
                    <hr />
                    <Row className="mt-3">
                        <Col span={24}>
                            <Image
                                width="50%"
                                src={ExcelScreenshot}
                            />
                        </Col>
                    </Row>
                </>
            ),
        }
    ];

    const handleSubmit = (data) => {
        setLoading(true);
        let users;
        if(isUpload) {
            users = file.map(x => x.usernames);
        } else {
            users = data.users;
        }

        if(users.length === 0) {
            message.error("No data to submit for report");
            return;
        }

        const report = {
            usernames: users
        }

        ReportService.createTwitterReport(report).then((result) => {
                setLoading(false);
                message.success(result.data[0]);
            },
            (e) => {
                message.error(e.toString());
                setLoading(false);
            })
    }

    const props = {
        onChange({ file }) {
            if (file.status !== 'uploading') {
                readExcel(file.originFileObj)
            }
            if(file.state === 'removed')
                setFile([]);
        }
    };

    const readExcel = (file) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            setFile(XLSX.utils.sheet_to_json(sheet));
        }

        reader.readAsArrayBuffer(file);
    }

    const request = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("File successfully read.");
        }, 0);
    }

    const handleTabs = (key) => {
        setActiveKey(key)
    };

    const handleSwitch = (checked) => {
        setIsUpload(checked);
    }

    return (
        <div className="page-container">
            <div className="element-container">
                <Row>
                    <Col span={24}>
                        <div className="float-left">
                            <TwitterCircleFilled onClick={() => window.open('https://twitter.com', '_blank')} style={{fontSize: '5em', color: '#1d9bf0'}} />
                        </div>
                    </Col>
                </Row>
                <Formik
                    enableReinitialize
                    initialValues={{
                        users: []
                    }}
                    validationSchema={Yup.object().shape({
                        users: Yup.array()
                            .of(
                                Yup.string()
                                    .trim()
                                    .matches(/^@?(\w){1,15}$/, 'Must be user twitter handle')
                                    .typeError("User is Required")
                                    .required("User is Required")
                            )
                            .typeError("User is Required")
                            .required("User is Required"),
                    })}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <Form
                            className="ReportForm"
                            name="ReportForm"
                            autoComplete="off"
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        >
                            <div className="sf-form-container mx-auto">
                                <div className="text-center">
                                    <div>
                                        <div><b>Toggle for batch upload</b></div>
                                        <Switch disabled={file.length > 0} checked={isUpload} onChange={handleSwitch} />
                                    </div>
                                    <div>
                                        <Text code style={{fontSize: '3em'}}>{isUpload ? 'Upload Document' : 'Report Users'}</Text>
                                    </div>
                                    {
                                        isUpload && (
                                            <div>
                                                <div className="subtext d-inline-flex" onClick={() => setIsOpen(true)} type="button" tabIndex={0}>
                                                    <Tooltip title="Upload Document Info.">
                                                        <span>Need help?</span>
                                                        <InfoCircleOutlined className="mt-1 ml-1" style={{fontSize: '1em'}} />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <Col span={24}>
                                    <Col className="ml-5 mr-5">
                                        <br />
                                        <Row gutter={[16, 16]} justify="center">
                                            <Col span={16}>
                                                {
                                                    !isUpload && (
                                                        <FieldArray
                                                            name="users"
                                                            render={(arrayHelpers) => (
                                                                <Row>
                                                                    {values.users?.length > 0 ? (
                                                                        values.users?.map((user, index) => (
                                                                            <Col span={24}>
                                                                                <div key={index}>
                                                                                    <Form.Item
                                                                                        touched={`users[${index}]`}
                                                                                        validateStatus={
                                                                                            errors.users &&
                                                                                            errors.users[index] &&
                                                                                            touched.users &&
                                                                                            touched.users[index]
                                                                                                ? "error"
                                                                                                : ""
                                                                                        }
                                                                                    >
                                                                                        <Input
                                                                                            size="small"
                                                                                            key={`users-input-${index + 1}`}
                                                                                            id={`users[${index}]`}
                                                                                            name={`users[${index}]`}
                                                                                            placeholder="Ex. @mickMous3 (Twitter handle)"
                                                                                            value={user}
                                                                                            suffix={
                                                                                                <Tooltip title="Remove">
                                                                                                    <Button
                                                                                                        key={`users-delete-btn-${index + 1}`}
                                                                                                        type="button"
                                                                                                        className="input-delete"
                                                                                                        onClick={() =>
                                                                                                            arrayHelpers.remove(index)
                                                                                                        }
                                                                                                    >
                                                                                                        <MinusCircleOutlined style={{color: 'red'}} />
                                                                                                    </Button>
                                                                                                </Tooltip>
                                                                                            }
                                                                                        />
                                                                                    </Form.Item>
                                                                                    <>
                                                                                        {
                                                                                            index + 1 === values.users.length && (
                                                                                                <div>
                                                                                                    <Button
                                                                                                        bloc
                                                                                                        type="primary"
                                                                                                        onClick={() =>
                                                                                                            arrayHelpers.push('')
                                                                                                        }
                                                                                                    >
                                                                                                        Add User
                                                                                                    </Button>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </>
                                                                                </div>
                                                                            </Col>
                                                                        ))
                                                                    ) : (
                                                                        <Button
                                                                            block
                                                                            type="primary"
                                                                            onClick={() =>
                                                                                arrayHelpers.push('')
                                                                            }
                                                                        >
                                                                            Add User
                                                                        </Button>
                                                                    )}
                                                                </Row>
                                                            )}
                                                        />
                                                    )
                                                }
                                                {
                                                    isUpload && (
                                                        <div className="text-center">
                                                            <Upload {...props} accept=".xlsx,.xls" maxCount={1} multiple={false} customRequest={request}>
                                                                <Button block icon={<UploadOutlined />}>Upload</Button>
                                                            </Upload>
                                                        </div>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={16} className="mt-3">
                                                <Button block onClick={() => handleSubmit(values)} disabled={values.users.length === 0} loading={loading}>Report</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <Drawer
                title="Upload Document Information"
                placement="right"
                onClose={() => setIsOpen(false)}
                open={isOpen}
                style={{background: '#f5f5f5'}}
                width="30%"
            >
                <div className="page-container" style={{marginTop: 5}}>
                    <Tabs
                        defaultActiveKey={activeKey}
                        onChange={handleTabs}
                        items={tabItems.map(item => {
                            return {
                                label: (
                                    <>
                                        {item.label}
                                    </>
                                ),
                                key: item.key,
                                children: item.content,
                            };
                        })}
                    />
                </div>
            </Drawer>
        </div>
    )
};

export default TwitterReportPage;