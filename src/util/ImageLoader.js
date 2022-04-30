import React, {Component} from 'react'
import {beforeUpload, getBase64} from './pictureLoaderUtil'
import {Upload} from 'antd'
import { USER_BASE_AVATAR, IMAGE_LOADER_MOCKY_URL } from '../constants/constants';
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
                    <Dragger className='aside-dragger'
                        style={{ boxShadow:'0px 8px 16px 0px rgba(0,0,0,0.2)'}} 
                        name="file"
                        listType="picture"
                        showUploadList={false}
                        action={IMAGE_LOADER_MOCKY_URL}
                        beforeUpload={beforeUpload}
                        onChange={this.handleUploadImageChange}>
                        {
                            this.state.imageUrl ?
                                <img src={this.state.imageUrl}
                                     alt="avatar"
                                />
                                : <img src={USER_BASE_AVATAR} alt='avatar'/>
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