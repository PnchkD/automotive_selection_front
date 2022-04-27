import React, {Component} from 'react'
import {beforeUpload, getBase64} from './pictureLoaderUtil'
import {Upload} from 'antd'

const {Dragger} = Upload

export default class ImageLoader extends Component {


    state = {
        imageUrl: this.props.imageUrl,
        loading: false
    }

    render() {
    
        return (
            <>
                <aside className="aside-picture">
                    <Dragger
                        name="file"
                        listType="picture"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleUploadImageChange}>

                        {
                            this.state.imageUrl ?
                                <img src={this.state.imageUrl}
                                     alt=""
                                />
                                : <img src="https://th.bing.com/th/id/R.d2c893f55930c7cb5bfe41538be295d7?rik=RCCbETsRGcm2iQ&pid=ImgRaw&r=0" alt=''/>
                        }

                        <p className="ant-upload-text">
                            Нажмите для выбора картинки
                        </p>
                    </Dragger>
                </aside>
            </>
        )
    }


    handleUploadImageChange = info => {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>

                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }, () => {
                    this.props.handleImageUrlChange(this.state.imageUrl);
                })
            )
    }
}