import { Divider, Alert } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import ValidationLayout from '@/components/ValidationLayout';
import GrayCard, { RowItem } from '@/components/GrayCard';

export default function ProceduralDataValidation() {
  return (
    <>
      <Alert
        message="数据已存证"
        description="页面信息摘要哈希值与 StarChain 存证一致。"
        type="success"
        showIcon
      />
      <GrayCard title='页面信息描述'>
        <div className='mt-[5px] flex justify-between'>
          <span className='text-gray-400'>
            “新生计算机第一课”过程性数据，内容包括：视频播放次数每日变化、视频播放总时长每日变化、
            习题测验次数每日变化、习题测验人数每日变化、学生登录地域分布、省份平均分、成绩分布等统计数据。
            页面所有信息通过 SHA256 计算得到信息哈希值。
          </span>
        </div>
        <Divider className='mt-2.5 mb-2.5' />
        <RowItem name="信息哈希值" slot={
          <span className='text-green-600'>
            {hiddenTransactionHash("0xe3917eefe9f9fbc746e0b59e4a9fb110a0548fb97c79a2630f4907fd3c8d3a05")}
            <CopyOutlined className='ml-1 text-gray-400' />
          </span>
        }
        />
        <RowItem name="更新时间" slot="2023年6月8日 20:00:00" />
      </GrayCard>
      <GrayCard title='StarChain 存证信息'>
        <RowItem name="区块高度" slot="114514" />
        <RowItem name="交易哈希" slot={
          <>
            {hiddenTransactionHash("0x67a9d4ad30f72e8e03d1f92b94baca4ead1d4ebb633f895fa7d12f51d954ae89")}
            <CopyOutlined className='ml-1 text-gray-400' />
          </>
        }
        />
        <Divider className='mt-2.5 mb-2.5' />
        <RowItem name="信息哈希值" slot={
          <span className='text-green-600'>
            {hiddenTransactionHash("0xe3917eefe9f9fbc746e0b59e4a9fb110a0548fb97c79a2630f4907fd3c8d3a05")}
            <CopyOutlined className='ml-1 text-gray-400' />
          </span>
        } />
        <RowItem name="上链时间" slot="2023年6月6日 20:00:00" />
      </GrayCard>
    </>
  )
}

ProceduralDataValidation.getLayout = function getLayout(page) {
  return (
    <ValidationLayout>
      {page}
    </ValidationLayout>
  )
};

function hiddenTransactionHash(hash) {
  // 保留前十位和后十位
  return hash.substring(0, 14) + '...' + hash.substring(hash.length - 12, hash.length)
}