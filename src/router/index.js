import Vue from "vue";
import Router from "vue-router";
import Home from '@/home'
import Index from "@/components/index"; //首页
import login from "@/components/public/login/login"; //登录
import register from "@/components/public/login/register"; //注册
import forgetpass from "@/components/public/login/forgetPass"; //忘记密码
import lytAccount from "@/components/public/lytAccount"; //鲁医通账户
import tradingBill from "@/components/public/tradingBill"; //交易记录
import monthBillDetail from "@/components/public/monthBillDetail"; //月交易记录
import recharge from "@/components/public/recharge"; //充值
import rechargeResult from "@/components/public/rechargebox/rechargeResult"; //充值结果
import insetBank from "@/components/public/rechargebox/insetBank"; //充值到银行卡
import withdrawal from "@/components/public/withdrawal"; //提现
import withdrawalResult from "@/components/public/withdrawal/withdrawalResult"; //提现结果
import checkprice from "@/components/public/withdrawal/checkprice"; //提现验证
import outToBank from "@/components/public/withdrawal/outToBank"; //取出到银行卡
import bankcardadmin from "@/components/public/bankcardAdmin"; //银行卡管理
// import mechanismMsg from "@/components/public/mechanismMsg"; //机构信息
import mechanismNext from "@/components/public/mechanismMsg/mechanismNext"; //机构信息下一步
import checkmemsg from "@/components/public/mechanismMsg/checkbank"; //机构信息审核
import mesuccess from "@/components/public/mechanismMsg/mesuccess"; //机构信息成功

import BoxMechanismMsg from "@/components/public/boxMechanismMsg";  // 机构认证信息填写

// import YaomechanismMsg from "@/components/Yao/Yao-mechanismMsg"; //药店机构信息
import YaomechanismNext from "@/components/Yao/mechanismMsg/Yao-mechanismNext"; //药店机构信息下一步
import Yaocheckmemsg from "@/components/Yao/mechanismMsg/Yao-checkbank"; //药店机构信息审核
import Yaomesuccess from "@/components/Yao/mechanismMsg/Yao-mesuccess"; //药店机构信息成功

// import safePayment from "@/components/public/safePayment"; //安全支付 对公绑卡
import bindbankLegal from "@/components/public/safePayment/bindbankLegal"; //法人绑卡
import bindbankPerson from "@/components/public/safePayment/bindbankPerson"; //个人其他绑卡
import Success from '@/components/public/safePayment/success'           // 绑卡成功 或者 失败的提示页
import checkbank from "@/components/public/safePayment/checkbank"; //审核账户
import otherform from "@/components/public/safePayment/otherform"; //再次提交 个人账户的
import changePass from "@/components/public/changePass"; //修改密码
import changePhone from "@/components/public/changePhone"; //修改手机号
import changePhonechild from "@/components/public/changePhone/changePhonechild"; //填写新手机号

// Yi文件
import bookingOrder from "@/components/Yi/Yi-bookingOrder"; //预约订单
import bookingOrderdetail from "@/components/Yi/bookingOrder/bookingOrderdetail"; //预约订单详情
import inquiryOrder from '@/components/Yi/Yi-inquiryOrder';   // 问诊列表
import doctorScheduling from "@/components/Yi/Yi-doctorScheduling"; //医生排班
import doctorSchedulingdetail from "@/components/Yi/doctorScheduling/doctorSchedulingdetail"; //医生排班专家
import doctorSchedulingdetail1 from "@/components/Yi/doctorScheduling/doctorSchedulingdetail1"; //医生排班普通
import doctorParabiose from "@/components/Yi/Yi-doctorParabiose"; //医连体
import addDoctorParabiose from "@/components/Yi/doctorParabiose/addDoctorParabiose"; //添加医连体
import doctorParabiosemsg from "@/components/Yi/doctorParabiose/doctorParabiosemsg"; //医院关联进度
import record from "@/components/Yi/doctorParabiose/record"; //合作记录
import recorddetail from "@/components/Yi/doctorParabiose/recorddetail"; //合作记录详情
import drugParabiose from "@/components/Yi/Yi-drugParabiose"; //药连体
import addDrugParabiose from "@/components/Yi/drugParabiose/addDrugParabiose"; //添加药连体
import drugParabiosemsg from "@/components/Yi/drugParabiose/drugParabiosemsg"; //药店关联进度
import drugrecord from "@/components/Yi/drugParabiose/record"; //药店合作记录
import drugrecorddetail from "@/components/Yi/drugParabiose/recorddetail"; //药店合作记录详情
import equipmenApply from "@/components/Yi/Yi-equipmenApply"; //设备申请
import equipmendetail from "@/components/Yi/equipmenApply/equipmendetail"; //设备详情
import serverSetting from '@/components/Yi/Yi-serverSetting';          // 服务设置
import equipmenjl from "@/components/Yi/equipmenApply/equipmenjl"; //记录
import doctorList from "@/components/Yi/Yi-doctorList"; //医生列表
import doctorListAdd from "@/components/Yi/doctorList/doctorListAdd"; //医生列表
import doctordetail from "@/components/Yi/doctorList/doctordetail"; //查看医生信息
import doctorEdit from "@/components/Yi/doctorList/doctorEdit"; //编辑医生信息
import departmentList from "@/components/Yi/Yi-departmentList"; //科室列表
import departmentDetail from "@/components/Yi/departmentList/departmentDetail"; //查看科室
import departmentEdit from "@/components/Yi/departmentList/departmentEdit"; //编辑科室
import departmentAdd from "@/components/Yi/departmentList/departmentAdd"; //编辑科室
import Member from '@/components/Yi/Yi-vipmember';   // 会员首页
import Inform from '@/components/Yi/Yi-inform';   // 通知首页
import Purchase from '@/components/Yi/Yi-purchase';   // 采购首页


