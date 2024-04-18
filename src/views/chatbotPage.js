import React from 'react';
import { useState } from 'react';
import { FloatButton, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    return <>
        <FloatButton
          icon={<QuestionCircleOutlined />}
          type="primary"
          style={{ right: 24 }}
          onClick={e => setShowChatbot(!showChatbot)}
        />
        <Modal open={showChatbot} footer={[]} onOk={() => setShowChatbot(!showChatbot)} onCancel={() => setShowChatbot(!showChatbot)} >
        <div dangerouslySetInnerHTML={{__html: '<iframe	style="width: 400px; height: 600px;" src="https://app.fastbots.ai/embed/clv4lqguk00jkohb9nqjmr5zm"></iframe>'}}></div>
            
        </Modal>
    </>;
}

export default ChatBot;