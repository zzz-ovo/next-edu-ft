import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Alert, Tooltip, Skeleton } from 'antd';
import { format } from 'echarts';

export default function CertificateValidation() {
  const router = useRouter()

  // const [verifyRes, setVerifyRes] = useState("info");
  // const [verifyMsg, setVerifyMsg] = useState("向 StarChain 验证中......");
  const verifyRes="success";
  const verifyMsg="链上信点校验成功!";
  // const [formatData, setFormatData] = useState({});
  // const formatData
  const formatData=[["1","0","名称","新生计算机能力第一课","110210710423","赵一璇","10210710423","合格","2023"]];
  // useEffect(() => {
  //   console.log(router.isReady)
  //   if (router.isReady) {
  //     const { student_id: studentId, resource_id: resourceId } = router.query
  //     console.log(studentId, resourceId)

  //     if (!studentId || !resourceId) {
  //       console.log("None");
  //       return;
  //     }

  //     (async () => {
  //       try {
  //         const resp = await fetch(`api/certificate/getCertificateInfo?student_id=${studentId}&resource_id=${resourceId}`);
  //         const data = await resp.json();
  //         setFormatData(convertData(data.info));
  //         setVerifyMsg("链上信点校验成功!");
  //         setVerifyRes("success");
  //       } catch (error) {
  //         console.log(error);
  //         setVerifyMsg("链上信点校验失败！如对结果存疑请联系管理员");
  //         setVerifyRes("error");
  //       }
  //     })();
  //   }
  // }, [router.isReady])

  return (
    <div style={{ maxWidth: "650px", position: "relative", transform: "translateX(-50%)", left: "50%", height: "103%" }}>
      <div style={{ display: "flex", alignItems: "center", margin: 10 }}>
        <img src="/certificate-validation/dase.png" width={60} height={60} style={{ marginRight: 10 }} /> <h1>链上信息</h1>
      </div>
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Alert
          message={verifyMsg}//
          type={verifyRes}
          showIcon
        />
      </div>
      <div style={{ paddingLeft: 20, paddingRight: 20, position: "relative" }}>
        <img src="/certificate-validation/ecnu-back.png" style={{
          width: 200,
          height: 200,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: verifyRes !== "error" ? "grayscale(100%)" : "",
          opacity: verifyRes !== "error" ? 0.1 : 1,
        }}
        />
        {
          verifyRes === "success" ?
            <>
              {/* {formatData[0].map((x) => {
                return <h4 key={x[1]}>{x[0]} <span style={{ marginLeft: 6, fontWeight: 400 }}>{x[1]}</span></h4>
              })} */}
              {
                <h4 key={"名称"}>{["名称"]}<span style={{ marginLeft: 6, fontWeight: 400 }}>{"新生计算机第一课能力测评"}</span></h4>
              }
              {
                <h4 key={"名称"}>{["学号"]}<span style={{ marginLeft: 6, fontWeight: 400 }}>{"10210710423"}</span></h4>
              }{
                <h4 key={"名称"}>{["姓名"]}<span style={{ marginLeft: 6, fontWeight: 400 }}>{"赵一璇"}</span></h4>
              }
              {
                <h4 key={"名称"}>{["成绩"]}<span style={{ marginLeft: 6, fontWeight: 400 }}>{"合格"}</span></h4>
              }
            </> :
            verifyRes === "error" ?
              <>
                <div style={{ height: 250 }}></div>
              </> :
              <>
                <Skeleton active />
                <Skeleton active />
              </>
        }
      </div>
      {
        verifyRes === "success" ?
          <>
            <div className="verify-alert" style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Alert message={
                <>
                  <Tooltip
                    overlayInnerStyle={{ maxWidth: "80vw" }}
                    placement="bottom"
                    title={"区块哈希就是对区块头进行哈希计算，相当于给区块设定了一个身份证号。"}>
                    <p style={{ margin: 0 }}>
                      <b>区块哈希</b> <br />
                      0xb921a61471490e5e2ce5711279c4d97fa8e35d84c6e2e6158da6b9f600f5c0e
                    </p>
                  </Tooltip>
                  <Tooltip
                    overlayInnerStyle={{ maxWidth: "80vw" }}
                    placement="bottom"
                    title={"交易哈希通俗来讲就是个人的转账凭证。"}>
                    <p>
                      <b>交易哈希</b> <br />
                      0x848f7317c824c710f8d9d8d95320aecfc1dfce65d85de2ed119d6aafd6addcb
                    </p>
                  </Tooltip>
                  <Tooltip
                    overlayInnerStyle={{ maxWidth: "80vw" }}
                    placement="bottom"
                    title={"证书地址是证书数据所存的智能合约中的地址。"}>
                    <p>
                      <b>证书地址</b> <br />
                      000000000000000000000000d01e2174897b5155d120b59c61dadd0aed4f734a
                    </p>
                  </Tooltip>
                  <Tooltip
                    overlayInnerStyle={{ maxWidth: "80vw" }}
                    placement="bottom"
                    title={"该证书的发行方"}>
                    <p style={{ margin: 0 }}>
                      <b>发行方</b> （水杉学堂）<br />
                      0xa97282085ddd4061d09481d548d1653f112c504c
                    </p>
                  </Tooltip>
                </>
              } type="info" />
            </div>
            <div style={{ position: "relative" }}>
              <img src="/certificate-validation/blockchain.svg" style={{ width: "100%", marginBottom: 100 }} />
              <span style={{ position: "absolute", color: "rgb(147,143,143)", bottom: 80, fontSize: "10px", left: "11%", transform: "translateX(-50%)" }}>#29973</span>
              <span style={{ position: "absolute", color: "rgb(147,143,143)", bottom: 80, fontSize: "10px", left: "30.5%", transform: "translateX(-50%)" }}>#29974</span>
              <span style={{ position: "absolute", color: "rgb(147,143,143)", bottom: 80, fontSize: "10px", left: "50%", transform: "translateX(-50%)" }}>#29975</span>
              <span style={{ position: "absolute", color: "rgb(147,143,143)", bottom: 80, fontSize: "10px", left: "69.5%", transform: "translateX(-50%)" }}>#29976</span>
              <span style={{ position: "absolute", color: "rgb(147,143,143)", bottom: 80, fontSize: "10px", left: "89%", transform: "translateX(-50%)" }}>#29977</span>
            </div>
          </>
          :
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Alert message={
              <>
                <b>区块哈希</b> <br /> 区块哈希就是对区块头进行哈希计算，相当于给区块设定了一个身份证号。
                <br /><br />
                <b>交易哈希</b> <br /> 交易哈希通俗来讲就是个人的转账凭证。
                <br /><br />
                <b>证书地址</b> <br /> 证书地址是证书数据所存的智能合约中的地址。
                <br /><br />
                <b>区块高度</b> <br /> 相当于区块链上的经纬度，它给了区块一个“坐标”，通过区块高度，可以准确地描述出某一区块在链上的位置
              </>
            } type={verifyRes} />
          </div>
      }
      <div style={{ paddingBottom: "1em" }}><p style={{ color: "rgb(147,143,143)", textAlign: "center" }}>© StarChain 2023</p></div>
    </div>
  )
}

function convertData(list) {
  switch (~~list[0]) {
    case 1:
      return [
        [
          ["名称", "新生计算机第一课能力测评证书"],
          ["学号", list[3]],//
          ["姓名", list[2]],
          // ["分数", list[4]],
          ["成绩", list[5]],
        ],
        [
          ["区块哈希", list[6]],
          ["交易哈希", list[7]],
          ["证书地址", list[8]],
        ],
        [
          ["区块高度", ~~list[9]],
        ]
      ]

    case 2:
      return [
        [
          ["名称", "计算机能力测评证书"],
          ["考试类型", list[4]],
          ["学号", list[3]],
          ["姓名", list[2]],
          // ["分数", list[5]],
          ["成绩", list[6]],
        ],
        [
          ["区块哈希", list[7]],
          ["交易哈希", list[8]],
          ["证书地址", list[9]],
        ],
        [
          ["区块高度", ~~list[10]],
        ]
      ]


    default:
      break;
  }
}