// 药店端
import shopMsg from "@/components/public/shopMsg"; //店铺信息
import goodsList from "@/components/Yao/Yao-goodsList"; //商品列表 
import addGoods from "@/components/Yao/list/Yao-addGoods"; //新增商品
import editGoods from "@/components/Yao/list/Yao-editGoods"; //编辑商品
import List from "@/components/Yao/Yao-List"; //列表
import listDetail from "@/components/Yao/List/Yao-ListDetail"; //列表
import sendGoodsList from "@/components/Yao/Yao-sendGoodsList"; //发货列表
import sendGoodsLog from "@/components/Yao/Yao-sendGoodsLog"; //发货日志
import refundList from "@/components/Yao/Yao-refundList"; //退款列表
import evaluationAdmin from "@/components/Yao/Yao-evaluationAdmin"; //评价管理
import mallAdmin from "@/components/Yao/jgmall/Yao-mall"; //商城管理
import Openmall from "@/components/Yao/jgmall/Open_the_mall"; //开通商城
import YaodrugParabiose from "@/components/Yao/Yao-drugParabiose"; //药连体
import YaoaddDrugParabiose from "@/components/Yao/drugParabiose/addDrugParabiose"; //添加药连体
import YaodrugParabiosemsg from "@/components/Yao/drugParabiose/drugParabiosemsg"; //药店关联进度
import Yaodrugrecord from "@/components/Yao/drugParabiose/record"; //药店合作记录
import Yaodrugrecorddetail from "@/components/Yao/drugParabiose/recorddetail"; //药店合作记录详情
import YaoequipmenApply from "@/components/Yao/Yao-equipmenApply"; //设备申请
import Yaoequipmendetail from "@/components/Yao/equipmenApply/equipmendetail"; //设备详情
import Yaoequipmenjl from "@/components/Yao/equipmenApply/equipmenjl"; //记录




import statisticsHome from '@/components/Yao/Yao-statistics';                 // 统计首页
import Vipmember from '@/components/Yao/Yao-member';                    //  药店会员首页
import Marketing from '@/components/Yao/Yao-marketing';                 // 供销页
import InfromMsg from '@/components/Yao/Yao-informMsg';                 //  通知页
import Error404 from '@/components/404/404'

