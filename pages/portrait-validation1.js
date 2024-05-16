import * as echarts from "echarts";

import React from 'react'

import { Tag, Progress, Avatar, Divider, Timeline ,Button} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

import ValidationLayout from '@/components/ValidationLayout';
import GrayCard, { RowItem, Item } from '@/components/GrayCard';

export default function PortraitValidation() {
  //调用全部信息
  const [allinfo, setallinfo] = useState([]);
  
  async function fetchallinfo() {
    try {
      const response = await fetch(`/api/procedural/getProceduralInfo?student_id=1418405888606265345`);
      const data = await response.json();
      console.log(data.info);
      setallinfo(data.info);
    } catch (error) {
      console.error('获取数据时出错：', error);
    }
  }
  useEffect(() => {
    fetchallinfo();
  }, [allinfo]);
  const videoData=[];//allinfo[2].length
  if(allinfo[2]!=null){
  for (let i = 0; i < allinfo[2].length; i += 3) {
          const videoName = allinfo[2][i+1];//[i+1]
          const duration = allinfo[2][i+2];//[i+2]
          videoData.push({ videoName, duration });
        }
      }
  const stucomment = useRef(null);
  const comments=[];//allinfo[7].length
  if(allinfo[7]!=null){
  for(let i=0;i<allinfo[7].length;i+=3){
    comments.push({name:allinfo[7][i+1]+'\n'+allinfo[7][i+2]});//i+1 i+2
  }
  }
  useEffect(()=>{
    let chartInstance=echarts.init(stucomment.current,null,{ devicePixelRatio: 10 });
    const data = {
      name: '评论内容',
      children: comments,
    };
    const option={
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],
          top: '2%',
          left: '20%',
          bottom: '10%',
          right: '75%',
          symbolSize: 6,
          edgeShape: 'polyline',
          edgeForkPosition: '50%',
          initialTreeDepth: 10,
          lineStyle: {
            width: 3
          },
          label: {
            backgroundColor: 'rgba(0, 0, 0,0)' ,
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize:10,
            fontWeight:'bold',
            fontStyle:'oblique',
          },
          leaves: {
            label: {
              backgroundColor: 'rgba(0, 0, 0,0)',
              position: 'right',
              color:"#8a5ebf",
              verticalAlign: 'middle',
              align: 'left',
              fontWeight:'bold',
              fontStyle:'oblique',
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };
    chartInstance.setOption(option);
  },[allinfo])
  //水杉码源记录
  const user_info = useRef(null);
  const [fansnumber, setfansnumber] = useState([]);
  useEffect(() => {
    let chartInstance = echarts.init(user_info.current, null, { devicePixelRatio: 10 });
    const fetchfansnumber = async () => {
      try {
        // 从后端获取数据，可使用 fetch 或 API 调用
        const response = await fetch(`/api/procedural/getProceduralInfo?student_id=1418405888606265345`);
        const data = await response.json();
        const fans=data.info[6];
        // 假设接收到的数据是一个数组
        setfansnumber(fans);
      } catch (error) {
        console.error('获取数据时出错：', error);
      }
    };

    // 调用函数从后端获取数据
    // fetchfansnumber();
    }, []); // 空依赖数组表示仅在组件挂载时获取数据一次
    useEffect(() => {
      let chartInstance = echarts.init(user_info.current, null, { devicePixelRatio: 10 });
      const option = {
        radar: {
          shape: 'circle',
          indicator: [
          { name: '粉丝数量', max: 14 },
          { name: '关注者数量', max: 14 },
          { name: '被点赞量', max: 14 },
          { name: '拥有仓库数', max: 14 },
          { name: 'issue提交数', max: 14 },
          { name: 'issue回答数', max: 14 },
          { name: 'commit数量', max: 14 },
          { name: '用户分数', max: 14 },
          ],
          radius: '100%',
          axisName: {
          fontSize: 9,
          color:'#8a5ebf'
            }
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: allinfo[8],
                  name: 'Actual Spending',
                  label:{
                    show:true,
                    color:'#8a5ebf',
                    fontSize:7,
                    position:'bottom'
                  },
                }
                  ],
              lineStyle: {
              color: '#bf444c',
              width:2
              },
              itemStyle: {
                color: '#8a5ebf',
                symbolSize: 1
                  }
                }
              ]
      };
    chartInstance.setOption(option);
  }, [allinfo]);

  const [showAll, setShowAll] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const initialItemsToShow = 3;

  let calendarData1 = {};

