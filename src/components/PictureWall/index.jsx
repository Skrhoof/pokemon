import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeleteImg } from '../../api'

import { BASE_IMG_URL } from '../../utils/constants'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export default class PicturesWall extends Component {

    constructor(props) {
        super(props)
        let fileList = []
        const { imgs } = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img
            }))
        }
        this.state = {
            previewVisible: false, // 是否显示大图预览
            previewImage: '', // 大图的 url
            previewTitle: '',
            fileList: fileList // 所有需要显示的图片信息对象的数组
        }
    }

    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 0) {
                message.success('上传图片成功！')
                console.log(result);
                const { name, url } = result.data;
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url;
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') {
            const result = await reqDeleteImg(file.name)
            console.log(result);
            if (result.data.status === 0) {
                message.success('删除图片成功！')
            } else {
                message.error('删除图片失败！')
            }
        }
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    accept='image/*'
                    name='image'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