import YaoRouter from './Yao-index' // 处方单列表路由
// console.log(YaoRouter)
Vue.use(Router);

  

  let allroutes = [
    {
      path: "",
      // name: '首页',
      component: Index
    },
    {
      path: "/finance/lytAccount",
      name: "鲁医通账户",
      component: lytAccount
    },
    {
      path: "/finance/tradingBill",
      name: "交易账单",
      component: tradingBill
    },
    {
      path: "/finance/monthBillDetail",
      name: "月账单明细",
      component: monthBillDetail
    },
    {
      path: "/finance/recharge",
      name: "充值",
      component: recharge
    },
    {
      path: "/finance/recharge/rechargeResult",
      name: "充值结果",
      component: rechargeResult
    },
    {
      path: "/finance/recharge/insetBank",
      name: "充值到银行卡",
      component: insetBank
    },
    {
      path: "/finance/withdrawal",
      name: "提现",
      component: withdrawal
    },
    {
      path: "/finance/withdrawal/withdrawalResult",
      name: "提现结果",
      component: withdrawalResult
    },
    {
      path: "/finance/withdrawal/checkprice",
      name: "提现审核",
      component: checkprice
    },
    {
      path: "/finance/withdrawal/outToBank",
      name: "提现到银行卡",
      component: outToBank
    },
    {
      path: "/finance/bankcardadmin",
      name: "银行卡管理",
      component: bankcardadmin
    },
    // {
    //   path: "/finance/bankcardadmin/safePayment",
    //   name: "对公账户",
    //   component: safePayment
    // },
    {
      path: "/finance/bankcardadmin/bindbankLegal",
      name: "法人账户",
      component: bindbankLegal
    },
    {
      path: "/finance/bankcardadmin/bindbankPerson",
      name: "其他账户",
      component: bindbankPerson
    },
    {
      path: '/finance/bankcardadmin/success',
      name: '绑卡提示',
      component: Success
    },
    {
      path: "/finance/bankcardadmin/checkbank",
      name: "审核账户",
      component: checkbank
    },
    {
      path: "/finance/bankcardadmin/otherform",
      name: "再次提交",
      component: otherform
    },
    

    {
      path: "/setting/boxMechanismMsg/mechanismNext",
      name: "机构信息第二步",
      component: mechanismNext
    },
    {
      path: "/setting/boxMechanismMsg/checkmemsg",
      name: "机构信息审核",
      component: checkmemsg
    },
    {
      path: "/setting/boxMechanismMsg/mesuccess",
      name: "机构信息成功",
      component: mesuccess
    },
    {
      path: '/vip/vipmember',
      name: '开通会员',
      component: Member
    },
    {
      path: '/supply/purchase',
      name: '采购',
      component: Purchase
    },
    {
      path: '/message/inform',
      name: '消息通知',
      component: Inform
    },

    {
      path: "/setting/boxMechanismMsg",   // 机构认证 医院和药店共享页面
      name: "机构认证信息添加",
      component: BoxMechanismMsg
    },

    // 药店机构信息
    
    {
      path: "/setting/boxMechanismMsg/YaomechanismNext",
      name: "药店机构信息第二步",
      component: YaomechanismNext
    },
    {
      path: "/setting/boxMechanismMsg/Yaocheckmemsg",
      name: "药店机构信息审核",
      component: Yaocheckmemsg
    },
    {
      path: "/setting/boxMechanismMsg/Yaomesuccess",
      name: "药店机构信息成功",
      component: Yaomesuccess
    },
    {
      path: "/setting/shopMsg",
      name: "店铺信息",
      component: shopMsg
    },
    {
      path: "/setting/changePass",
      name: "修改密码",
      component: changePass
    },
    {
      path: "/setting/changePhone",
      name: "修改手机号",
      component: changePhone
    },
    {
      path: "/setting/changePhone/changePhonechild",
      name: "新手机号",
      component: changePhonechild
    },
    {
      path: "/server/bookingOrder",
      name: "预约订单",
      component: bookingOrder
    },
    {
      path: "/server/bookingOrder/bookingOrderdetail",
      name: "预约订单详情",
      component: bookingOrderdetail
    },
    {
      path: "/server/inquiryOrder",
      name: "问诊订单",
      component: inquiryOrder
    },
    {
      path: "/server/doctorScheduling",
      name: "医生排班",
      component: doctorScheduling
    },
    {
      path: "/server/doctorScheduling/doctorSchedulingdetail",
      name: "医生排班专家",
      component: doctorSchedulingdetail
    },
    {
      path: "/server/doctorScheduling/doctorSchedulingdetail1",
      name: "医生排班普通",
      component: doctorSchedulingdetail1
    },
    {
      path: "/server/doctorParabiose",
      name: "医联体",
      component: doctorParabiose
    },
    {
      path: "/server/doctorParabiose/addDoctorParabiose",
      name: "增加医联体",
      component: addDoctorParabiose
    },
    {
      path: "/server/doctorParabiose/doctorParabiosemsg",
      name: "医院关联进度",
      component: doctorParabiosemsg
    },
    {
      path: "/server/doctorParabiose/record",
      name: "合作记录",
      component: record
    },
    {
      path: "/server/doctorParabiose/recorddetail",
      name: "合作记录详情",
      component: recorddetail
    },
    {
      path: "/server/drugParabiose",
      name: "药联体",
      component: drugParabiose
    },
    {
      path: "/server/drugParabiose/addDrugParabiose",
      name: "增加药联体",
      component: addDrugParabiose
    },
    {
      path: "/server/drugParabiose/drugParabiosemsg",
      name: "药店关联进度",
      component: drugParabiosemsg
    },
    {
      path: "/server/drugParabiose/drugrecord",
      name: "药店合作记录",
      component: drugrecord
    },
    {
      path: "/server/drugParabiose/drugrecorddetail",
      name: "药店合作记录详情",
      component: drugrecorddetail
    },
    {
      path: "/server/equipmenApply",
      name: "设备申请",
      component: equipmenApply
    },
    {
      path: "/server/equipmenApply/equipmendetail",
      name: "设备详情",
      component: equipmendetail
    },
    {
      path: "/server/serverSetting",
      name: "服务设置",
      component:serverSetting
    },
    {
      path: "/server/equipmenApply/equipmenjl",
      name: "申请记录",
      component: equipmenjl
    },
    {
      path: "/server/YaodrugParabiose",
      name: "药店端药联体",
      component: YaodrugParabiose
    },
    {
      path: "/server/YaodrugParabiose/YaoaddDrugParabiose",
      name: "药店端增加药联体",
      component: YaoaddDrugParabiose
    },
    {
      path: "/server/YaodrugParabiose/YaodrugParabiosemsg",
      name: "药店端药店关联进度",
      component: YaodrugParabiosemsg
    },
    {
      path: "/server/YaodrugParabiose/Yaodrugrecord",
      name: "药店端药店合作记录",
      component: Yaodrugrecord
    },
    {
      path: "/server/YaodrugParabiose/Yaodrugrecorddetail",
      name: "药店端药店合作记录详情",
      component: Yaodrugrecorddetail
    },
    {
      path: "/server/YaoequipmenApply",
      name: "药店端设备申请",
      component: YaoequipmenApply
    },
    {
      path: "/server/YaoequipmenApply/Yaoequipmendetail",
      name: "药店端设备详情",
      component: Yaoequipmendetail
    },
    {
      path: "/server/YaoequipmenApply/Yaoequipmenjl",
      name: "药店端申请记录",
      component: Yaoequipmenjl
    },

    
    

    {
      path: "/data/doctorList",
      name: "医生列表",
      component: doctorList
    },
    {
      path: "/data/doctorList/doctorListAdd",
      name: "添加医生",
      component: doctorListAdd
    },
    {
      path: "/data/doctorList/doctordetail",
      name: "查看医生信息",
      component: doctordetail
    },
    {
      path: "/data/doctorList/doctorEdit",
      name: "编辑医生信息",
      component: doctorEdit
    },
    {
      path: "/data/departmentList",
      name: "科室列表",
      component: departmentList
    },
    {
      path: "/data/departmentList/departmentDetail",
      name: "查看科室",
      component: departmentDetail
    },
    {
      path: "/data/departmentList/departmentEdit",
      name: "编辑科室",
      component: departmentEdit
    },
    {
      path: "/data/departmentList/departmentAdd",
      name: "增加科室",
      component: departmentAdd
    },
    {
      path: "/jgmall/goodsList",
      name: "商品列表",
      component: goodsList
    },
    {
      path: "/jgmall/goodsList/addGoods",
      name: "新增商品",
      component: addGoods
    },
    {
      path: "/jgmall/goodsList/editGoods",
      name: "编辑商品",
      component: editGoods
    },
    {
      path: "/jgmall/List",
      name: "订单列表",
      component: List
    },
    {
      path: "/jgmall/List/listDetail",
      name: "订单列表详情",
      component: listDetail
    },
    {
      path: "/jgmall/sendGoodsList",
      name: "发货列表",
      component: sendGoodsList
    },
    {
      path: "/jgmall/sendGoodsLog",
      name: "发货日志",
      component: sendGoodsLog
    },
    {
      path: "/jgmall/refundList",
      name: "退款列表",
      component: refundList
    },
    {
      path: "/jgmall/evaluationAdmin",
      name: "评价管理",
      component: evaluationAdmin
    },
    {
      path: "/jgmall/mallAdmin",
      name: "商城管理",
      component: mallAdmin
    },
    {
      path: '/jgmall/openmall',
      name: '开通商城',
      component: Openmall
    },
    {
      path: '/statistics/home',
      name: '统计',
      component: statisticsHome
    },
    {
      path: '/vip/member',
      name: '会员',
      component: Vipmember
    },
    {
      path: '/supply/marketing',
      name: '供销',
      component: Marketing
    },
    {
      path: '/messages/informMsg',
      name: '通知',
      component: InfromMsg
    }
  ]

  allroutes = allroutes.concat(YaoRouter) // 合并
  
  const routes = [
    {
      path: "/",
      name: "首页",
      meta: 99,
      component: Home,
      children: allroutes // 二级路由
    },
    {
      path: "/login",
      name: "登录",
      component: login
      
    },
    {
      path: "/register",
      name: "注册",
      component: register
      
    },
    {
      path: "/forgetpass",
      name: "忘记密码",
      component: forgetpass
    },
    {
      path: "*",
      name: '404',
      component: Error404
    }
  ]
  const router =  new Router({
    mode: "history",
    base: 'shanghu', 
    routes
  });



  //导航钩子
  router.beforeEach((to, from, next) => {
      next()
  })


  export default router