// 统计每天出现的次数 allinfo[1].length  i+1 i+2
const loginresult = [];
if(allinfo[1]!=null){
  for (let i = 0; i < allinfo[1].length; i += 3) {
    let name = allinfo[1][i+1];
    let date = allinfo[1][i+2];
    let key = name + ',' + date;

    if (calendarData1[key]) {
      calendarData1[key]++;
    } else {
      calendarData1[key] = 1;
    }
  }
  
  for (let key in calendarData1) {
    const temp={color:"#8a5ebf",children:`${key},${calendarData1[key]}次`}
    loginresult.push(temp);
  }
  }
  const calendarData = loginresult;
  const remainingItems = calendarData.length - initialItemsToShow;
  const handleShowMore = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };
  useEffect(() => {
    let timer = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (prevOpacity >= 1) {
          clearInterval(timer);
          return 1;
        }
        return prevOpacity + 0.05;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);
  const ActiveCalendar = () => (
    <GrayCard title="活跃日历图">
      <div style={{ 
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: `rgba(138, 94, 191, ${opacity})`,
        transition: 'color 1s ease-in-out',
       }}>
        登陆次数：{calendarData.length}
      </div>
      <Timeline className='mt-5' items={calendarData.slice(0, showAll ? calendarData.length : initialItemsToShow)} />
      {!showAll && remainingItems > 0 && (
        <Button onClick={handleShowMore}>更多</Button>
      )}
      {showAll && (
        <Button onClick={handleShowLess}>收起</Button>
      )}
    </GrayCard>
  );
  const [showAllVideos, setShowAllVideos] = useState(false);
  const initialVideosToShow = 3;

  const remainingVideos = videoData.length - initialVideosToShow;

  const handleShowMoreVideos = () => {
    setShowAllVideos(true);
  };

  const handleShowLessVideos = () => {
    setShowAllVideos(false);
  };

  const VideoRecords = () => (
    <GrayCard title='视频观看记录'>
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px' }}>
          总记录数：{videoData.length}
        </div>
      {videoData.slice(0, showAllVideos ? videoData.length : initialVideosToShow).map((video, index) => (
        <div key={index} className='mt-2.5 flex justify-between'>
          <Item name='视频名称' br slot={video.videoName} />
          <Item name='观看时长（0.1s）' br slot={video.duration} />
        </div>
      ))}
      {!showAllVideos && remainingVideos > 0 && (
        <Button onClick={handleShowMoreVideos}>更多</Button>
      )}
      {showAllVideos && (
        <Button onClick={handleShowLessVideos}>收起</Button>
      )}
    </GrayCard>
  );
  /*考试记录*/
  const testname=[];
  const testscore=[];//allinfo[4].length  i+1 i+2
  if(allinfo[4]!=null){
  for (let i = 0; i < allinfo[4].length; i += 3) {
          testname.push(allinfo[4][i+1]);
          testscore.push(allinfo[4][i+2]);
        }
      }
  const text_info = useRef(null);
  useEffect(() => {
    let chartInstance = echarts.init(text_info.current, null, { devicePixelRatio: 10 });
    const option = {
      title: [
        {
          text: ''
        }
      ],
      polar: {
        radius: [8, '75%']
      },
      radiusAxis: {
        max: 20
      },
      angleAxis: {
        type: 'category',
        data: testname,
        startAngle: 75,
        axisLabel: {
          fontSize:9,
          color:"purple",
      },
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: testscore,
        color:"purple",
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{c}',
          fontSize:8,
          margin:1,
        }
      },
      animation: false
    };
    chartInstance.setOption(option);
  }, [allinfo])

  const [showAllExams, setShowAllExams] = useState(false);
  const [examData, setExamData] = useState([]);
  const [totalExams, setTotalExams] = useState(0);
  const initialExamsToShow = 3;
  
  const testinfo=[];//allinfo[3].length  i i+1 i+2
  if(allinfo[3]!=null){
  for (let i = 0; i < allinfo[3].length; i += 3) {
    const examData = {
      examName: allinfo[3][i],
      score: allinfo[3][i+1],
      completionDate: allinfo[3][i+2]
    };
    testinfo.push(examData);
  }
}
  useEffect(() => {
    // 模拟异步获取考试记录数据，可以从后端获取数据并设置到 state 中
    const fetchData = async () => {
      // 这里模拟获取数据的过程
      const fetchedData =testinfo;
      // const fetchedData = [
      //   { examName: '测试2-1 信息技术基础', score: '60', completionDate: '2021-09-06' },
      //   { examName: '《计算机文化与数字胜任力》能力评测-2', score: '260', completionDate: '2021-08-26' },
      //   { examName: '测试3-1 信息技术基础', score: '60', completionDate: '2021-09-08' },
      //   { examName: '测试4-1 信息技术基础', score: '60', completionDate: '2021-09-07' },
      //   // ... 其他数据
      // ];
      setExamData(fetchedData);
      setTotalExams(fetchedData.length);
    };

    fetchData();
  }, [allinfo]);

  const remainingExams = examData.length - initialExamsToShow;

  const handleShowMoreExams = () => {
    setShowAllExams(true);
  };

  const handleShowLessExams = () => {
    setShowAllExams(false);
  };
  /*作业提交记录 */
  
  /*帖子发表记录*/
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postData, setPostData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const initialPostsToShow = 1;

  const postinfo=[];//allinfo[5].length  i i+1 i+2 i+3
  if(allinfo[5]!=null){
  for (let i = 0; i < allinfo[5].length; i += 4) {
    const examData = {
      postTitle: allinfo[5][i],
      views: allinfo[5][i+1],
      comments: allinfo[5][i+2],
      postDate: allinfo[5][i+3]
    };
    postinfo.push(examData);
  }
}
  useEffect(() => {
    // 模拟异步获取帖子发表记录数据，可以从后端获取数据并设置到 state 中
    const fetchData = async () => {
      // 这里模拟获取数据的过程
      const fetchedData = postinfo;
      setPostData(fetchedData);
      setTotalPosts(fetchedData.length);
    };

    fetchData();
  }, [allinfo]);

  const remainingPosts = postData.length - initialPostsToShow;

  const handleShowMorePosts = () => {
    setShowAllPosts(true);
  };

  const handleShowLessPosts = () => {
    setShowAllPosts(false);
  };
  /*评论 */
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const initialCommentsToShow = 2;

  const maxCommentTextLengthToShow = 10;

  const commentinfo=[];//allinfo[6].length  i i+1 i+2 i+3
  if(allinfo[6]!=null){
  for (let i = 0; i < allinfo[6].length; i += 4) {
    const examData = {
      commentText: allinfo[6][i],
      postTitle: allinfo[6][i+1],
      likes: allinfo[6][i+2],
      commentDate: allinfo[6][i+3]
    };
    commentinfo.push(examData);
  }
}

  useEffect(() => {
    // 模拟异步获取评论发表记录数据，可以从后端获取数据并设置到 state 中
    const fetchData = async () => {
      // 模拟获取数据的过程
      const fetchedData = commentinfo;
      setCommentData(fetchedData);
      setTotalComments(fetchedData.length);
    };

    fetchData();
  }, [allinfo]);

  const remainingComments = commentData.length - initialCommentsToShow;

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const handleShowLessComments = () => {
    setShowAllComments(false);
  };

  const handleToggleCommentContent = (index) => {
    const updatedExpandedComments = new Set(expandedComments);
    if (updatedExpandedComments.has(index)) {
      updatedExpandedComments.delete(index);
    } else {
      updatedExpandedComments.add(index);
    }
    setExpandedComments(updatedExpandedComments);
  };

  // const renderCommentText = (text, index) => {
  //   const isExpanded = expandedComments.has(index);
  //   if (text.length <= maxCommentTextLengthToShow) {
  //     return text;
  //   } else {
  //     const visibleText = isExpanded ? text : text.slice(0, maxCommentTextLengthToShow);
  //     const hiddenText = isExpanded ? '' : text.slice(maxCommentTextLengthToShow);
  //     return (
  //       <span>
  //         {visibleText}
  //         {hiddenText && (
  //           <Button
  //             style={{ textDecoration: 'underline', color: '#888', fontSize: '12px' }}
  //             onClick={() => handleToggleCommentContent(index)}
  //           >
  //             {isExpanded ? '隐藏' : '展开'}
  //           </Button>
  //         )}
  //       </span>
  //     );
  //   }
  // };

  /*点赞内容 */
  const [showAllLikes, setShowAllLikes] = useState(false);
  const [likeData, setLikeData] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const initialLikesToShow = 1;

  useEffect(() => {
    // 模拟异步获取点赞记录数据，可以从后端获取数据并设置到 state 中
    const fetchData = async () => {
      // 这里模拟获取数据的过程
      const fetchedData = [
        {
          likeContent: '为什么if语句后要用==而不是用=呢？',
          likeDate: '2023-11-26',
        },
        {
          likeContent: '如何学习python和易语言编程',
          likeDate: '2023-11-26',
        },
        // ... 其他数据
      ];
      setLikeData(fetchedData);
      setTotalLikes(fetchedData.length);
    };

    fetchData();
  }, []);
  const remainingLikes = likeData.length - initialLikesToShow;

  const handleShowMoreLikes = () => {
    setShowAllLikes(true);
  };

  const handleShowLessLikes = () => {
    setShowAllLikes(false);
  };
  return (
    <>
      <GrayCard first>
        <div className='flex justify-between'>
          <div className='flex'>
            <Avatar src="https://avatar.therainisme.com/halozxc.png" size={45} />
            <span className='flex flex-col ml-2.5'>
              <Tag bordered={false} color="purple">
                水杉学生
              </Tag>
              <span className='mt-0.5 font-medium'>&nbsp;{allinfo[0]==null? 0:allinfo[0][1]}</span>
            </span>
          </div>
          <Item name='学号' br slot={allinfo[0]==null? 0:allinfo[0][2]} className='mt-0.5' />
        </div>
        <Divider className='mt-2.5 mb-2.5' />
        <span className='font-semibold'>课程信息</span>
        <div className='mt-2.5 flex justify-between'>
          <Item name='教师' br slot='蒲鹏' />
          <Item name='课程' br slot='新生计算机第一课' />
          <Item name='标签' br slot='暂无' />
        </div>
        <div className='mt-2.5'>
          <RowItem name='区块高度' slot={allinfo[0]==null? 0:allinfo[0][4]} />
          <RowItem name='交易哈希' slot={
            <>
              {allinfo[0]==null?'11':hiddenTransactionHash(allinfo[0][3])}
              <CopyOutlined className='ml-1 text-gray-400' />
            </>
          } />
        </div>
      </GrayCard>
      <ActiveCalendar />
      <VideoRecords />
      <GrayCard title='作业提交记录'>
        <canvas className='w-full relative z-1' ref={text_info}></canvas>
      </GrayCard>
      <GrayCard title='考试记录'>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px' }}>
          总记录数：{totalExams}
        </div>
        {examData.slice(0, showAllExams ? examData.length : initialExamsToShow).map((exam, index) => (
          <div key={index} className='mt-2.5 flex justify-between'>
            <Item name='考试名称' br slot={exam.examName} style={{ width: '500px' }} />
            <Item name='考试成绩' br slot={exam.score} style={{ width: '250px' }}/>
            <Item name='完成时间' br slot={exam.completionDate} style={{ width: '250px' }}/>
          </div>
        ))}
        {!showAllExams && remainingExams > 0 && (
          <Button onClick={handleShowMoreExams}>更多</Button>
        )}
        {showAllExams && (
          <Button onClick={handleShowLessExams}>收起</Button>
        )}
      </GrayCard>
      <GrayCard title='帖子发表记录'>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px' }}>
          总记录数：{totalPosts}
        </div>
        {postData.slice(0, showAllPosts ? postData.length : initialPostsToShow).map((post, index) => (
          <div key={index} className='mt-2.5 flex justify-between'>
            <Item name='帖子名称' br slot={post.postTitle}style={{ width: '200px' }} />
            <Item name='浏览量' br slot={post.views}style={{ width: '200px' }} />
            <Item name='评论数' br slot={post.comments}style={{ width: '200px' }} />
            <Item name='发表时间' br slot={post.postDate} style={{ width: '200px' }}/>
          </div>
        ))}
        {!showAllPosts && remainingPosts > 0 && (
          <Button onClick={handleShowMorePosts}>更多</Button>
        )}
        {showAllPosts && (
          <Button onClick={handleShowLessPosts}>收起</Button>
        )}
      </GrayCard>
      <GrayCard title='评论内容'>
        <canvas className='w-full relative z-1' ref={stucomment}></canvas>
      </GrayCard>
      <GrayCard title='评论发表记录'>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px' }}>
          总记录数：{totalComments}
        </div>
        {commentData.slice(0, showAllComments ? commentData.length : initialCommentsToShow).map((comment, index) => (
          <div key={index} className='mt-2.5 flex justify-between'>
            <Item name='评论内容' br slot={comment.commentText} style={{width:'550px'}} />{/*renderCommentText(*/}
            <Item name='所属帖子' br slot={comment.postTitle} style={{width:'250px'}}/>
            <Item name='评论点赞数' br slot={comment.likes}style={{width:'200px'}} />
            <Item name='发表时间' br slot={comment.commentDate} style={{width:'200px'}}/>
          </div>
        ))}
        {!showAllComments && remainingComments > 0 && (
          <Button onClick={handleShowMoreComments}>更多</Button>
        )}
        {showAllComments && (
          <Button onClick={handleShowLessComments}>收起</Button>
        )}
      </GrayCard>
      <GrayCard title='水杉码园协作记录'>
        <canvas className='w-full relative z-1' ref={user_info}></canvas>
      </GrayCard>
    </>
  )
  
}

PortraitValidation.getLayout = (page) => {
  return (
    <ValidationLayout>
      {page}
    </ValidationLayout>
  )
}

function hiddenTransactionHash(hash) {
  // 保留前十位和后十位
  return hash.substring(0, 14) + '...' + hash.substring(hash.length - 12, hash.length)
}